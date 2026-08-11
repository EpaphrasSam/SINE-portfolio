/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ground: 'rgb(var(--c-ground) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raise: 'rgb(var(--c-raise) / <alpha-value>)',
        rule: 'rgb(var(--c-rule) / <alpha-value>)',
        'rule-strong': 'rgb(var(--c-rule-strong) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--c-ink-3) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',
        'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // label / eyebrow
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        // body scale
        sm: ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.125rem', { lineHeight: '1.65' }],
        // display scale
        h3: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.015em' }],
        h2: ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.022em' }],
        h1: ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        hero: ['clamp(3rem, 10.5vw, 8.75rem)', { lineHeight: '0.86', letterSpacing: '-0.05em' }],
      },
      maxWidth: {
        measure: '66ch',
        shell: '72rem',
      },
      spacing: {
        section: '6rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
