# Temporal Timestamp Tools

A modern web application for Unix timestamp conversions built with Next.js 13 and React 19.

## Features

- **Real-time Clock**: Displays current Unix timestamp and seconds since epoch (January 1, 1970)
- **Timestamp to DateTime**: Convert Unix timestamps to human-readable date and time
- **DateTime to Timestamp**: Convert date and time to Unix timestamp format
- **Modern UI**: Clean, responsive interface using Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with gradient backgrounds
- **Components**: shadcn/ui component library
- **Utilities**: react-use for hooks and helpers
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   └── page.tsx            # Main page with timestamp tools
├── components/
│   ├── clock.tsx           # Real-time clock component
│   ├── layout/             # Layout components (header, footer, main)
│   ├── tools/              # Timestamp conversion tools
│   └── ui/                 # shadcn/ui component wrappers
└── lib/
    └── utils.ts            # Utility functions
```

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

## Deployment

This project is optimized for deployment on Vercel. The easiest way to deploy is:

```bash
vercel --prod
```

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Development Notes

- Uses App Router for improved performance and routing
- TypeScript for type safety throughout the application
- Tailwind CSS for utility-first styling with custom gradients
- shadcn/ui provides accessible, customizable components
- Real-time updates using React hooks and intervals
