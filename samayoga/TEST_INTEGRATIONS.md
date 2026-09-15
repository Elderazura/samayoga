# Testing Nano Banana & Gemini Integrations

## ✅ API Key Configured

Your Google API key has been added to `.env.local` and is ready to use!

## 🧪 Test the Integrations

### 1. Restart Your Dev Server

The server needs to be restarted to pick up the new environment variable:

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### 2. Test Poster Generation

1. **Sign in as Admin**
   - Go to `/auth/signin`
   - Use admin credentials

2. **Navigate to Creative Panel**
   - Go to `/admin/creative`

3. **Generate a Test Poster**
   - Title: "Test Yoga Class"
   - Description: "A calming Hatha yoga session"
   - Type: "Class Announcement"
   - Style: "Calm & Minimal"
   - Click "Generate Poster"
   - Wait 10-30 seconds
   - You should see the generated poster!

### 3. Test AI Chat

1. **Navigate to AI Assistant**
   - Go to `/admin/ai`

2. **Try These Questions**
   - "How many students are registered?"
   - "Show me upcoming classes"
   - "What payments are pending?"
   - "Tell me about the yoga studio"

3. **Expected Behavior**
   - AI responds with helpful information
   - Uses real-time data from your database
   - Maintains conversation context

## 🔍 Verify It's Working

### Check Server Logs

When you generate a poster or send a chat message, check your terminal for:
- ✅ No API key errors
- ✅ Successful API calls
- ✅ Image data received (for posters)

### Common Issues

**"API key not configured"**
- Make sure you restarted the server after adding the key
- Check `.env.local` has `GOOGLE_API_KEY=...`

**"Invalid API key"**
- Verify the key is correct (no extra spaces)
- Check the key hasn't been revoked

**"Failed to generate image"**
- Image generation may require specific model access
- Check Google AI Studio for model availability

## 🎉 Success Indicators

✅ **Poster Generation:**
- Form submits without errors
- Loading spinner appears
- Poster image displays
- Download button works

✅ **AI Chat:**
- Messages send successfully
- AI responds with relevant information
- Conversation history works
- No error messages

---

**Ready to test!** Restart your server and try both features.