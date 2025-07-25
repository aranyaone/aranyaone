---
name: Custom issue template
about: "—such as integration issues, unclear documentation, UI improvements, deployment
  blockers, or backend sync mismatches."
title: ''
labels: ''
assignees: aranyaone

---

This issue template is designed to report flexible custom problems or requests that do not strictly fall under bugs or feature requests. It allows contributors or team members to describe any situation needing attention—such as integration issues, unclear documentation, UI improvements, deployment blockers, or backend sync mismatches.                                                🔧 Describe the Issue (Problem, Request, or Task)
A detailed explanation of the situation. Be clear and specific.
Example:

After syncing multiple environments from Cursor, some services and folders are not appearing in the GitHub main branch. Possibly due to merge conflicts or Vercel build cache.

🔁 Steps or Context (if any)
Related Git branch or PR number:

Environment: Cursor, GitHub, Vercel

Commands used (if technical):

git pull, git merge, vercel deploy, etc.

✅ Expected Result or Outcome
Describe what you expected to happen:

All 43 folders should appear correctly in the main GitHub branch after sync and be visible on deployed domain.

📸 Screenshots / Logs (Optional)
Upload terminal logs, GitHub screenshots, or Vercel error logs.

💻 Device / Platform Info
OS: [Windows 10 / Mac / Linux]

Tools used: [Cursor, VS Code, GitHub Desktop, Terminal, Vercel]

🔖 Labels (Optional)
infrastructure, urgent, cursor-sync, deployment, help needed
