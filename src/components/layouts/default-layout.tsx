import type { ReactNode } from 'react'
import { ModeToggle } from '../mode-toggle'

interface DefaultLayoutProps {
    children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My App</h1>
                    <ModeToggle />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 min-h-150">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 My App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
