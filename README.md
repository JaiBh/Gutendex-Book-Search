# Gutendex Book Search

## Stack

- Next.js 16, React 19, TypeScript
- React Hook Form + Zod (validation)
- shadcn/ui + Tailwind v4 (UI)
- Jest + React Testing Library (testing)
- Sonner (toast notifications)

## Features

- Search by title or author
- Filters: language, copyright status, author birth year range
- Pagination via API `next` / `previous` links
- Accessible list view showing subjects, languages, and download count

## Design Decisions

- Validation handled by Zod with cross-field year range checks
- Form logic split into small, reusable components for clarity and testing
- Graceful error handling with toast notifications
- Consistent dark/light theme using `next-themes`

## Testing

- Comprehensive tests for `BookForm` (inputs, filters, and error handling)
- [If more time] I’d add a smoke test for pagination buttons + a `getBooks` happy-path mock

## Running

```bash
npm install
npm run dev
npm test
```

## Live Demo

Deployed on Vercel for review purposes:
[https://gutendex-book-search-one.vercel.app/](https://gutendex-book-search-one.vercel.app/)

> Note: The GitHub repository is private and shared only with @omgduke and @Rototu as requested.
