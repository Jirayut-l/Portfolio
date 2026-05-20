# CV to Portfolio Mapping

This guide provides schemas and patterns for extracting content from the user's PDF resume and mapping it to the React components in this project.

## Component Schemas

### Projects (`src/components/Projects.tsx`)
Each project object should follow this structure:

```typescript
{
  title: string,       // Concise project name or role-project
  description: string, // Impact-driven description (1-2 sentences)
  tech: string[],      // 3-5 core technologies used
  stats: string,       // Key metric (e.g., "30% faster", "99.9% uptime")
  icon: JSX.Element,   // Reference an icon from Icons.tsx
  link: string,        // Link to live demo or project page
  github: string,      // Link to repository
}
```

### Skills (`src/components/Skills.tsx`)
Skills are grouped into categories:

```typescript
{
  title: string,       // e.g., "Languages", "Backend", "Databases"
  icon: JSX.Element,   // Reference an icon from Icons.tsx
  skills: string[],    // List of specific technologies
  color: string,       // Tailwind text color class (e.g., "text-blue-500")
}
```

## Mapping Strategies

### From Resume Experience to Projects
- **Group by Company**: If a role involved many tasks, pick the most "visualizable" or "high-impact" system as a "Project".
- **Extract Metrics**: Look for numbers in the resume. If missing, use the `impact-writing.md` guide to estimate or frame.
- **Tech Stack**: Only list technologies explicitly mentioned in the resume or project context.

### From Technical Skills to Skills Component
- **Categorization**: Map "Languages" to Languages, "Frameworks" to Backend, "Databases" to Databases, and "Tools/Platforms" to Infrastructure.
- **Deduplication**: Ensure technologies listed in Projects are also present in the Skills component if they are "core competencies".
