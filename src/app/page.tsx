import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>Welcome to your application dashboard</p>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Active users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>1,234</div>
              <p className='text-xs text-muted-foreground'>+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Total revenue this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$45,231</div>
              <p className='text-xs text-muted-foreground'>+20% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Current active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>573</div>
              <p className='text-xs text-muted-foreground'>+8% from last hour</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Your application is now set up with a floating sidebar and top header
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <p>
              This layout includes a collapsible floating sidebar and a sticky top header with
              search, notifications, and theme toggle.
            </p>
            <div className='flex gap-2'>
              <Button>Get Started</Button>
              <Button variant='outline'>Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
