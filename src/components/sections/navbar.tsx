"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import {
  CreditCard,
  Sparkles,
  Menu,
  User,
  Folder,
  Image,
  Globe,
  Home,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

type UserInfo = {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
} | null;

type NavLinkProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
};

const NavLink = ({ href, icon, children, isActive }: NavLinkProps) => (
  <Link
    href={href}
    className={`text-slate-600 transition-colors flex items-center px-3 py-2 text-sm font-medium rounded-md ${
      isActive
        ? "bg-indigo-100 !text-indigo-700"
        : "hover:text-slate-900 hover:bg-slate-100"
    }`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ href, icon, children, isActive }: NavLinkProps) => (
  <Link
    href={href}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
      isActive
        ? "bg-indigo-100 text-indigo-700"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`}
  >
    {icon}
    <span className="ml-3">{children}</span>
  </Link>
);

export default function NavBar({ userInfo }: { userInfo: UserInfo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", icon: <Home className="w-5 h-5 mr-2" />, label: "Home" },
    {
      href: "/community",
      icon: <Globe className="w-5 h-5 mr-2" />,
      label: "Community",
    },
    {
      href: "/my-images",
      icon: <Image className="w-5 h-5 mr-2" />,
      label: "My Images",
    },
    {
      href: "/saved-images",
      icon: <Folder className="w-5 h-5 mr-2" />,
      label: "Saved Images",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors mr-8"
            >
              Jade.ai
            </a>
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  isActive={pathname === link.href}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? (
              <UserActions userInfo={userInfo} />
            ) : (
              <SignInButton>
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <MobileMenu
          userInfo={userInfo}
          navLinks={navLinks}
          pathname={pathname}
        />
      )}
    </header>
  );
}

function UserActions({ userInfo }: { userInfo: NonNullable<UserInfo> }) {
  return (
    <>
      <Button
        variant="outline"
        className="bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
      >
        <CreditCard className="w-4 h-4 mr-2" />
        <span>100 Credits</span>
      </Button>
      <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none hover:from-indigo-600 hover:to-purple-700 transition-all duration-200">
        <Sparkles className="w-5 h-5 mr-2" />
        <span>Upgrade</span>
      </Button>
      <UserDropdown userInfo={userInfo} />
    </>
  );
}

function UserDropdown({ userInfo }: { userInfo: NonNullable<UserInfo> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 rounded-full px-2 hover:bg-slate-100"
        >
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={userInfo.imageUrl} alt={userInfo.name} />
            <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm text-slate-700">
            {userInfo.name.split(" ")[0]}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="end">
        <DropdownMenuItem className="py-2">
          <User className="mr-2 h-4 w-4" />
          <span className="truncate text-sm">{userInfo.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2">
          <Sparkles className="mr-2 h-4 w-4" />
          <span className="text-sm">Pricing</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2">
          <CreditCard className="mr-2 h-4 w-4" />
          <span className="text-sm">100 Credits</span>
          <Badge
            variant="secondary"
            className="ml-auto bg-indigo-100 text-indigo-700 font-semibold"
          >
            Pro
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-2 text-red-600 hover:text-red-700 hover:bg-red-50">
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileMenu({
  userInfo,
  navLinks,
  pathname,
}: {
  userInfo: UserInfo;
  navLinks: { href: string; icon: React.ReactNode; label: string }[];
  pathname: string;
}) {
  return (
    <div className="md:hidden bg-white shadow-lg absolute top-16 inset-x-0 z-20">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navLinks.map((link) => (
          <MobileNavLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            isActive={pathname === link.href}
          >
            {link.label}
          </MobileNavLink>
        ))}
        {userInfo ? (
          <>
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-slate-700">Credits</p>
              <p className="text-2xl font-bold text-indigo-600">100</p>
            </div>
            <Button className="w-full justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Upgrade to Pro</span>
            </Button>
            <SignOutButton>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Sign out
              </Button>
            </SignOutButton>
          </>
        ) : (
          <SignInButton>
            <Button className="w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700">
              Sign In
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
