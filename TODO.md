# Task Implementation Plan

## Goal
Fix login redirect (`/chat` shows nothing), redirect signup/login to `/chat` or dashboard, and enable profile image upload reflected in sidebar, profile, and dashboard.

## Steps

### Backend Fixes
- [ ] 1. Fix `backend/controllers/messageController.js` — import `cloudinary`, fix `getUsersForSidebar` to query the `User` model
- [ ] 2. Fix `backend/controllers/authController.js` — import `cloudinary` for `updateProfile`

### Frontend Services / State
- [ ] 3. Fix `frontend/src/services/api.js` — correct message endpoint paths to `/message/api/...`, add CHECK_API
- [ ] 4. Create `frontend/src/slices/messageSlice.js` — message state (users, messages, selectedUser)
- [ ] 5. Register `messageSlice` in `frontend/src/reducers/index.js`
- [ ] 6. Create `frontend/src/services/Operations/message.js` — thunks for get users, get messages, send message
- [ ] 7. Update `frontend/src/services/Operations/auth.js` — signup sets token + navigates to `/chat`, login navigates to `/chat`, fix checkAuth URL, updateProfile keeps image field

### Pages & Routing
- [ ] 8. Create `frontend/src/pages/Chat.jsx` — full chat UI with users sidebar, conversation view, message input/send
- [ ] 9. Update `frontend/src/App.jsx` — add protected `/chat` route
- [ ] 10. Rewrite `frontend/src/pages/Profile.jsx` — full profile page with image upload
- [ ] 11. Update `frontend/src/components/Navbar.jsx` — fix auth check, show user avatar
- [ ] 12. Update `frontend/src/pages/Dashboard.jsx` — show user profile image

### Testing
- [ ] 13. Restart frontend/backend and verify login → `/chat`, signup → `/chat`, sidebar users load, messaging works, profile image upload works

