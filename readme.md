# Knowingly v2

Knowingly is a platform designed to connect individuals with the right experts to solve their problems. It offers features like brand customization, growth analytics, booking and availability management, AI-powered member matching, video calls, messaging, and 24/7 support. These tools aim to enhance community interaction and skill development.

**Knowingly v2** is a monorepo project built with TypeScript and managed using `pnpm`. It is structured to support multiple applications and shared packages efficiently.

## Features

- Monorepo architecture using `pnpm workspaces`
- Turborepo for optimized builds and task running
- Node.js version management via `.nvmrc`
- GitHub workflows for CI/CD automation

## Project Structure

```
knowingly-v2/
├── .github/           # GitHub workflows and configurations
├── .vscode/           # VS Code workspace settings
├── apps/              # Application-specific code
│   ├── expo/          # Mobile application built with Expo (React Native)
│   ├── landing/       # Landing page for Knowingly
│   ├── web/           # Main web application for Knowingly
├── packages/          # Shared libraries and utilities
│   ├── backend/       # Convex backend
│   ├── email-editor/  # Components and logic for email composition
│   ├── email-renderer/ # Renders email templates for preview and sending
│   ├── icons/         # Collection of shared icons for the UI
│   ├── ui/            # Shared UI components based on Shadcn/ui
│   ├── utils/         # General-purpose utility functions
│   ├── validators/    # Input and data validation utilities
├── tooling/           # Development tools and scripts
│   ├── eslint/        # ESLint configuration for code linting
│   ├── github/        # GitHub-related automation and workflows
│   ├── prettier/      # Prettier configuration for consistent formatting
│   ├── tailwind/      # Tailwind CSS configurations
│   ├── typescript/    # TypeScript configurations and typings
├── turbo/             # Turborepo configuration
├── .gitignore         # Git ignore rules
├── package.json       # Root package metadata
├── pnpm-lock.yaml     # Dependency lock file
├── pnpm-workspace.yaml # Workspace configuration
└── turbo.json         # Turborepo settings
```

## Setup & Installation

### Prerequisites

- [**Node.js**](https://nodejs.org/) (version specified in `.nvmrc`)
- [**pnpm**](https://pnpm.io/) (install with `npm install -g pnpm`)

### Steps to Set Up Locally

1. **Clone the repository**:

   ```sh
   git clone https://github.com/simon-bonnedahl/knowingly-v2.git
   cd knowingly-v2
   ```

2. **Set up Node.js version**:

   ```sh
   nvm use
   ```

3. **Install dependencies**:

   ```sh
   pnpm install
   ```

4. **Run the application** (adjust based on your app setup):

   ```sh
   pnpm run dev
   ```

