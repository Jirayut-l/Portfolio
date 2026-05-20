---
name: portfolio-content-specialist
description: Specialist for maintaining and updating a backend-focused personal portfolio. Use when adding new projects, updating skills, or synchronizing content from a CV/Resume into Next.js components while maintaining a high-performance and professional aesthetic.
---

# Portfolio Content Specialist

This skill streamlines the process of keeping a backend developer portfolio up-to-date and high-impact. It bridges the gap between raw technical experience (CV) and professional web presentation.

## Core Workflows

### 1. Synchronize from CV/Resume
Use this workflow when the user provides an updated PDF resume or asks to "update my site from my CV".

1. **Read the Resume**: Use `read_file` to extract text from `cv/jirayut.l Resume 2024.pdf`.
2. **Apply Mapping**: Refer to [cv-mapping.md](references/cv-mapping.md) for data schemas and mapping strategies.
3. **Draft Updates**: Generate the new `projects` and `skillCategories` arrays.
4. **Refine Metrics**: Use [impact-writing.md](references/impact-writing.md) to ensure all project descriptions and stats are quantifiable and high-impact.
5. **Update Components**: Use `replace` to update `src/components/Projects.tsx` and `src/components/Skills.tsx`.

### 2. Add a New Project
Use this when the user describes a new project or achievement.

1. **Information Gathering**: Ask for the project name, core tech, and the "main win" (impact).
2. **Refine Content**: Transform the "main win" into a quantifiable metric using [impact-writing.md](references/impact-writing.md).
3. **Select Icons**: Reference `src/components/Icons.tsx` to find an appropriate visual representation.
4. **Implementation**: Append the new project to the `projects` array in `src/components/Projects.tsx`.

## Quality Standards

- **Backend Focused**: Emphasize systems, architecture, and performance over UI/UX details.
- **Quantifiable Impact**: Every project MUST have a `stats` field with a number or percentage.
- **Tech Precision**: Use exact versions or specific libraries if mentioned in the resume (e.g., ".NET Core 8" instead of just ".NET").
- **Clean Aesthetic**: Keep descriptions concise (max 2 sentences) to maintain the layout's balance.

## References

- [CV Mapping Guide](references/cv-mapping.md): Schemas and extraction patterns.
- [Impact Writing Guide](references/impact-writing.md): How to write like a senior backend engineer.
- [Project Icons](src/components/Icons.tsx): Available SVG icons for use in project cards.
