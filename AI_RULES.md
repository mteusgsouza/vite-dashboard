# Vite Dashboard - AI Development Rules

This document outlines the preferred development patterns, architectural decisions, and coding standards for the Vite Dashboard template. Use these rules when extending or modifying this project.

## Project Overview

**Name**: Vite Dashboard  
**Type**: React Dashboard Template  
**Primary Use**: Modern admin/dashboard applications with authentication  
**Tech Stack**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui

## Architecture & Structure

### 1. Component Organization

```
src/
├── components/
│   ├── layouts/          # Layout wrappers for pages
│   ├── ui/               # shadcn/ui components (auto-generated)
│   └── [feature].tsx     # Feature-specific components
├── hooks/                # Custom React hooks
├── pages/                # Page components (routable)
└── contexts/             # (TODO) React Context providers
```

**Rules**:

- Use **layouts/** for page wrapper components (AuthLayout, DashboardLayout, DefaultLayout)
- Keep **ui/** components for reusable UI primitives from shadcn
- Feature-specific components go directly in **components/**
- Pages go in **pages/** organized by feature (e.g., `pages/auth/`, `pages/dashboard/`)
- Create **contexts/** folder for global state management (auth, theme, etc.)

### 2. Layouts

Three main layout types:

#### AuthLayout

- **Location**: `src/components/layouts/auth-layout.tsx`
- **Purpose**: Centered form container for login/signup/forgot-password
- **Features**:
  - Max-width: 500px
  - Centered on screen
  - Theme toggle in top-right
  - Card-styled form wrapper
- **Usage**: Wrap all auth pages with this layout

#### DashboardLayout

- **Location**: `src/components/layouts/dashboard-layout.tsx`
- **Purpose**: Main dashboard wrapper with responsive sidebar
- **Features**:
  - Desktop: Fixed sidebar (collapsible)
  - Mobile: Hamburger menu (Sheet modal)
  - Header with theme toggle
  - Responsive to viewport size
- **Usage**: Wrap all dashboard pages with this layout

#### DefaultLayout

- **Location**: `src/components/layouts/default-layout.tsx`
- **Purpose**: Basic layout for simple pages
- **Features**:
  - Full-width container
  - Header and footer
  - Theme toggle
- **Usage**: For landing pages or simple content

## Routing

### Route Organization

```typescript
// Public routes
/login           - LoginPage (no auth required)
/signup          - SignupPage (no auth required)
/forgot-password - ForgotPasswordPage (no auth required)

// Protected routes (dashboard)
/dashboard              - DashboardPage
/dashboard/users        - UsersPage
/dashboard/analytics    - AnalyticsPage
/dashboard/settings     - SettingsPage
```

**Rules**:

- All auth pages use **AuthLayout**
- All dashboard pages use **DashboardLayout**
- Use **React Router v7** for routing
- Currently, no route protection implemented (see Authentication section)
- Root path (`/`) redirects to `/dashboard`

## Form Patterns

### Form Stack

All forms use this pattern:

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 1. Define Zod schema
const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

// 2. Create component
export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // TODO: API call
  };

  // 3. Render form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

**Rules**:

- Always use **Zod for validation schemas**
- Always use **react-hook-form for form state**
- Use **FormField** component wrapper for consistent styling
- Include **FormMessage** for error display
- Password minimum: **6 characters**
- Email: must be valid email format
- Group related fields in `space-y-4` or `space-y-6`

## Validation Rules

### Password Validation

- Minimum 6 characters (configurable)
- No special character requirements (keep it simple)
- Confirmation field for signup

### Email Validation

- Must be valid email format (Zod's `.email()`)
- Used for login, signup, forgot password

### Custom Validation

For custom validations, use Zod's `.refine()`:

```typescript
const schema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
```

## Components & UI

### Using shadcn Components

All UI components come from **shadcn/ui**. To add a new component:

```bash
npx shadcn@latest add <component-name>
```

**Available components**:

- Button
- Card
- Input
- Label
- Form
- Sidebar
- Sheet
- Badge
- Avatar
- Separator
- Tooltip
- Dropdown Menu
- And more via CLI

**Rules**:

- Use shadcn components for consistency
- Customize via `src/components/ui/` files
- Don't create duplicate UI components
- Use Tailwind utility classes for styling
- Prefer component composition over inline styling

### Tailwind CSS Usage

**Key classes**:

- Spacing: `px-4`, `py-6`, `space-y-4`
- Colors: Use CSS variables (`text-foreground`, `bg-background`, `bg-accent`)
- Responsive: `md:` breakpoint for tablet (768px)
- Dark mode: Automatic (`.dark` class on document)

**Color tokens** (from index.css):

- `--background` / `bg-background`
- `--foreground` / `text-foreground`
- `--primary` / `text-primary` / `bg-primary`
- `--secondary` / `text-secondary` / `bg-secondary`
- `--accent` / `bg-accent`
- `--muted-foreground` / `text-muted-foreground`
- `--destructive` / `bg-destructive` / `text-destructive`

## Responsive Design

### Breakpoints

```typescript
// Tailwind breakpoints
sm: 640px   (default: apply always, then override at breakpoint)
md: 768px   (mobile menu appears at this point)
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Strategy

**Dashboard Layout**:

- **Mobile (<768px)**: Hamburger menu, single column, full-width content
- **Tablet/Desktop (≥768px)**: Fixed sidebar, multi-column layouts

**Forms**:

- Full-width inputs on mobile
- Max-width containers on desktop
- Always readable text size

**Detection Hook**:

```typescript
import { useIsMobile } from "@/hooks/use-mobile";

export function MyComponent() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <MobileVersion />}
      {!isMobile && <DesktopVersion />}
    </>
  );
}
```

## Theming

### Current Implementation

- **Provider**: `ThemeProvider` context in `src/components/theme-provider.tsx`
- **Storage**: localStorage key `vite-ui-theme`
- **Modes**: light, dark, system
- **Toggle**: `ModeToggle` component in header
- **CSS**: Variables in `src/index.css`

### Theme Implementation Pattern

```typescript
import { useTheme } from "../hooks/use-theme";

export function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      Current theme: {theme}
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
```

**Rules**:

- Always use `useTheme()` hook for theme access
- CSS variables handle light/dark automatically
- Don't hardcode colors; use variable names

## Authentication (Future Implementation)

### Current State

- Auth pages are **UI-only** (no backend integration)
- No authentication logic implemented
- No protected routes
- No session management

### Planned Implementation Pattern

When implementing authentication, follow this pattern:

```typescript
// src/contexts/auth-context.tsx
export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Implementation

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used in AuthProvider");
  return context;
}
```

### Protected Routes Pattern

```typescript
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingPage />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

// In App.tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>;
```

## State Management

### Current Approach

- Theme: React Context + localStorage
- Page state: Component state (useState)
- No global auth state (future)

### Recommended Patterns

**For global state**, use React Context:

- Authentication
- Theme/preferences
- Notifications
- User data

**For local state**, use useState:

- Form inputs
- UI toggles
- Modal open/close
- Page filters

## Code Style & Conventions

### TypeScript

**Rules**:

- Always use TypeScript (no `.js` files)
- Type all component props with interfaces
- Use `type` for object shapes, `interface` for components
- Export types for library components

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

type FormData = z.infer<typeof schema>;

// Bad
const Button = (props: any) => {};
```

### File Naming

- **Components**: PascalCase (e.g., `LoginPage.tsx`, `UserCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useMobile.ts`)
- **Utils**: camelCase (e.g., `validators.ts`, `helpers.ts`)
- **Types**: PascalCase in separate files (e.g., `types.ts`)

### Imports

```typescript
// Order: React → Libraries → Internal → Types
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/types";
```

### Comments

- Use comments for "why", not "what"
- Mark TODO items with `// TODO: description`
- Document complex logic

```typescript
// Good
// Retry login after token expiration
async function retryLogin() {}

// Bad
// Set isLoading to true
setIsLoading(true);
```

## Performance Considerations

### Code Splitting

- Automatic with Vite and React Router
- Use lazy routes for large pages

### Lazy Loading Routes

```typescript
import { lazy, Suspense } from 'react'

const UsersPage = lazy(() => import('@/pages/users'))

// In routes
<Route
  path="/dashboard/users"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardLayout><UsersPage /></DashboardLayout>
    </Suspense>
  }
/>
```

### Optimization

- Avoid unnecessary re-renders (use React.memo if needed)
- Memoize callbacks with useCallback
- React Compiler enabled for automatic optimization
- Keep bundle small: tree-shake unused imports

## Testing Considerations

Not currently implemented, but recommended:

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

**Pattern**:

```typescript
// LoginForm.test.tsx
import { render, screen } from "@testing-library/react";
import { LoginForm } from "./login";

describe("LoginForm", () => {
  it("should show validation error for invalid email", async () => {
    render(<LoginForm />);
    // Test
  });
});
```

## Git & Version Control

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Commit Messages

```
feat: Add forgot password form
fix: Fix mobile menu closing on navigation
docs: Update README with auth setup
style: Format code with Prettier
```

### PR Guidelines

- Keep PRs focused on single feature
- Update tests and documentation
- Request reviews before merging

## Deployment

### Build Process

```bash
pnpm install
pnpm lint
pnpm build  # Outputs to dist/
```

### Environment Variables

Create `.env` for local development (not committed):

```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Vite Dashboard
```

### Deployment Platforms

- **Vercel** - Recommended, automatic deploys
- **Netlify** - Alternative option
- **Docker** - For self-hosted

## Contributing Guidelines

### Before Starting

1. Check existing issues/PRs
2. Create issue for discussion
3. Fork and create feature branch

### Development Process

1. Follow code style above
2. Update tests if needed
3. Update documentation
4. Create descriptive PR

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] No console.log or debug code
- [ ] Tests pass (when implemented)
- [ ] Accessibility standards met
- [ ] Mobile responsive
- [ ] Documentation updated

## Future Roadmap

### High Priority

- [ ] Implement authentication with backend
- [ ] Add protected routes
- [ ] Create API client layer
- [ ] Add tests (Vitest + React Testing Library)

### Medium Priority

- [ ] Add data tables/grids
- [ ] Add charts (Recharts or Chart.js)
- [ ] Implement notifications/toasts
- [ ] Add user profile page
- [ ] Add settings persistence

### Low Priority

- [ ] i18n (internationalization)
- [ ] PWA support
- [ ] Analytics integration
- [ ] Advanced theme customization

## Troubleshooting

### Mobile Menu Not Working

- Check `useIsMobile()` hook is imported
- Verify viewport width detection
- Ensure Sheet component is properly installed

### Form Validation Not Showing

- Confirm Zod schema is correct
- Check FormMessage component is included
- Verify form.handleSubmit is bound correctly

### Theme Not Persisting

- Check localStorage key matches in ThemeProvider
- Verify CSS variables in index.css
- Clear browser cache if needed

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .pnpm-store pnpm-lock.yaml
pnpm install

# Clear Vite cache
rm -rf .vite
pnpm dev
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [react-hook-form](https://react-hook-form.com)
- [Zod](https://zod.dev)

---

**Last Updated**: November 29, 2025  
**Version**: 1.0.0  
**Maintainer**: Vite Dashboard Team
