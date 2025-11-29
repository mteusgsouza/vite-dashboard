# Vite Dashboard

A modern, production-ready dashboard template built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components. Features responsive design, theme switching, authentication pages, and form validation.

## Features

### 🎨 UI & Components

- **shadcn/ui Components**: Pre-built, customizable UI components based on Radix UI
- **Tailwind CSS v4**: Utility-first CSS with dark mode support
- **Responsive Design**: Mobile-first approach with breakpoint-aware components
- **Theme Switching**: Light/Dark/System theme support with localStorage persistence
- **Lucide Icons**: Beautiful, consistent icon library

### 🔐 Authentication

- **Login Page** (`/login`) - Email/password authentication form
- **Signup Page** (`/signup`) - User registration with password confirmation
- **Forgot Password Page** (`/forgot-password`) - Password reset flow
- **Form Validation** - Using react-hook-form + Zod schema validation
- **Password Requirements** - Minimum 6 characters
- **Reusable Form Components** - FormField, FormLabel, FormControl with error handling

### 📱 Dashboard

- **Responsive Sidebar** - Desktop: fixed sidebar with toggle | Mobile: hamburger menu in Sheet
- **Dashboard Pages**:
  - Overview - Stats cards and recent activity
  - Users - User management interface
  - Analytics - Analytics and reporting
  - Settings - Application settings
- **Header** - Theme toggle and navigation controls
- **Mobile Menu** - Hamburger menu using Radix UI Sheet component

### 🛠️ Tech Stack

- **Vite** (with Rolldown) - Lightning-fast build tool
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Modern utility CSS
- **Radix UI** - Unstyled, accessible component primitives
- **react-hook-form** - Efficient form state management
- **Zod** - Schema validation library
- **Lucide React** - Icon library
- **ESLint** - Code quality

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vite-dashboard

# Install dependencies
pnpm install
# or
npm install
```

### Development

```bash
# Start development server
pnpm dev

# The app will be available at http://localhost:5173
```

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Linting

```bash
# Run ESLint
pnpm lint
```

## Project Structure

```
src/
├── components/
│   ├── layouts/
│   │   ├── auth-layout.tsx          # Centered auth page wrapper
│   │   ├── default-layout.tsx       # Basic page wrapper
│   │   └── dashboard-layout.tsx     # Dashboard with sidebar/mobile menu
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── sidebar.tsx
│   │   └── ...
│   ├── mode-toggle.tsx              # Theme switcher component
│   └── theme-provider.tsx           # Theme context provider
├── hooks/
│   └── use-mobile.ts                # Mobile detection hook
├── pages/
│   ├── auth/
│   │   ├── login.tsx                # Login form with validation
│   │   ├── signup.tsx               # Registration form with validation
│   │   └── forgot-password.tsx      # Password reset form
│   ├── dashboard.tsx                # Dashboard overview
│   ├── users.tsx                    # Users page
│   ├── analytics.tsx                # Analytics page
│   └── settings.tsx                 # Settings page
├── lib/
│   └── utils.ts                     # Utility functions
├── App.tsx                          # Route configuration
├── main.tsx                         # Entry point
└── index.css                        # Global styles
```

## Routing

### Public Routes

- `/login` - Login page
- `/signup` - Registration page
- `/forgot-password` - Password reset page

### Dashboard Routes

- `/dashboard` - Dashboard overview
- `/dashboard/users` - Users management
- `/dashboard/analytics` - Analytics
- `/dashboard/settings` - Settings

## Form Validation

All authentication forms use **react-hook-form** with **Zod** schema validation:

### Login Form

```typescript
{
  email: string (valid email format)
  password: string (minimum 6 characters)
}
```

### Signup Form

```typescript
{
  email: string (valid email format)
  password: string (minimum 6 characters)
  confirmPassword: string (must match password)
}
```

### Forgot Password Form

```typescript
{
  email: string (valid email format)
}
```

## Customization

### Theme Colors

Edit `src/index.css` to customize CSS variables for light and dark themes:

- `--background` - Page background
- `--foreground` - Text color
- `--primary` - Primary brand color
- `--secondary` - Secondary color
- `--accent` - Accent color
- `--muted-foreground` - Muted text color
- And more...

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update sidebar navigation in `src/components/layouts/dashboard-layout.tsx`

### Adding New Components

1. Use shadcn CLI to add components:
   ```bash
   npx shadcn@latest add <component-name>
   ```
2. Or create custom components in `src/components/ui/`

## Authentication Implementation

Currently, the authentication pages are **UI-only templates**. To implement actual authentication:

1. **Create Auth Context** - Add `src/contexts/auth-context.tsx` for user state management
2. **Add API Integration** - Connect login/signup to your backend
3. **Add Protected Routes** - Create route guards in `src/App.tsx`
4. **Store Tokens** - Save JWT/session tokens securely
5. **Add Logout** - Implement logout functionality

## Performance

- **Code Splitting**: Automatic with Vite and React Router
- **Lazy Loading**: Pages loaded on demand
- **Tree Shaking**: Unused code removed during build
- **Minification**: Production builds are optimized
- **React Compiler**: Experimental babel plugin for performance optimization

## Accessibility

- All components use Radix UI primitives for accessibility
- Semantic HTML throughout
- ARIA attributes where needed
- Keyboard navigation support
- Focus management in modals and forms

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT - Feel free to use this template for personal and commercial projects.

## Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ using Vite, React, TypeScript, and Tailwind CSS**

```

```
