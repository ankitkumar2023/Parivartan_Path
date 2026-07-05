# 🎨 Animation Components Reference

Complete reference for all animation components with code examples and use cases.

---

## 1️⃣ Loader Component

**File:** `src/components/Loader.jsx`

**Purpose:** Modern animated spinner with gradient effect

### Usage Examples

#### Default Rotating Spinner
```jsx
import Loader from "@/components/Loader";

<Loader size="large" />
```

**Props:**
| Prop | Type | Default | Options |
|------|------|---------|---------|
| `size` | string | "large" | "small", "medium", "large" |
| `variant` | string | "default" | "default", "pulse" |

#### Pulse Variant
```jsx
<Loader size="large" variant="pulse" />
```

### Visual Sizes
- **small** (w-8 h-8) - Inline loaders
- **medium** (w-12 h-12) - Small loading states
- **large** (w-16 h-16) - Page loading states

### Use Cases
- Page load indicator
- API call loader
- Data fetching spinner
- Image loading state

---

## 2️⃣ SkeletonCard Component

**File:** `src/components/SkeletonCard.jsx`

**Purpose:** Animated skeleton placeholder for cards

### Usage Example

```jsx
import SkeletonCard from "@/components/SkeletonCard";
import { useState, useEffect } from "react";

export default function MyComponent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {loading ? (
        <>
          <SkeletonCard lines={3} imageHeight="h-40" />
          <SkeletonCard lines={3} imageHeight="h-40" />
          <SkeletonCard lines={3} imageHeight="h-40" />
        </>
      ) : (
        items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))
      )}
    </div>
  );
}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | number | 3 | Number of text line skeletons |
| `imageHeight` | string | "h-40" | Height of image skeleton |

### Structure
- Image placeholder at top
- Title skeleton (wider)
- Content lines (with last one narrower)
- Button skeleton at bottom
- Pulsing animation on all elements

### Use Cases
- Card grid loading
- Product list loading
- Article list loading
- Dashboard metrics loading

---

## 3️⃣ AnimatedButton Component

**File:** `src/components/AnimatedButton.jsx`

**Purpose:** Interactive buttons with scale animations

### Usage Examples

#### Primary Button
```jsx
import AnimatedButton from "@/components/AnimatedButton";

<AnimatedButton 
  variant="primary" 
  size="md"
  onClick={() => console.log("Clicked!")}
>
  Click Me
</AnimatedButton>
```

#### All Variants
```jsx
<div className="flex gap-2">
  <AnimatedButton variant="primary">Primary</AnimatedButton>
  <AnimatedButton variant="secondary">Secondary</AnimatedButton>
  <AnimatedButton variant="danger">Delete</AnimatedButton>
  <AnimatedButton variant="success">Confirm</AnimatedButton>
</div>
```

#### Different Sizes
```jsx
<div className="flex gap-2">
  <AnimatedButton size="sm">Small</AnimatedButton>
  <AnimatedButton size="md">Medium</AnimatedButton>
  <AnimatedButton size="lg">Large</AnimatedButton>
</div>
```

#### Disabled State
```jsx
<AnimatedButton disabled>Disabled</AnimatedButton>
```

**Props:**
| Prop | Type | Default | Options |
|------|------|---------|---------|
| `variant` | string | "primary" | "primary", "secondary", "danger", "success" |
| `size` | string | "md" | "sm", "md", "lg" |
| `disabled` | boolean | false | - |
| `onClick` | function | - | - |
| `className` | string | "" | Any Tailwind classes |

### Animations
- **Hover:** Scale 1 → 1.05
- **Tap:** Scale 1 → 0.98
- **Shadow:** Smooth shadow transitions

### Use Cases
- Form submissions
- Action buttons
- Navigation links
- CTA buttons

---

## 4️⃣ AnimatedCard Component

**File:** `src/components/AnimatedCard.jsx`

**Purpose:** Cards with stagger entrance and hover lift effect

### Usage Examples

#### Default Card
```jsx
import AnimatedCard from "@/components/AnimatedCard";

