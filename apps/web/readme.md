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
│   ├── components/    # Components specificly for this app
│   ├── lib/           # Utility functions & hooks
│   ├── providers/     # Modal provider and Convex client
│   ├── styles/        # Tailwindcss styles
│   ├── env.ts         # Enviroment variable handling
│   ├── middleware.ts  # Nextjs middleware with advanced routing & permission control
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

---

