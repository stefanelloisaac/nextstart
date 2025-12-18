'use client'

import { Search, Bell, Settings } from 'lucide-react'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function AppHeader() {
  return (
    <header className='sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='flex flex-1 items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className='ml-auto flex items-center gap-2 px-4'>
        {/* Search */}
        <div className='relative hidden md:block'>
          <Search className='absolute top-2.5 left-2.5 size-4 text-muted-foreground' />
          <Input type='search' placeholder='Search...' className='h-9 w-60 pl-9 md:w-80 lg:w-96' />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='size-5' />
              <Badge className='absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-xs'>
                3
              </Badge>
              <span className='sr-only'>Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-80'>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex flex-col items-start gap-1 p-3'>
              <div className='flex w-full items-start justify-between'>
                <span className='font-medium'>New user registered</span>
                <span className='text-xs text-muted-foreground'>2m ago</span>
              </div>
              <span className='text-sm text-muted-foreground'>
                John Doe just created an account
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex flex-col items-start gap-1 p-3'>
              <div className='flex w-full items-start justify-between'>
                <span className='font-medium'>System update available</span>
                <span className='text-xs text-muted-foreground'>1h ago</span>
              </div>
              <span className='text-sm text-muted-foreground'>
                Version 2.0.1 is ready to install
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex flex-col items-start gap-1 p-3'>
              <div className='flex w-full items-start justify-between'>
                <span className='font-medium'>New comment on your post</span>
                <span className='text-xs text-muted-foreground'>3h ago</span>
              </div>
              <span className='text-sm text-muted-foreground'>Someone replied to your comment</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-center'>View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant='ghost' size='icon'>
          <Settings className='size-5' />
          <span className='sr-only'>Settings</span>
        </Button>
      </div>
    </header>
  )
}
