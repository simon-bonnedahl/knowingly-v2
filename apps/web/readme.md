# Knowingly Web App

Knowingly Web App is a **multi-tenant** SaaS platform that provides each client with a unique **subdomain** or **custom domain** for their **hub**. It includes powerful features designed to help communities grow and engage effectively.

## Hub Features

### Content & Customization
- 📝 **Notion-style editor** for hub homepage, profiles, and custom pages
- 🎨 **Hub customization** with logo, banner and theme color. 

### Communication & Engagement
- 💬 **Realtime messaging**  
- 📅 **Meeting requests & scheduling**  
- 🎥 **Integrated meetings & video calls**  

### AI-Powered Tools
- 🤖 **AI chat** with your hub as a knowledge bank  
- 🔍 **AI-powered search & member matching**  

### Administration & Control
- 🛠️ **Extensive Hub Admin System**  
  - 🎭 **Advanced role customization with permissions**  
  - 👥 **Member control & management**  
  - 📊 **Analytics & statistics dashboard**  

---

## Project Structure

```
apps/web/
├── public/            # Static assets (favicons, images, etc.)
├── src/               # Application source code
│   ├── app/           # Next.js app directory (routing, layouts, etc.)
│   ├── components/    # Shared UI components
│   ├── config/        # Configuration files
│   ├── features/      # Feature-specific modules (chat, meetings, AI, etc.)
│   ├── hooks/         # Reusable React hooks
│   ├── lib/           # Utility functions and third-party integrations
│   ├── providers/     # Context providers for state management
│   ├── services/      # API services and backend interactions
│   ├── styles/        # Global and component styles (TailwindCSS)
│   ├── types/         # TypeScript types and interfaces
│   ├── utils/         # Helper functions
├── .env.example       # Example environment variable file
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

---

