# 🎬 UI Animations Guide

Complete guide to using professional animations in your React + Tailwind application.

## 📦 Components Overview

### 1. **Loader.jsx** - Modern Animated Spinner
Centered animated spinner with gradient effect and glow.

**Variants:**
- `default` - Rotating gradient ring (recommended)
- `pulse` - Pulsing gradient blob

**Sizes:**
- `small` (w-8 h-8)
- `medium` (w-12 h-12)
- `large` (w-16 h-16)

```jsx
import Loader from "./components/Loader";

// Default rotating spinner
<Loader size="large" />

// Pulsing blob
<Loader size="large" variant="pulse" />
```

---

### 2. **PageTransition.jsx** - Page Animations
Wraps pages with fade + blur + slide transitions.

```jsx
import PageTransition from "./components/PageTransition";

<PageTransition>
  <YourPage />
</PageTransition>
```

**Features:**
- Fade in: opacity 0 → 1
- Blur effect: blur(6px) → blur(0px)
- Slide up: y 12px → 0px
- Duration: 350ms with easing curve

---

### 3. **AnimatedButton.jsx** - Interactive Buttons
Buttons with scale animations on hover and tap.

**Variants:**
- `primary` - Blue gradient (default)
- `secondary` - Slate gray
- `danger` - Red
- `success` - Green

**Sizes:**
- `sm`, `md` (default), `lg`

```jsx
import AnimatedButton from "./components/AnimatedButton";

<AnimatedButton 
  variant="primary" 
  size="md"
  onClick={handleClick}
>
  Click Me
</AnimatedButton>

<AnimatedButton variant="danger" size="lg">
  Delete
</AnimatedButton>
```

**Effects:**
- Hover: scale 1 → 1.05
- Tap: scale 1 → 0.98
- Smooth shadow transitions

---

### 4. **AnimatedCard.jsx** - Card Containers
Cards with stagger animations and hover lift effect.

**Variants:**
- `default` - White bg with border
- `elevated` - Gradient with shadow
- `glass` - Glassmorphism effect

```jsx
import AnimatedCard from "./components/AnimatedCard";

<AnimatedCard 
  variant="default" 
  staggerIndex={0}
  hover={true}
>
  <h3>Card Title</h3>
  <p>Card content</p>
</AnimatedCard>
```

**Features:**
- Fade-in animation
- Stagger delay based on index
- Hover lift effect (translateY -8px)
- Dynamic shadow

---

### 5. **SkeletonCard.jsx** - Loading States
Animated skeleton loader for cards.

```jsx
import SkeletonCard from "./components/SkeletonCard";

{isLoading ? (
  <SkeletonCard lines={3} imageHeight="h-40" />
) : (
  <YourCard />
)}
```

**Props:**
- `lines` - Number of text lines (default: 3)
- `imageHeight` - Height of image placeholder (default: h-40)

**Features:**
- Pulsing animation
- Dark mode compatible
- Responsive design

---

### 6. **AnimatedContainer.jsx** - Stagger Children
Container that animates child elements with stagger effect.

```jsx
import AnimatedContainer from "./components/AnimatedContainer";

<AnimatedContainer staggerChildren={true} delayChildren={0.1}>
  <Item />
  <Item />
  <Item />
</AnimatedContainer>
```

**Props:**
- `staggerChildren` - Enable stagger (default: true)
- `delayChildren` - Delay between children (default: 0.1)

---

### 7. **LoadingSpinner.jsx** - Full-Screen Loader
Full-screen overlay with centered spinner for API calls.

```jsx
import LoadingSpinner from "./components/LoadingSpinner";

<LoadingSpinner isLoading={isLoading} text="Uploading..." />
```

---

## 🎯 Common Patterns

### Pattern 1: Page with Skeleton Loaders
```jsx
import { useState, useEffect } from "react";
import SkeletonCard from "./components/SkeletonCard";
import AnimatedCard from "./components/AnimatedCard";

export default function MyPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/items");
      setItems(await res.json());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        items.map((item, idx) => (
          <AnimatedCard key={item.id} staggerIndex={idx}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </AnimatedCard>
        ))
      )}
    </div>
  );
}
```

