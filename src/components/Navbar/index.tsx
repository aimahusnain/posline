"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserAccountNav from "./UserAccountNav";
import React from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.log("There was an error logging in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ease-in-out ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-110">
                Posline
              </span>
            </Link>
            <Separator
              orientation="vertical"
              className="h-8 mx-4 bg-gray-200"
            />
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
                          pathname === item.href
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden md:flex items-center space-x-4">
          {!session ? (
              <>
              <Link
              href="/login"
              >
                <Button
                         
                          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Sign Up
                </Button>
                  </Link>
                <Button
                  variant="outline"
                  onClick={loginWithGoogle}
                  disabled={isLoading}
                  className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Button>
              </>
            ) : (
              <UserAccountNav user={user} />
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out ${
                pathname === item.href
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 space-y-2">
            {!session ? (
              <>
                <Button 
                          onClick={loginWithGoogle}
                          disabled={isLoading}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Sign Up
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Button>
              </>
            ) : (
              <UserAccountNav user={user} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
