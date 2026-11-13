// Teacher sample solution: Practical Task 3B (Module 3)
// Only concepts from Modules 2 and 3 are used: DOM, events, fetch, JSON, async/await.
const API = 'https://jsonplaceholder.typicode.com';

const loadUsersBtn = document.querySelector('#loadUsersBtn');
const searchInput = document.querySelector('#searchInput');
const usersList = document.querySelector('#usersList');
const statusText = document.querySelector('#status');
const postsHint = document.querySelector('#postsHint');
const postsList = document.querySelector('#postsList');
const postsStatus = document.querySelector('#postsStatus');

let users = [];
let selectedUserId = null;

// DOM helper: write messages safely with textContent.
function setStatus(element, message, type = '') {
  element.textContent = message;
  element.className = type ? `status ${type}` : 'status';
}

function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    setStatus(statusText, 'No matching users found.');
    return;
  }
  setStatus(statusText, `Showing ${list.length} of ${users.length} users.`, 'success');

  list.forEach(user => {
    const card = document.createElement('article');
    card.className = 'user-card';

    const name = document.createElement('h3');
    name.textContent = user.name;
    const email = document.createElement('p');
    email.textContent = `Email: ${user.email}`;
    const city = document.createElement('p');
    city.textContent = `City: ${user.address.city}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Show posts';
    button.addEventListener('click', () => loadPosts(user.id, user.name));

    card.append(name, email, city, button);
    usersList.append(card);
  });
}

async function loadUsers() {
  loadUsersBtn.disabled = true;
  searchInput.disabled = true;
  setStatus(statusText, 'Loading users...');
  usersList.replaceChildren();
  postsList.replaceChildren();
  postsHint.textContent = 'Choose a user to see their first three posts.';
  setStatus(postsStatus, 'No user selected.');
  selectedUserId = null;

  try {
    const response = await fetch(`${API}/users`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    users = await response.json();
    searchInput.disabled = false;
    searchInput.value = '';
    renderUsers(users);
  } catch (error) {
    users = [];
    setStatus(statusText, `Could not load users: ${error.message}. Please try again.`, 'error');
  } finally {
    loadUsersBtn.disabled = false;
  }
}

function filterUsers() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = users.filter(user => user.name.toLowerCase().includes(query));
  renderUsers(matches);
}

async function loadPosts(userId, name) {
  selectedUserId = userId;
  postsList.replaceChildren();
  postsHint.textContent = `Posts by ${name}`;
  setStatus(postsStatus, 'Loading posts...');
  document.querySelectorAll('.user-card button').forEach(button => button.disabled = true);

  try {
    const response = await fetch(`${API}/posts?userId=${userId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const posts = await response.json();
    // Prevent an older request from replacing posts for a newer selection.
    if (selectedUserId !== userId) return;
    if (posts.length === 0) {
      setStatus(postsStatus, 'No posts found for this user.');
      return;
    }
    posts.slice(0, 3).forEach(post => {
      const article = document.createElement('article');
      article.className = 'post';
      const title = document.createElement('h3');
      title.textContent = post.title;
      const body = document.createElement('p');
      body.textContent = post.body;
      article.append(title, body);
      postsList.append(article);
    });
    setStatus(postsStatus, `Showing 3 posts by ${name}.`, 'success');
  } catch (error) {
    if (selectedUserId === userId) {
      setStatus(postsStatus, `Could not load posts: ${error.message}. Please try again.`, 'error');
    }
  } finally {
    document.querySelectorAll('.user-card button').forEach(button => button.disabled = false);
  }
}

loadUsersBtn.addEventListener('click', loadUsers);
searchInput.addEventListener('input', filterUsers);
