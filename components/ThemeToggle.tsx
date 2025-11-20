// // 3-Way (dark/light/system) Toggle with Tooltip on Hover

// "use client";

// import { useEffect, useState } from "react";
// import { Sun, Moon, Monitor } from "lucide-react";

// type Theme = "light" | "dark" | "system";

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState<Theme>("system");

//   // Load saved theme on first render
//   useEffect(() => {
//     const saved = localStorage.getItem("theme") as Theme | null;

//     if (saved === "light" || saved === "dark" || saved === "system") {
//       setTheme(saved);
//       applyTheme(saved);
//     } else {
//       setTheme("system");
//       applyTheme("system");
//     }
//   }, []);

//   const applyTheme = (mode: Theme) => {
//     const root = document.documentElement;

//     if (mode === "dark") {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else if (mode === "light") {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     } else {
//       localStorage.setItem("theme", "system");

//       if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//         root.classList.add("dark");
//       } else {
//         root.classList.remove("dark");
//       }
//     }
//   };

//   const cycleTheme = () => {
//     const next: Theme =
//       theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

//     setTheme(next);
//     applyTheme(next);
//   };

//   // Tooltip text
//   const tooltip =
//     theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

//   return (
//     <div className="relative group inline-block">
//       <button
//         onClick={cycleTheme}
//         className="p-2 rounded-md transition-all duration-300 
//                    bg-gray-200 dark:bg-gray-800 
//                    text-gray-800 dark:text-gray-100 
//                    hover:scale-105"
//       >
//         {theme === "light" && <Sun size={20} />}
//         {theme === "dark" && <Moon size={20} />}
//         {theme === "system" && <Monitor size={20} />}
//       </button>

//       {/* Tooltip */}
//       <span
//         className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
//                    opacity-0 group-hover:opacity-100
//                    pointer-events-none
//                    bg-gray-800 text-white text-xs 
//                    dark:bg-gray-700
//                    px-2 py-1 rounded 
//                    whitespace-nowrap
//                    transition-opacity duration-200"
//       >
//         {tooltip}
//       </span>
//     </div>
//   );
// }


// 2-Way (dark/light) Toggle with Tooltip on Hover
"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  // Load saved theme OR system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return setTheme(saved);

    // system auto-detect
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  // Apply theme when toggled
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-md transition-all duration-300 
                 bg-gray-200 dark:bg-gray-800 
                 text-gray-800 dark:text-gray-100 
                 hover:scale-105"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
