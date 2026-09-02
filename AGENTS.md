# Project Instructions

## Product language

All repository instructions, comments, internal notes, and documentation should be written in English.

All user-facing website copy must be written in natural Turkish.

Do not expose English placeholder copy in the final UI unless it is explicitly marked as a developer TODO.

## Source of truth

Read `SPEC.md` before making product, copywriting, SEO, analytics, or UX decisions.

Treat verified business facts in `SPEC.md` as constraints.

Do not invent business claims, customer reviews, ratings, certifications, awards, guarantees, statistics, or service areas.

## Priorities

Optimize in this order:

1. User trust
2. WhatsApp lead conversion
3. Mobile usability
4. Performance
5. Google Ads landing-page quality
6. Local SEO
7. Visual polish

When priorities conflict, prefer the higher-ranked goal.

## Engineering approach

Prefer the simplest robust implementation.

Use vanilla HTML, CSS, and JavaScript unless the task explicitly changes the stack.

Avoid unnecessary dependencies, frameworks, abstraction, animation, and complexity.

Important content must remain accessible without JavaScript.

Use semantic HTML and progressive enhancement.

## Agent behavior

Inspect the repository and relevant documentation before editing.

Use applicable Codex skills, tools, or subagents when they materially improve the result, and follow their instructions.

Do not ask for minor implementation or visual decisions that can be reasonably inferred from the product goals.

For meaningful tasks:

1. inspect,
2. plan briefly,
3. implement,
4. verify,
5. refine obvious issues.

Do not stop after generating code if the result can be tested or inspected.

## Verification

Before considering the landing page complete, verify:

- responsive behavior
- WhatsApp links
- conversion tracking hooks
- SEO metadata
- semantic structure
- accessibility basics
- broken interactions
- obvious layout overflow
- unnecessary code
- performance regressions

Fix issues found during verification when practical.
