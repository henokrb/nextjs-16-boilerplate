"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems } from '@/lib/constants/navigation';

export default function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close menus on route change or window events
  useEffect(() => {
    const closeAll = () => {
      setMobileOpen(false);
      setOpenDropdown(null);
    };

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("visibilitychange", () => document.hidden && closeAll());
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    
    return () => {
      document.removeEventListener("visibilitychange", closeAll);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  // Shared functions
  const closeAll = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
     setMobileDropdown(null);
  };

  const linkClass = (href: string) =>
    `transition ${pathname === href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`;

  const dropdownClass = (basePath: string) =>
    `transition ${pathname.startsWith(basePath) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`;

  const submenuClass = (href: string) =>
    `block px-4 py-2 rounded transition ${
      pathname === href ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-gray-100"
    }`;

  // Desktop hover handlers
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

   const toggleMobileDropdown = (path: string) => {
    setMobileDropdown(prev => prev === path ? null : path);
  };


  // Render mobile navigation 
const renderMobileNavItem = (item: (typeof navItems)[0]) => {
    if (item.submenu) {
      const isOpen = mobileDropdown === item.href;
      return (
        <li key={item.href}>
          <button
            className={`w-full text-left flex justify-between items-center py-2 px-3 rounded-lg ${
              isOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            } ${dropdownClass(item.href)}`}
            onClick={() => toggleMobileDropdown(item.href)}
            aria-expanded={isOpen}
          >
            <span>{item.label}</span>
            <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>

          {isOpen && (
            <ul className="pl-4 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <li key={subItem.href}>
                  <Link href={subItem.href} className={submenuClass(subItem.href)} onClick={closeAll}>
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li key={item.href}>
          <Link href={item.href} className={`block py-2 px-3 rounded-lg ${linkClass(item.href)} hover:bg-gray-50`} onClick={closeAll}>
            {item.label}
          </Link>
        </li>
      );
    }
  };
  


  // Render desktop navigation items
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
    <>
      {/* Mobile Navigation */}
     <div className="w-full md:hidden bg-white border-b">
      <div className="flex items-center justify-between p-4 dark:bg-black/100 dark:text-gray-500">
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition dark:bg-white"
        >
          {mobileOpen ? <X size={20} className="text-gray-900"/> : <Menu size={20} className="text-gray-900"/>}
        </button>
        
        {/* Empty div for balance - since logo is centered in header */}
        <div className="w-10"></div>
      </div>

        {mobileOpen && (
          <nav className="fixed inset-0 z-50 bg-white dark:bg-black/100 dark:text-gray-100">
            <div className="h-full overflow-auto p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={closeAll} aria-label="Atlantic IT Solutions Home">           
                  <div className="md:hidden">
                    <div className="w-[150px] h-[40px] bg-logo-mobile-dark bg-cover bg-no-repeat dark:hidden" />
                    <div className="w-[150px] h-[40px] bg-logo-mobile-light bg-cover bg-no-repeat hidden dark:block" />
                  </div> 
                </Link>
                <button 
                  onClick={closeAll} 
                  aria-label="Close menu"
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <X size={20} className="text-gray-900" />
                </button>
              </div>

              <ul className="flex flex-col gap-1">
                {navItems.map(renderMobileNavItem)}
              </ul>
            </div>
          </nav>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav ref={navRef} className="hidden md:flex items-center space-x-8 md:order-2">
        {navItems.map(renderDesktopNavItem)}
      </nav>
    </>
  );
}