# Natural Language to SQL Demo

Frontend client for demoing the use of GPT to convert natural language into SQL

## Overview

### Repository Features

- Vite
  - Vite used to bundle and serve dev environment using typescript + swc for speed of development
  - type libraries for vite & react installed in dev dependencies
- ESLint
  - Linting provided by ESLint to ensure code quality
  - Formatting handled by Prettier
- Prettier
  - Prettier configured to maintain formatting between devs and cut down on large commit changes caused by formatting whole file
- Husky
  - Installed to handle git hooks currently only configured with pre-commit
- Lint-Staged
  - Installed and configured to lint, fix if possible, and format all staged files

### Packages

- Redux Toolkit
  - To handle global store of application state
- React Router DOM
  - To handle clientside routing of application
- Axios
  - To handle requests to API
- Material UI
- For ease of frontend development

### Scripts

- `dev`
  - Runs development server
- `build`
  - Builds application in /dist directory
- `lint`
  - Lints all configured files,
- `preview`: "vite preview",
  - Previews built application
- `prettier:check`
  - Checks that all files match prettier configuration
- `prepare`
  - Installs husky into git repo
