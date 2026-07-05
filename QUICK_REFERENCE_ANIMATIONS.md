# 🎬 Animation Components - Quick Reference Card

## 📦 Components at a Glance

```
Loader                  SkeletonCard           AnimatedButton
├─ size: small          ├─ lines: 3            ├─ variant: primary
├─ size: medium         ├─ imageHeight: h-40   ├─ size: sm
├─ size: large          └─ pulsing animation   ├─ size: md
└─ variant: pulse       └─ dark mode ✅        ├─ size: lg
  └─ rotating ring      └─ responsive         └─ dark mode ✅

AnimatedCard            AnimatedContainer      LoadingSpinner
├─ variant: default     ├─ staggerChildren     ├─ isLoading: bool
├─ variant: elevated    ├─ delayChildren: 0.1  ├─ text: string
├─ variant: glass       └─ scroll animation    └─ dark mode ✅
├─ staggerIndex: 0
├─ hover: true
└─ dark mode ✅
```

---

## 🚀 Copy-Paste Quick Start

### 1. Modern Loader
```jsx
import Loader from "@/components/Loader";
<Loader size="large" />
```

### 2. Skeleton Loading
```jsx
import SkeletonCard from "@/components/SkeletonCard";
{loading ? <SkeletonCard /> : <Card />}
```

### 3. Animated Buttons
```jsx
import AnimatedButton from "@/components/AnimatedButton";
<AnimatedButton variant="primary" onClick={handleClick}>
  Submit
</AnimatedButton>
```

### 4. Animated Cards
```jsx
import AnimatedCard from "@/components/AnimatedCard";
<AnimatedCard staggerIndex={0}>
  <h3>Title</h3>
</AnimatedCard>
```

### 5. Full-Screen Loading
```jsx
import LoadingSpinner from "@/components/LoadingSpinner";
<LoadingSpinner isLoading={loading} text="Processing..." />
```

---

## 🎨 Component Props Cheat Sheet

### Loader
```javascript
<Loader
  size="large"        // "small" | "medium" | "large"
  variant="default"   // "default" | "pulse"
/>
```

### SkeletonCard
```javascript
<SkeletonCard
  lines={3}                 // number of text lines
  imageHeight="h-40"        // height of image placeholder
/>
```

### AnimatedButton
```javascript
<AnimatedButton
  variant="primary"   // "primary" | "secondary" | "danger" | "success"
  size="md"          // "sm" | "md" | "lg"
  disabled={false}    // boolean
  onClick={handler}   // function
  className=""       // string
>
  Button Text
</AnimatedButton>
```

### AnimatedCard
```javascript
<AnimatedCard
  variant="default"   // "default" | "elevated" | "glass"
  staggerIndex={0}    // number (for stagger delay)
  hover={true}        // boolean
  onClick={handler}   // function (optional)
  className=""       // string
>
  Card Content
</AnimatedCard>
```

### AnimatedContainer
```javascript
<AnimatedContainer
  staggerChildren={true}    // boolean
  delayChildren={0.1}       // number (seconds)
>
  {/* Children animate with stagger */}
</AnimatedContainer>
```

### LoadingSpinner
```javascript
<LoadingSpinner
  isLoading={true}        // boolean
  text="Loading..."       // string (optional)
/>
```

---

## 💡 Common Patterns

### Pattern 1: Loading State
```jsx
{isLoading ? (
  <SkeletonCard />
) : (
  <AnimatedCard>
    <Content />
  </AnimatedCard>
)}
```

### Pattern 2: Grid with Stagger
```jsx
<div className="grid grid-cols-3 gap-4">
  {items.map((item, idx) => (
    <AnimatedCard key={item.id} staggerIndex={idx}>
      {item.title}
    </AnimatedCard>
  ))}
</div>
```

### Pattern 3: Form Submission
```jsx
const [isSubmitting, setIsSubmitting] = useState(false);

<LoadingSpinner isLoading={isSubmitting} text="Submitting..." />

<form onSubmit={async (e) => {
  setIsSubmitting(true);
  await submitForm();
  setIsSubmitting(false);
}}>
  <AnimatedButton type="submit">Submit</AnimatedButton>
</form>
```

### Pattern 4: Button Group
```jsx
<div className="flex gap-2">
  <AnimatedButton variant="primary">Save</AnimatedButton>
  <AnimatedButton variant="secondary">Cancel</AnimatedButton>
  <AnimatedButton variant="danger">Delete</AnimatedButton>
</div>
```

