# Integration Setup: Nano Banana & Gemini Chat

## ✅ Integration Complete!

Both Nano Banana (image generation) and Gemini Chat are now fully integrated into your Samayoga application.

## 🚀 Quick Start

### 1. Get Your Google API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### 2. Add to Environment Variables

Add this line to your `.env.local` file:

```env
GOOGLE_API_KEY=your_api_key_here
```

### 3. Restart Your Server

```bash
npm run dev
```

## 🎨 Using Nano Banana (Poster Generation)

### Access
Go to: `/admin/creative` (Admin only)

### Steps
1. Enter a **Title** (required) - e.g., "Hatha Yoga Class - January 2025"
2. Add a **Description** (optional) - Additional details about the class/event
3. Select **Poster Type**: Class Announcement, Event Poster, or Workshop Flyer
4. Choose **Style**: Calm & Minimal, Energetic, or Meditative
5. Click **Generate Poster**
6. Wait 10-30 seconds for generation
7. Download the generated poster

### Features
- ✅ Real-time image generation
- ✅ Multiple style options
- ✅ Download as PNG
- ✅ Poster-optimized (4:5 aspect ratio)
- ✅ High quality (2K resolution)

## 💬 Using Gemini Chat

### Access
Go to: `/admin/ai` (Admin only)

### Features
- ✅ Natural language understanding
- ✅ Context-aware responses
- ✅ Real-time data access (students, classes, payments)
- ✅ Conversation memory
- ✅ Helpful admin assistance

### Example Questions
- "How many students are registered?"
- "Show me upcoming classes"
- "What payments are pending?"
- "Tell me about approved students"
- "How can I manage class schedules?"

## 📋 API Endpoints

### Poster Generation
```
POST /api/admin/creative/generate
```

**Request:**
```json
{
  "posterType": "Class Announcement",
  "style": "Calm & Minimal",
  "title": "Yoga Class Title",
  "description": "Optional description"
}
```

**Response:**
```json
{
  "success": true,
  "imageData": "base64_encoded_image",
  "mimeType": "image/png",
  "prompt": "Generated prompt"
}
```

### AI Chat
```
POST /api/admin/ai/chat
```

**Request:**
```json
{
  "message": "How many students are there?",
  "history": [] // Optional conversation history
}
```

**Response:**
```json
{
  "response": "AI-generated response text"
}
```

## 🔧 Configuration

### Models Used

**Image Generation:**
- `gemini-2.5-flash-image` - Fast, good quality

**Chat:**
- `gemini-1.5-flash` - Fast, efficient responses

### Customization

To change models, edit:
- Image: `/app/api/admin/creative/generate/route.ts`
- Chat: `/app/api/admin/ai/chat/route.ts`

## ⚠️ Important Notes

1. **API Key Security**: Never commit your API key to git
2. **Rate Limits**: Google's free tier has rate limits (15/min for images, 60/min for chat)
3. **Image Generation**: Uses REST API directly (SDK may not fully support it yet)
4. **Fallback Mode**: Chat works without API key (keyword-based responses)

## 🐛 Troubleshooting

### "API key not configured"
- Check `.env.local` exists
- Verify `GOOGLE_API_KEY` is set
- Restart dev server

### "Failed to generate image"
- Verify API key is correct
- Check model name is valid (may change with API updates)
- Review console for detailed errors

### "Invalid API key"
- Verify key is correct (no extra spaces)
- Check key hasn't expired
- Ensure key has proper permissions

## 📚 Documentation

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Image Generation Guide](https://ai.google.dev/gemini-api/docs/image-generation)
- [Chat API Guide](https://ai.google.dev/gemini-api/docs)

## 🎉 You're All Set!

Both integrations are ready to use. Just add your API key and start generating posters and chatting with the AI assistant!

---

**Need Help?** Check `INTEGRATION_GUIDE.md` for detailed technical information.