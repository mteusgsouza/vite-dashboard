import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './components/layouts/dashboard-layout'
import { ThemeProvider } from './components/theme-provider'
import { AnalyticsPage } from './pages/analytics'
import { ForgotPasswordPage } from './pages/auth/forgot-password'
import { LoginPage } from './pages/auth/login'
import { SignupPage } from './pages/auth/signup'
import { DashboardPage } from './pages/dashboard'
import { SettingsPage } from './pages/settings'
import { UsersPage } from './pages/users'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <DashboardLayout>
              <AnalyticsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  )
}

export default App
