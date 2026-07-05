# 🚀 Quick Implementation Guide

## Install Dependencies

Framer Motion is already installed, but verify:

```bash
cd Frontend/client
npm list framer-motion
# Should output: framer-motion@12.38.0 (or similar)
```

---

## Step 1: Update Your App.jsx

Your App.jsx has already been updated to use the new Loader component! ✅

---

## Step 2: Use Animated Components in Your Pages

### Example 1: ContactPage with Skeleton Loading

**Before:**
```jsx
export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      <ContactForm />
    </div>
  );
}
```

**After:**
```jsx
import SkeletonCard from "../components/SkeletonCard";
import AnimatedContainer from "../components/AnimatedContainer";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  
  return (
    <div>
      <AnimatedContainer>
        {loading ? (
          <SkeletonCard lines={5} imageHeight="h-32" />
        ) : (
          <ContactForm />
        )}
      </AnimatedContainer>
    </div>
  );
}
```

---

### Example 2: Replace Buttons with Animated Versions

**Before:**
```jsx
<button 
  onClick={handleSubmit}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
>
  Submit
</button>
```

**After:**
```jsx
import AnimatedButton from "../components/AnimatedButton";

<AnimatedButton 
  variant="primary" 
  size="md"
  onClick={handleSubmit}
>
  Submit
</AnimatedButton>
```

---

### Example 3: Animate Card Lists

**Before:**
```jsx
<div className="grid grid-cols-3 gap-4">
  {items.map((item) => (
    <div key={item.id} className="bg-white p-4 rounded-lg">
      {item.title}
    </div>
  ))}
</div>
```

**After:**
```jsx
import AnimatedCard from "../components/AnimatedCard";
import AnimatedContainer from "../components/AnimatedContainer";

<AnimatedContainer>
  <div className="grid grid-cols-3 gap-4">
    {items.map((item, idx) => (
      <AnimatedCard key={item.id} staggerIndex={idx}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </AnimatedCard>
    ))}
  </div>
</AnimatedContainer>
```

---

### Example 4: Full Page with Multiple Animation Types

```jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import all animation components
import AnimatedButton from "../components/AnimatedButton";
import AnimatedCard from "../components/AnimatedCard";
import SkeletonCard from "../components/SkeletonCard";
import AnimatedContainer from "../components/AnimatedContainer";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setItems([
        { id: 1, title: "Item 1" },
        { id: 2, title: "Item 2" },
        { id: 3, title: "Item 3" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // API call
    await new Promise((res) => setTimeout(res, 1500));
    setIsSubmitting(false);
  };

  return (
    <div className="p-8">
      {/* Loading overlay */}
      <LoadingSpinner isLoading={isSubmitting} text="Processing..." />

      {/* Page title with fade-in */}
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Items
      </motion.h1>

      {/* Items grid with skeleton loading */}
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <AnimatedContainer staggerChildren={true} delayChildren={0.1}>
          <div className="grid grid-cols-3 gap-4">
            {items.map((item, idx) => (
              <AnimatedCard key={item.id} staggerIndex={idx} variant="elevated">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  This is an animated card with stagger effect
                </p>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedContainer>
      )}

      {/* Action buttons */}
      <motion.div
        className="flex gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatedButton variant="primary" size="lg" onClick={handleSubmit}>
          Submit
        </AnimatedButton>
        <AnimatedButton variant="secondary" size="lg">
          Cancel
        </AnimatedButton>
      </motion.div>
    </div>
  );
}
```

---

## Step 3: Apply to Your Existing Pages

### ServiceBookingPage
- Wrap service cards in `AnimatedCard`
- Use `AnimatedButton` for booking buttons
- Add skeleton loaders while fetching services

### AppointmentBookingPage
- Add `SkeletonCard` for loading states
- Animate form fields entrance
- Use `LoadingSpinner` during submission

### AdminDashboard
- Use `AnimatedContainer` for staggered dashboard cards
- Add skeleton loaders for metrics
- Animate admin action buttons

