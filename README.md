# ✉️ AI Email & Letter Writer

A clean, modern web tool that generates **emails and letters** automatically using the **Gemini API**.  
Built with **Lovebal AI**, this app helps users craft polished messages in seconds — whether it’s a professional email or a personal letter.

---

## 🚀 Features

- 🧠 **AI-Powered Writing** – Generates human-like text using Google’s Gemini API.  
- ✉️ **Email or Letter Mode** – Choose between creating an email or a letter.  
- 🧾 **Dynamic Forms** – Simple input forms tailored to your selected mode.  
- 👁️ **Live Preview** – See the AI-generated text before downloading.  
- 📋 **Copy to Clipboard** – Instantly copy the output.  
- 💾 **Download as Word (.docx)** – Export your final message easily.  
- 🎨 **Modern UI** – White and blue theme with smooth gradients, minimal layout, and soft shadows.  
- 📱 **Responsive Design** – Works beautifully across all devices.

---

## 🧩 How It Works

1. **Select** the type of message — Email or Letter.  
2. **Fill out** the short form with key details.  
3. **Click Generate** to let Gemini create your message.  
4. **Preview**, **Copy**, or **Download** your AI-written result.

---

## ⚙️ Gemini API Integration

This app uses the **Gemini 2.0 Flash** model for text generation.

**API Endpoint:**

- https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

**Example cURL Request:**
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H "Content-Type: application/json" \
  -H "X-goog-api-key: GEMINI_API_KEY" \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
```

- ⚠️ Replace GEMINI_API_KEY with your actual Gemini API key.

## 🎨 Design System

- Primary Colors: White and Blue
- Typography: Clean and minimal (inspired by Notion & Linear)
- UI Style: Soft shadows, blue gradients, smooth hover effects
- Layout: Centered forms, ample white space, responsive grid

## 🧱 Forms Overview

### Email Form

- Subject line
- Recipient name
- Message purpose
- Tone
- Key details / points
- Closing signature

### Letter Form

- Recipient name and address (optional)
- Sender name and address (optional)
- Tone
- Reason for letter
- Key details / points

## 🛠️ Tech Stack

- Frontend: Lovebal AI
- Backend: Gemini API (Google Generative Language)
- Language: JavaScript
- File Exports: DOCX

## 🧭 Future Enhancements

- ✍️ Editable text area for refining AI output
- 🗂️ Save message history
- 🌐 Multi-language support
- 💌 Email sending integration

## 📄 License

This project is open-source and available under the MIT License.

## 💙 Built with Lovebal AI + Gemini

“Write smarter, not harder — let AI handle your words.”














# Lovable project

## Project info

**URL**: https://lovable.dev/projects/e51580e7-8213-4fb6-9220-502d5d7a4667

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e51580e7-8213-4fb6-9220-502d5d7a4667) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e51580e7-8213-4fb6-9220-502d5d7a4667) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
