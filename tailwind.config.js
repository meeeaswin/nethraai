/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#111827',
            '--tw-prose-lead': '#4B5563',
            '--tw-prose-links': '#111827',
            '--tw-prose-bold': '#111827',
            '--tw-prose-counters': '#6B7280',
            '--tw-prose-bullets': '#D1D5DB',
            '--tw-prose-hr': '#E5E7EB',
            '--tw-prose-quotes': '#111827',
            '--tw-prose-quote-borders': '#E5E7EB',
            '--tw-prose-captions': '#6B7280',
            '--tw-prose-code': '#111827',
            '--tw-prose-pre-code': '#E5E7EB',
            '--tw-prose-pre-bg': '#1F2937',
            '--tw-prose-th-borders': '#D1D5DB',
            '--tw-prose-td-borders': '#E5E7EB',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};