---

### Pattern 2: Modal with Overlay Animation
```jsx
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {children}
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-slate-200 dark:bg-slate-700 py-2"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### Pattern 3: Staggered List with Hover Effects
```jsx
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function List({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      {items.map((item) => (
        <motion.li
          key={item.id}
          variants={itemVariants}
          whileHover={{ x: 5 }}
          className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 cursor-pointer"
        >
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

## 🎨 Tailwind Classes for Animations

### Built-in Animations
```jsx
// Spinning animation
<div className="animate-spin">Loading...</div>

// Pulsing animation
<div className="animate-pulse">Updating...</div>

// Bouncing animation
<div className="animate-bounce">Attention!</div>

// Ping animation
<div className="animate-ping">Live indicator</div>
```

### Smooth Transitions with Dark Mode
```jsx
// Button with smooth color transition
<button className="bg-blue-500 dark:bg-blue-600 transition-colors duration-200 hover:bg-blue-600 dark:hover:bg-blue-700">
  Button
</button>

// Card with smooth shadow
<div className="shadow-md dark:shadow-slate-900/50 transition-shadow duration-300 hover:shadow-lg">
  Card
</div>
```

---

## ✨ Best Practices

1. **Use `whileInView` for Performance**
   - Only animate when element enters viewport
   - Reduces CPU usage on long pages

2. **Respect User Preferences**
   ```jsx
   const prefersReducedMotion = window.matchMedia(
     "(prefers-reduced-motion: reduce)"
   ).matches;
   
   <motion.div
     animate={prefersReducedMotion ? {} : animationVariants}
   >
   ```

3. **Keep Animations Snappy**
   - Duration: 300-500ms for most animations
   - Use ease curves: `[0.21, 0.61, 0.35, 1]` for natural feel

4. **Use Consistent Animation Library**
   - Framer Motion for complex animations
   - Tailwind `animate-*` classes for simple animations

5. **Dark Mode Compatibility**
   - Always include `dark:` variant classes
   - Test colors in both themes

6. **Accessibility**
   - Don't rely on animation alone for information
   - Ensure keyboard navigation works
   - Provide text alternatives

---

## 📊 Performance Tips

1. **Use `layout` Prop Sparingly**
   ```jsx
   // Heavy computation - use only when needed
   <motion.div layout>Content</motion.div>
   ```

2. **Memoize Variant Objects**
   ```jsx
   const variants = useMemo(() => ({...}), []);
   ```

3. **Use `exit` Animations Wisely**
   ```jsx
   <AnimatePresence mode="wait">
     {isVisible && <motion.div exit={{...}}>Content</motion.div>}
   </AnimatePresence>
   ```

4. **Lazy Load Heavy Components**
   - Use React.lazy() for large animation-heavy components
   - Load on demand

---

## 🔧 Customization

### Custom Animation Variants
```jsx
import { motion } from "framer-motion";

const myVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, type: "spring" }
  },
  exit: { opacity: 0, scale: 0.8 },
};

<motion.div variants={myVariants} initial="initial" animate="animate" exit="exit">
  Custom Animation
</motion.div>
```

### Tailwind Extended Animations
```jsx
// In tailwind.config.js
export default {
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
};
```

---

## 🐛 Troubleshooting

### Animation Not Running
- Check `initial` and `animate` props
- Verify `variants` object structure
- Use browser DevTools to inspect element

### Jittery Animations
- Avoid mixing Tailwind animations with Framer Motion
- Use `will-change` CSS property cautiously
- Profile with Chrome DevTools Performance tab

### Dark Mode Not Applied
- Ensure `dark:` prefixes are in class names
- Check `tailwind.config.js` has `darkMode: "class"`
- Test with developer tools

### Accessibility Issues
- Add `aria-label` attributes
- Test with keyboard navigation
- Verify color contrast (WCAG AA)

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind Animation Docs](https://tailwindcss.com/docs/animation)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

---

**Last Updated:** 2024
