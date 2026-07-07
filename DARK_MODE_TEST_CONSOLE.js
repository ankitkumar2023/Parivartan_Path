// QUICK TEST: Paste this into browser console to verify dark mode is working

console.log("=== DARK MODE VERIFICATION ===\n");

// Check 1: HTML element has dark class
const hasDarkClass = document.documentElement.classList.contains("dark");
console.log("✓ Check 1: HTML has 'dark' class?", hasDarkClass ? "YES" : "NO");

// Check 2: body background color
const bodyComputedStyle = window.getComputedStyle(document.body);
const bodyBgColor = bodyComputedStyle.backgroundColor;
console.log("✓ Check 2: Body background-color:", bodyBgColor);

// Check 3: Theme in localStorage
const storedTheme = localStorage.getItem("theme");
console.log("✓ Check 3: Theme in localStorage:", storedTheme || "NOT SET");

// Check 4: Tailwind classes on main content div
const mainDiv = document.querySelector("[class*='min-h-screen']");
if (mainDiv) {
  console.log("✓ Check 4: Main div has Tailwind classes:", mainDiv.className);
} else {
  console.log("✓ Check 4: Main div not found");
}

// Check 5: CSS Rule for body (should NOT have hardcoded colors anymore)
const styles = document.styleSheets;
let foundBodyRule = false;
try {
  for (let i = 0; i < styles.length; i++) {
    try {
      const rules = styles[i].cssRules;
      for (let j = 0; j < rules.length; j++) {
        if (rules[j].selectorText === "body") {
          console.log("✓ Check 5: Found body CSS rule");
          console.log("   Rule:", rules[j].cssText);
          foundBodyRule = true;
        }
      }
    } catch (e) {
      // CORS or other cross-origin stylesheet - skip
    }
  }
} catch (e) {
  console.log("✓ Check 5: Could not inspect stylesheets (CORS protected)");
}

console.log("\n=== TEST PROCEDURE ===");
console.log("1. Look for theme toggle button (☀️ or 🌙) in navbar");
console.log("2. Click it to toggle between light/dark mode");
console.log("3. Expected: UI background & text colors change smoothly");
console.log("4. Refresh page: Theme should persist (saved in localStorage)");
console.log("\n=== IF NOT WORKING ===");
console.log("1. Hard refresh: Ctrl+Shift+Delete or Ctrl+F5");
console.log("2. Restart dev server: npm run dev");
console.log("3. Check if html element class is actually changing:");
console.log("   → Run: document.documentElement.className");
console.log("   → Should see 'dark' appear/disappear when toggle clicked");
// 4. Check localStorage: Run: localStorage.getItem('theme')");
