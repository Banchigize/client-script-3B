# Teacher sample answer: Practical Task 3B

## Purpose
This is an instructor reference, not a student starter template. It demonstrates the required User Directory from Module 3 using HTML, CSS, and vanilla JavaScript.

## Run
1. Keep `index.html`, `style.css`, and `app.js` in the same folder.
2. Open `index.html` in a modern browser. Internet access is needed for the JSONPlaceholder API.
3. Click **Load users**, search by name, then click **Show posts** on a user card.
4. If direct opening is restricted by local browser policies, use VS Code Live Server or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Expected results
- **Load users**: 10 user cards appear, each showing name, email, and city.
- **Search**: typing `Leanne` shows one matching user; typing a nonexistent name shows “No matching users found.”
- **Show posts**: selecting any user displays the first three of that user's API posts.
- **Loading states**: visible messages while requests are pending; Load users is temporarily disabled.
- **Network/HTTP error**: change `${API}/users` temporarily to `${API}/userz` in `app.js`, reload, and click Load users. The page displays HTTP 404 and allows another attempt after the URL is restored.
- **No full page reload** is needed for results.

## Teaching notes
- API endpoints used: GET `/users` and GET `/posts?userId=1` (using the selected user's ID).
- Important details: `response.ok` must be checked because `fetch()` does not reject automatically for HTTP 404; `try/catch/finally` handles errors and resets controls.
- `textContent` avoids treating fetched text as HTML. `createElement`/`append` demonstrate DOM skills from Module 2.
- **No localStorage or sessionStorage**: those topics belong in Module 4.
- JSONPlaceholder is a public fake REST API. This task only reads data; it does not save anything on the server.

## Suggested 5-point review rubric
1. Functional HTML interface and CSS layout (1)
2. Load users with fetch + async/await + response.ok (1)
3. DOM rendering and client-side name search (1)
4. Fetch and display three posts for the selected user (1)
5. Loading states, error handling, and enabled retry (1)

This review rubric can be used *within* the established Module 3 practical-work allocation, not as extra course points. If both Lab 3 and Task 3B are marked out of five, one option is to average them into a single Module 3 mark, announced to students in advance.
