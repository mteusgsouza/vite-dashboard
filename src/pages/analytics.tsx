import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">View your analytics and reports</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Analytics Data</CardTitle>
                    <CardDescription>Your analytics and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        Analytics charts will be displayed here
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