### Pattern 5: Dashboard Cards
```jsx
<div className="grid md:grid-cols-3 gap-4">
  <AnimatedCard staggerIndex={0}>
    <p className="text-sm">Metric 1</p>
    <p className="text-3xl font-bold">42</p>
  </AnimatedCard>
  <AnimatedCard staggerIndex={1}>
    <p className="text-sm">Metric 2</p>
    <p className="text-3xl font-bold">128</p>
  </AnimatedCard>
  <AnimatedCard staggerIndex={2}>
    <p className="text-sm">Metric 3</p>
    <p className="text-3xl font-bold">1.2K</p>
  </AnimatedCard>
</div>
```

---

## 🎨 Button Variants & Sizes

### Variants
| Variant | Color | Use Case |
|---------|-------|----------|
| `primary` | Blue gradient | Main actions |
| `secondary` | Slate gray | Secondary actions |
| `danger` | Red | Delete/cancel actions |
| `success` | Green | Confirm actions |

### Sizes
| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | px-3 py-1.5 | text-sm | Compact UI |
| `md` | px-4 py-2.5 | text-base | Standard |
| `lg` | px-6 py-3 | text-lg | Large CTA |

---

## 🎯 Card Variants

| Variant | Style | Use Case |
|---------|-------|----------|
| `default` | White + border | Standard cards |
| `elevated` | Gradient + shadow | Premium/featured |
| `glass` | Glassmorphism | Modern/trendy |

---

## 📊 Animation Timings

| What | When | Duration |
|-----|------|----------|
| Page load | Initial | 350ms fade |
| Button click | Hover/tap | 300ms scale |
| Card entrance | On view | 500ms fade+slide |
| Skeleton pulse | Loading | 1500ms pulse |
| Loading spinner | Full screen | 200ms fade |

---

## 🔍 Visual States

### Button States
- **Default:** Normal appearance
- **Hover:** Scale 1.05 + shadow
- **Tap:** Scale 0.98
- **Disabled:** Opacity 50%

### Card States
- **Initial:** Opacity 0, translateY 20px
- **Animate:** Opacity 1, translateY 0 (staggered)
- **Hover:** TranslateY -8px, shadow-lg

### Skeleton States
- **Loading:** Pulsing animation (opacity 0.5 → 1)
- **Loaded:** Fade to content

---

## 🌓 Dark Mode

All components have automatic dark mode:
```jsx
// Light mode
bg-white text-slate-900

// Dark mode (automatically applied)
dark:bg-slate-800 dark:text-white
```

---

## 📱 Responsive

Components are mobile-first:
```jsx
// Sizes scale on mobile
<AnimatedButton size="md"> // Smaller on mobile
  Click Me
</AnimatedButton>

// Cards stack on mobile
<div className="grid md:grid-cols-3">
  {/* 1 col on mobile, 3 on desktop */}
</div>
```

---

## 🎬 Advanced: Custom Animations

### Import Framer Motion
```jsx
import { motion } from "framer-motion";

// Create custom animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.1 }}
  transition={{ duration: 0.3 }}
>
  Custom Animation
</motion.div>
```

---

## ❌ Common Mistakes

❌ **Don't:**
- Mix multiple animation libraries
- Use inline styles (breaks Tailwind)
- Animate without transition prop
- Forget dark: prefix on colors

✅ **Do:**
- Use Tailwind classes + dark: prefixes
- Add transition prop
- Test in dark mode
- Use whileInView for performance

---

## 🧪 Quick Test

Paste this in your page:
```jsx
import Loader from "@/components/Loader";
import AnimatedButton from "@/components/AnimatedButton";
import SkeletonCard from "@/components/SkeletonCard";

export default function AnimationTest() {
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="p-8 space-y-4">
      <Loader size="large" />
      <AnimatedButton variant="primary">Test Button</AnimatedButton>
      {loading && <SkeletonCard />}
      <button onClick={() => setLoading(!loading)}>
        Toggle Loading
      </button>
    </div>
  );
}
```

---

## 📚 Documentation

- **ANIMATIONS_GUIDE.md** - Full guide
- **COMPONENT_REFERENCE.md** - API details
- **IMPLEMENTATION_GUIDE_ANIMATIONS.md** - Step-by-step
- **ANIMATIONS_SETUP_COMPLETE.md** - Setup summary

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Animation not showing | Check `initial` and `animate` props |
| Jittery animation | Reduce duration or use will-change |
| Dark mode colors wrong | Add `dark:` prefixes to classes |
| Button not clickable | Check `disabled` prop |

---

## 📞 Quick Links

- Animation components: `src/components/Loader.jsx` etc.
- Example page: `src/pages/DashboardWithAnimations.jsx`
- Full docs: `ANIMATIONS_GUIDE.md`

---

**Bookmark this! 🔖** Save for quick reference while coding.
