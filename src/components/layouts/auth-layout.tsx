import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
            {/* Header with theme toggle */}
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>

            {/* Auth container */}
            <div className="w-full max-w-[500px] space-y-6">
                {/* Logo/Branding */}
                <div className="space-y-2 text-center">
                    <Link to="/" className="text-2xl font-bold">
                        Dashboard
                    </Link>
                </div>

                {/* Form content */}
                <div className="bg-card rounded-lg border shadow-sm p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
