# Performance & Tech Stack Guidelines

These guidelines ensure the portfolio remains high-performance and idiomatic to modern Next.js development.

## 1. Next.js App Router & Component Architecture
- **Server Components by Default**: Components should be Server Components unless they require interactivity (state, effects, event listeners).
- **Surgical Client Components**: Use `"use client"` only at the leaves of the component tree to minimize the client-side JavaScript bundle.
- **Data Fetching**: Prefer Server Components for data fetching to reduce client-side overhead.

## 2. Tailwind CSS v4 Optimization
- **Efficiency**: Utilize Tailwind v4's performance improvements. Avoid excessive arbitrary values (e.g., `text-[13.5px]`) unless absolutely necessary.
- **Consistency**: Stick to the established color palette (primary, secondary, accent) and spacing scale.
- **Clean Class Lists**: Organize classes logically (layout -> sizing -> typography -> coloring -> interactivity).

## 3. Framer Motion Performance
- **Hardware Acceleration**: Only animate properties that can be hardware accelerated (`transform`, `opacity`, `filter`). Avoid animating properties like `width`, `height`, `top`, or `left` as they trigger layout repaints.
- **Viewports**: Use `viewport={{ once: true }}` for entrance animations to avoid redundant calculations when scrolling back up.
- **Layout Animations**: Use the `layout` prop carefully as it can be performance-intensive for complex component trees.

## 4. Code Quality & Standards
- **TypeScript Safety**: Ensure all components and functions are properly typed. Avoid `any`.
- **Modularity**: Keep components small and focused. Move complex logic into hooks or utility functions.
- **Accessibility**: Ensure components use proper ARIA labels and semantic HTML tags.
