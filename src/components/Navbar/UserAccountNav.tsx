'use client'

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Allow null for properties in User
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface UserAccountNavProps {
  user: User | undefined; // User type includes undefined
}

const UserAccountNav = ({ user }: UserAccountNavProps) => {
  const logoutWithGoogle = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("There was an error logging out:", err);
    }
  };

  const imageUrl = user?.image; // Optional chaining to safely access image
  const name = user?.name; // Optional chaining to safely access name
  const email = user?.email; // Optional chaining to safely access email

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <Avatar className="relative w-8 h-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="font-medium text-sm text-black">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-zinc-700">
                {email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Button
            className="w-full flex gap-2"
            variant="destructive"
            size="sm"
            onClick={logoutWithGoogle}
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