<AnimatedCard>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</AnimatedCard>
```

#### With Stagger in Grid
```jsx
<div className="grid grid-cols-3 gap-4">
  {items.map((item, idx) => (
    <AnimatedCard 
      key={item.id}
      staggerIndex={idx}
      variant="default"
      hover={true}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </AnimatedCard>
  ))}
</div>
```

#### Different Variants
```jsx
<div className="grid grid-cols-3 gap-4">
  <AnimatedCard variant="default">
    <p>Default - white with border</p>
  </AnimatedCard>
  
  <AnimatedCard variant="elevated">
    <p>Elevated - gradient with shadow</p>
  </AnimatedCard>
  
  <AnimatedCard variant="glass">
    <p>Glass - glassmorphism effect</p>
  </AnimatedCard>
</div>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | "default" | "default", "elevated", "glass" |
| `staggerIndex` | number | 0 | Index for stagger delay calculation |
| `hover` | boolean | true | Enable hover lift effect |
| `onClick` | function | - | Optional click handler |
| `className` | string | "" | Additional Tailwind classes |

### Animations
- **Entrance:** Fade-in + slide-up (staggered)
- **Hover:** Lift effect (translateY -8px)
- **Shadow:** Dynamic shadow on hover

### Variants
| Variant | Description |
|---------|-------------|
| `default` | White bg, subtle border (standard card) |
| `elevated` | Gradient bg, strong shadow (premium look) |
| `glass` | Semi-transparent, backdrop blur (modern look) |

### Use Cases
- Dashboard metrics
- Feature showcase
- Product cards
- Content cards
- Team member cards

---

## 5️⃣ AnimatedContainer Component

**File:** `src/components/AnimatedContainer.jsx`

**Purpose:** Container that staggers child element animations

### Usage Examples

#### Basic Stagger
```jsx
import AnimatedContainer from "@/components/AnimatedContainer";

<AnimatedContainer staggerChildren={true} delayChildren={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</AnimatedContainer>
```

#### With Custom Delays
```jsx
<AnimatedContainer staggerChildren={true} delayChildren={0.15}>
  {items.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}
</AnimatedContainer>
```

#### No Stagger (Just Container Animation)
```jsx
<AnimatedContainer staggerChildren={false}>
  <div>All items appear at once</div>
  <div>With fade-in animation</div>
  <div>Smooth entrance</div>
</AnimatedContainer>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `staggerChildren` | boolean | true | Enable stagger effect |
| `delayChildren` | number | 0.1 | Delay between children (seconds) |

### Animations
- **Container:** Fade-in animation
- **Children:** Fade-in + slide-up (staggered)
- **Viewport:** Only animates when visible

### Use Cases
- List animations
- Menu items
- Dashboard sections
- Feature lists
- Activity feeds

---

## 6️⃣ LoadingSpinner Component

**File:** `src/components/LoadingSpinner.jsx`

**Purpose:** Full-screen loading overlay with spinner

### Usage Examples

#### Basic Usage
```jsx
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";

export default function MyPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await submitForm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} text="Submitting..." />
      
      <form onSubmit={handleSubmit}>
        {/* form fields */}
      </form>
    </>
  );
}
```

#### Different Loading Messages
```jsx
<LoadingSpinner isLoading={uploading} text="Uploading file..." />
<LoadingSpinner isLoading={processing} text="Processing data..." />
<LoadingSpinner isLoading={saving} text="Saving changes..." />
<LoadingSpinner isLoading={loading} /> {/* No text */}
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | boolean | true | Show/hide spinner |
| `text` | string | "Loading..." | Loading message |

### Features
- Full-screen overlay with backdrop blur
- Centered spinner
- Loading text with pulse animation
- Dark mode support
- Smooth entrance/exit

