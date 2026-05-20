---
name: portfolio-code-reviewer
description: Proactive code reviewer for this portfolio. Use to analyze components for Next.js, Tailwind v4, and Framer Motion performance standards and automatically fix identified issues.
---

# Portfolio Code Reviewer

This skill automates the review and optimization of the portfolio codebase. It enforces strict performance and architectural standards while actively implementing fixes.

## Core Workflow: Review & Optimize

Trigger this workflow when the user asks for a "code review", "optimization", or "performance check".

1. **Target Identification**: Identify the files to be reviewed (e.g., specific components in `src/components`).
2. **Standard Alignment**: Read [performance-guidelines.md](references/performance-guidelines.md) to understand the required standards.
3. **Deep Analysis**: Read the target files and analyze them against the guidelines. Look for:
    - Improper `"use client"` placement.
    - Inefficient Framer Motion animations (non-accelerated properties).
    - Sub-optimal Tailwind v4 class usage.
    - Missing type safety or accessibility features.
4. **Active Implementation**:
    - For each identified issue, draft a precise fix.
    - Use the `replace` tool to apply the optimizations directly to the codebase.
5. **Verification**: After applying fixes, run `npm run build` (if available) to ensure no regressions were introduced.

## Quality Standards

- **Zero-Tolerance for Bloat**: Always aim to minimize client-side bundle size.
- **Smooth Animations**: Animations must be 60fps+; prioritize CSS-native acceleration.
- **Backend Aesthetic**: Ensure code changes do not inadvertently alter the professional, minimalist design.

## References

- [Performance Guidelines](references/performance-guidelines.md): Detailed technical standards for this project.
- [Next.js Documentation](https://nextjs.org/docs): Standard reference for App Router patterns.
- [Framer Motion Performance Guide](https://www.framer.com/motion/performance/): Best practices for animations.
