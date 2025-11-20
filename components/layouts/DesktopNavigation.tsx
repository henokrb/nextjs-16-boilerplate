"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from '@/lib/constants/navigation';

export default function DesktopNavigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close menus on route change or window events
  useEffect(() => {
    const closeAll = () => {
      setOpenDropdown(null);
    };

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  // Close on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const linkClass = (href: string) =>
    `transition ${pathname === href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`;

  const dropdownClass = (basePath: string) =>
    `transition ${pathname.startsWith(basePath) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`;

  const submenuClass = (href: string) =>
    `block px-4 py-2 rounded transition ${
      pathname === href ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-gray-100"
    }`;

  const handleMouseEnter = (path: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(path);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 150);
    setHoverTimeout(timeout);
  };

  const toggleDropdown = (path: string) => {
    setOpenDropdown(prev => prev === path ? null : path);
  };

  const closeAll = () => {
    setOpenDropdown(null);
  };

  const renderDesktopNavItem = (item: (typeof navItems)[0]) => {
    if (item.submenu) {
      return (
        <div 
          key={item.href} 
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.href)}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => toggleDropdown(item.href)}
            className={`${dropdownClass(item.href)} flex items-center gap-1 py-2`}
            aria-expanded={openDropdown === item.href}
          >
            {item.label} <span>▾</span>
          </button>

          {openDropdown === item.href && (
            <div 
              className="absolute left-0 top-full bg-white mt-2 rounded-lg shadow-lg border min-w-48 z-50"
              onMouseEnter={() => handleMouseEnter(item.href)}
              onMouseLeave={handleMouseLeave}
            >
              {item.submenu.map((subItem) => (
                <Link 
                  key={subItem.href} 
                  href={subItem.href} 
                  className={submenuClass(subItem.href)} 
                  onClick={closeAll}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link 
          key={item.href} 
          href={item.href} 
          className={`${linkClass(item.href)} py-2 block`} 
          onClick={closeAll}
        >
          {item.label}
        </Link>
      );
    }
  };

  return (
    <nav ref={navRef} className="hidden md:flex items-center space-x-8 md:order-2">
      {navItems.map(renderDesktopNavItem)}
    </nav>
  );
}
