import type { ProjectEntry } from './schema';

// Public, currently-live work. Private/in-progress apps are intentionally left out
// until they ship — see the "Things I've actually shipped" section on the Codeworks page.
export const projects: ProjectEntry[] = [
  {
    name: 'Tetris Flip',
    category: 'Game',
    description:
      'A puzzle game that mixes classic Tetris with a dual-field flip mechanic — flip which half of the board is live and send the next pieces the other way. Six modes, from a straight Marathon to a two-player co-op board.',
    tech: ['JavaScript', 'HTML5 Canvas', 'Vite', 'Electron'],
    href: 'https://github.com/timetoady/tetrisFlipV1',
    hrefLabel: 'Code & desktop builds on GitHub',
  },
  {
    name: 'RomajiOverlay',
    category: 'Android app',
    description:
      'An Android accessibility service that spots Japanese text inside Google Messages and draws translucent romaji pronunciation right over it — a quiet reading aid for language learners. Works offline, uses a custom Hepburn transliteration engine, and asks for no risky permissions.',
    tech: ['Kotlin', 'Android Accessibility', 'Kuromoji NLP'],
    href: 'https://github.com/timetoady/romajiOverlay',
    hrefLabel: 'View on GitHub',
    accent: 'codeworks',
  },
  {
    name: 'my-voice-mcp',
    category: 'MCP server',
    description:
      'A local-first MCP server that builds a compact profile of a writing voice from samples, then rewrites or generates new text in it. Ships with multiple provider adapters — including AWS Bedrock and Ollama — and an evaluation harness.',
    tech: ['TypeScript', 'Model Context Protocol', 'AWS Bedrock'],
    href: 'https://github.com/timetoady/my-voice-mcp',
    hrefLabel: 'View on GitHub',
  },
  {
    name: 'requirement-delivery-workflow',
    category: 'AI agent skill',
    description:
      'A tracker-agnostic, hard-gated delivery workflow for AI coding agents: requirement intake → MVP → independent critique and persona/UX review → a bounded quality-gate loop → PR and closeout. MIT-licensed and built to be reused.',
    tech: ['Agent skill', 'Markdown', 'MIT'],
    href: 'https://github.com/timetoady/requirement-delivery-workflow',
    hrefLabel: 'View on GitHub',
  },
  {
    name: 'death-rattle',
    category: 'AI dev tool',
    description:
      'Parses an interrupted AI coding session and generates a clean bootstrap prompt to pick it back up on another tool — Claude Code, Codex, Copilot, and more. For when a session dies mid-thought and you just want to keep going.',
    tech: ['TypeScript', 'CLI'],
    href: 'https://github.com/timetoady/death-rattle',
    hrefLabel: 'View on GitHub',
  },
];