### Use Cases
- Form submission
- File upload
- Data processing
- API calls
- Long operations

---

## 7️⃣ PageTransition Component

**File:** `src/components/PageTransition.jsx`

**Purpose:** Smooth page entrance animations

### Usage (Already Integrated)

```jsx
import PageTransition from "@/components/PageTransition";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageTransition>
            <LandingPage />
          </PageTransition>
        }
      />
    </Routes>
  );
}
```

### Animations
- **Entrance:** Fade-in + blur + slide-up (350ms)
- **Exit:** Fade-out + blur + slide-down (200ms)
- **Easing:** Smooth cubic bezier curve

### Features
- Consistent page transitions
- Smooth blur effect
- Hardware-accelerated
- Minimal performance impact

---

## 🎯 Animation Timing Cheat Sheet

| Animation | Duration | Use Case |
|-----------|----------|----------|
| Micro-interactions (hover, tap) | 200-300ms | Buttons, links |
| Page transitions | 300-500ms | Route changes |
| Card stagger | 100-150ms delay | Lists, grids |
| Skeleton pulse | 1500-2000ms | Loading states |
| Modal entrance | 300-400ms | Modals, popups |
| Scroll animations | 500-800ms | Reveal on scroll |

---

## 🎨 Color Scheme (Dark Mode)

All components automatically adapt to dark mode:

**Light Mode:**
- Backgrounds: white, slate-100
- Text: slate-900, slate-600
- Borders: slate-200
- Shadows: Light gray

**Dark Mode:**
- Backgrounds: slate-900, slate-800, slate-950
- Text: white, slate-300
- Borders: slate-700
- Shadows: slate-900/50

---

## ⚙️ Configuration

### Customize Animation Speed Globally

Create `src/utils/animationConfig.ts`:
```typescript
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
};

export const EASING = {
  smooth: [0.21, 0.61, 0.35, 1],
  snappy: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55],
};
```

Use in components:
```jsx
<motion.div
  transition={{
    duration: ANIMATION_DURATIONS.normal,
    ease: EASING.smooth,
  }}
>
  Content
</motion.div>
```

---

## ✨ Advanced Patterns

### Pattern: Coordinated Animations
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

<motion.div variants={containerVariants} initial="hidden" animate="show">
  <motion.div variants={childVariants}>Item 1</motion.div>
  <motion.div variants={childVariants}>Item 2</motion.div>
</motion.div>
```

### Pattern: Gesture Animations
```jsx
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Gesture Button
</motion.button>
```

### Pattern: Scroll Animations
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true, margin: "-100px" }}
>
  This appears when scrolled into view
</motion.div>
```

---

## 🐛 Debugging

### Enable Animation Debug Mode
```jsx
// Add to a debug component
<div className="fixed top-4 right-4 bg-blue-500 text-white p-2 text-xs z-50">
  <p>Animations Active</p>
  <p>View in DevTools → Performance</p>
</div>
```

### Profile Animations
```jsx
// Chrome DevTools → Performance → Record
// Look for:
// - Animation duration
// - Frame rate (target 60fps)
// - CPU usage
```

---

## 📱 Mobile Considerations

### Reduce Animations on Mobile
```jsx
import { useMediaQuery } from "@/hooks/useMediaQuery";

const isMobile = useMediaQuery("(max-width: 768px)");

<motion.div
  animate={isMobile ? { scale: 1 } : { scale: 1.05 }}
  transition={{ duration: isMobile ? 0.2 : 0.5 }}
>
  Mobile-optimized animation
</motion.div>
```

### Respect Prefers-Reduced-Motion
```jsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

<motion.div
  animate={prefersReducedMotion ? {} : { rotate: 360 }}
>
  Accessible animation
</motion.div>
```

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind Animation](https://tailwindcss.com/docs/animation)
- [Web Animation Performance](https://web.dev/animations-guide/)

---

**Last Updated:** 2024