### LandingPage
- Use `AnimatedCard` for feature cards
- Add scroll animations with `whileInView`
- Animate CTA buttons

---

## Step 4: Common Patterns

### Pattern: Loading State Transition
```jsx
import { AnimatePresence, motion } from "framer-motion";

{loading ? (
  <motion.div
    key="skeleton"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <SkeletonCard />
  </motion.div>
) : (
  <motion.div
    key="content"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <YourContent />
  </motion.div>
)}
```

### Pattern: Staggered Button Group
```jsx
import { motion } from "framer-motion";

const variants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
};

<motion.div variants={variants.container} initial="hidden" animate="show" className="flex gap-2">
  <motion.div variants={variants.item}>
    <AnimatedButton>Button 1</AnimatedButton>
  </motion.div>
  <motion.div variants={variants.item}>
    <AnimatedButton>Button 2</AnimatedButton>
  </motion.div>
</motion.div>
```

---

## Step 5: Testing Your Animations

### In Development
```bash
cd Frontend/client
npm run dev
```

### Test Checklist
- [ ] Page transitions are smooth (fade + slide)
- [ ] Loader spinner appears during loading
- [ ] Skeleton cards pulse while loading
- [ ] Cards animate in with stagger effect
- [ ] Buttons scale on hover
- [ ] Dark mode animations work
- [ ] No jittery animations
- [ ] Responsive on mobile

### Debug Tips
```jsx
// Add visual indicator for animations
const [showAnimationHelper, setShowAnimationHelper] = useState(false);

{showAnimationHelper && (
  <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 text-xs">
    Animation Active
  </div>
)}
```

---

## Step 6: Performance Optimization

### Use `whileInView` for Lazy Animation
```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Content
</motion.div>
```

### Memoize Complex Variants
```jsx
const cardVariants = useMemo(
  () => ({
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }),
  []
);
```

### Reduce Motion for Accessibility
```jsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

<motion.div animate={prefersReducedMotion ? {} : { rotate: 360 }}>
  Respects user preferences
</motion.div>
```

---

## Step 7: Mobile Optimization

### Adjust Animation Duration for Mobile
```jsx
import { useMediaQuery } from "@/hooks/useMediaQuery"; // or create your own

const isMobile = useMediaQuery("(max-width: 768px)");

<motion.div
  animate={{ x: 20 }}
  transition={{ duration: isMobile ? 0.3 : 0.5 }}
>
  Content
</motion.div>
```

### Reduce Animations on Lower-End Devices
```jsx
const isSlowDevice = navigator.deviceMemory < 4; // GB

{!isSlowDevice && (
  <motion.div animate={{ scale: 1.05 }}>
    Fancy animation
  </motion.div>
)}
```

---

## Component Files Created

```
Frontend/client/src/components/
├── Loader.jsx              # Modern animated spinner
├── SkeletonCard.jsx        # Skeleton loading card
├── AnimatedButton.jsx      # Button with hover effects
├── AnimatedCard.jsx        # Card with stagger animation
├── AnimatedContainer.jsx   # Container with staggered children
├── LoadingSpinner.jsx      # Full-screen loading overlay
└── PageTransition.jsx      # (already exists) Page animations
```

---

## Next Steps

1. ✅ Update App.jsx (done)
2. ⏭️ Apply animations to ServiceBookingPage
3. ⏭️ Apply animations to AppointmentBookingPage
4. ⏭️ Apply animations to AdminDashboard
5. ⏭️ Test all pages thoroughly
6. ⏭️ Deploy to production

---

## Troubleshooting

**Q: Animations feel slow**
A: Reduce transition duration (try 0.3s instead of 0.5s) or change timing function

**Q: Animations cause layout shift**
A: Add fixed dimensions or use `layout` prop cautiously

**Q: Dark mode colors wrong in animations**
A: Add `dark:` prefixes to all Tailwind classes

**Q: Page transitions stuttering**
A: Check browser performance, reduce animation count, use `will-change` sparingly

---

Need help? Check [ANIMATIONS_GUIDE.md](../ANIMATIONS_GUIDE.md) for detailed documentation!
