'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/public/assets/logo.svg';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import ImageAvatar from '/assets/images/image-avatar.jpg';

export default function NavBar() {
  const { setTheme } = useTheme();

  return (
    <nav className="bg-nav flex justify-between 2xl:min-h-full 2xl:flex-col 2xl:rounded-r-[20px]">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-r-[20px] bg-primary 2xl:h-[103px] 2xl:w-[103px]">
        <Image priority width={28} height={26} src={logo} alt="logo" />
      </div>
      <div className="flex items-center gap-6 2xl:flex-col 2xl:gap-8">
        <div className="flex h-full items-center border-r border-muted-foreground 2xl:w-full 2xl:justify-center 2xl:border-b 2xl:border-r-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="mr-4 flex hover:bg-transparent 2xl:mb-8 2xl:mr-0"
              >
                <SunIcon className="h-5 w-5 rotate-0 scale-100 text-muted-foreground transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 text-muted-foreground transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex">
          <Button
            variant={'ghost'}
            className="mr-6 h-8 w-8 hover:bg-transparent 2xl:mb-6 2xl:mr-0 2xl:h-10 2xl:w-10"
          >
            <Avatar>
              <AvatarImage src="/assets/image-avatar.jpg" />
              <AvatarFallback>FEM</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </nav>
  );
}
