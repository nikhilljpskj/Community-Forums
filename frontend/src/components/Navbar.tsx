'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = '/'; 
  };

  return (
    <nav className="w-full border-b border-border bg-white dark:bg-zinc-900 py-4 px-6 shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold text-primary">
          CommunityForums
        </Link>

        <div className="flex gap-4">
          <Link href="/">
            <Button variant={pathname === "/" ? "default" : "ghost"}>Home</Button>
          </Link>
          <Link href="/forum">
            <Button variant={pathname?.startsWith("/forum") ? "default" : "ghost"}>Forums</Button>
          </Link>
        </div>

        <div className="flex gap-2">
          {isLoggedIn ? (
            // Show Logout button if logged in
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-600 text-red-600 hover:bg-red-100 dark:hover:bg-zinc-800"
            >
              Logout
            </Button>
          ) : (
            <>
              {/* Show Login and Register buttons if not logged in */}
              <Link href="/login">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:hover:bg-zinc-800">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
