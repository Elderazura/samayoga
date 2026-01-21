# Integration Guide: Nano Banana & Gemini Chat

This guide explains how to integrate Google's Gemini API for both image generation (Nano Banana) and chat functionality.

## 🔑 Setup

### 1. Get Your Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Add API Key to Environment Variables

Add to your `.env.local` file:

```env
GOOGLE_API_KEY=your_api_key_here
```

**Important:** Never commit your API key to git! The `.env.local` file is already in `.gitignore`.

### 3. Install Dependencies

The required package is already installed:
```bash
npm install @google/generative-ai
```

## 🎨 Nano Banana (Image Generation)

### What It Does

Generates professional yoga posters using Gemini's image generation models:
- `gemini-2.5-flash-image` - Fast generation
- `gemini-3-pro-image-preview` - Higher quality (if available)

### How to Use

1. Go to `/admin/creative`
2. Fill in the form:
   - **Title** (required): e.g., "Hatha Yoga Class - January 2025"
   - **Description** (optional): Additional details
   - **Poster Type**: Class Announcement, Event Poster, or Workshop Flyer
   - **Style**: Calm & Minimal, Energetic, or Meditative
3. Click "Generate Poster"
4. Wait for generation (usually 10-30 seconds)
5. Download the generated poster

### API Endpoint

`POST /api/admin/creative/generate`

**Request Body:**
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
  "imageData": "base64_encoded_image_data",
  "mimeType": "image/png",
  "prompt": "Generated prompt used"
}
```

### Customization

Edit `/app/api/admin/creative/generate/route.ts` to:
- Change aspect ratios (currently 4:5 for posters)
- Adjust image size (1K, 2K, 4K)
- Modify style prompts
- Add new poster types

## 💬 Gemini Chat

### What It Does

Provides an AI assistant for admin tasks with:
- Context about students, classes, and payments
- Conversation memory
- Natural language understanding

### How to Use

1. Go to `/admin/ai`
2. Type your question in the input field
3. Press Enter or click Send
4. Get AI-powered responses

### Example Questions

- "How many students are registered?"
- "Show me upcoming classes"
- "What payments are pending?"
- "Tell me about approved students"

### API Endpoint

`POST /api/admin/ai/chat`

**Request Body:**
```json
{
  "message": "How many students are there?",
  "history": [
    { "role": "user", "parts": [{ "text": "Previous message" }] },
    { "role": "model", "parts": [{ "text": "Previous response" }] }
  ]
}
```

**Response:**
```json
{
  "response": "AI-generated response text"
}
```

### Model Used

Currently using `gemini-1.5-flash` for fast, efficient responses. You can change this in `/app/api/admin/ai/chat/route.ts`:

```typescript
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro' // For more advanced reasoning
})
```

## 🔧 Configuration

### Available Models

**For Image Generation:**
- `gemini-2.5-flash-image` - Fast, good quality
- `gemini-3-pro-image-preview` - Higher quality, better text rendering

**For Chat:**
- `gemini-1.5-flash` - Fast, efficient (current)
- `gemini-1.5-pro` - More advanced reasoning
- `gemini-2.0-flash-exp` - Latest experimental

### Rate Limits

Google's free tier includes:
- 15 requests per minute for image generation
- 60 requests per minute for chat

For production, consider:
- Implementing rate limiting
- Caching responses
- Using Vertex AI for higher limits

## 🐛 Troubleshooting

### "API key not configured"

1. Check `.env.local` exists
2. Verify `GOOGLE_API_KEY` is set
3. Restart dev server: `npm run dev`

### "Invalid API key"

1. Verify key is correct
2. Check key hasn't expired
3. Ensure no extra spaces in `.env.local`

### Image Generation Fails

1. Check model name is correct (may change with API updates)
2. Verify API key has image generation permissions
3. Check console for detailed error messages

### Chat Not Working

1. Verify API key is set
2. Check network tab for API errors
3. Review server logs for details

## 📝 Notes

- **Image Generation**: Currently uses 4:5 aspect ratio (portrait posters). Change in `imageConfig.aspectRatio`
- **Memory**: Conversations are stored in the `AIMemory` table for future reference
- **Context**: The AI has access to real-time data about students, classes, and payments
- **Fallback**: If API key is missing, chat falls back to keyword-based responses

## 🚀 Next Steps

1. **Add Image Caching**: Store generated images in database or file system
2. **Add Templates**: Pre-defined poster templates for common use cases
3. **Streaming Responses**: Implement streaming for chat responses
4. **Multi-modal**: Add image upload for chat (e.g., analyze class photos)
5. **Fine-tuning**: Customize prompts for better yoga-specific responses

---

**Need Help?** Check the [Google Gemini API Documentation](https://ai.google.dev/docs)