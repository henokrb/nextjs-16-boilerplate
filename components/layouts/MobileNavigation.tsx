"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems } from '@/lib/constants/navigation';

export default function MobileNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
  }, [pathname]);

  const toggleMobileDropdown = (path: string) => {
    setMobileDropdown(prev => prev === path ? null : path);
  };

  const closeAll = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  const dropdownClass = (basePath: string) =>
    `transition ${pathname.startsWith(basePath) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`;

  const submenuClass = (href: string) =>
    `block px-4 py-2 rounded transition ${
      pathname === href ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-gray-100"
    }`;

  const linkClass = (href: string) =>
    `transition ${pathname === href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`;

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

  return (
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
                  <Image
                    src="/logo-mobile-light.png"
                    alt="Atlantic IT Solutions"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="dark:hidden w-auto h-[40px]"
                    priority
                  />
                  <Image
                    src="/logo-mobile-dark.png"
                    alt="Atlantic IT Solutions"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="hidden dark:block w-auto h-[40px]"
                    priority
                  />
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
  );
}
