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
│── .github/           # GitHub workflows and configurations
│── .trunk/            # Trunk-based development settings (if applicable)
│── .vscode/           # VS Code workspace settings
│── apps/              # Application-specific code
│── packages/          # Shared libraries and utilities
│── tooling/           # Development tools and scripts
│── turbo/             # Turborepo configuration
│── .gitignore         # Git ignore rules
│── .npmrc             # npm settings
│── .nvmrc             # Node.js version settings
│── package.json       # Root package metadata
│── pnpm-lock.yaml     # Dependency lock file
│── pnpm-workspace.yaml # Workspace configuration
│── turbo.json         # Turborepo settings
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

## License

This project is licensed under the [MIT License](LICENSE).

