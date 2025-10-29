# 📚 Gutendex Book Search

A modern web app for exploring books from the [Gutendex API](https://gutendex.com/), built with **Next.js 16**, **React 19**, and **TypeScript**.  
Users can search by title or author, filter by language or publication details, and browse results with smooth pagination.

---

## 🧰 Tech Stack

- **Next.js 16**, **React 19**, **TypeScript**
- **React Hook Form** + **Zod** – form handling and schema validation
- **shadcn/ui** + **Tailwind CSS v4** – accessible and responsive UI
- **Jest** + **React Testing Library** – component and form tests
- **Sonner** – toast notifications
- **next-themes** – light/dark mode support

---

## ✨ Features

- 🔍 **Search** books by title or author
- 🧭 **Filter** by language, copyright status, and author birth year range
- 📖 **Paginated results** via API `next` / `previous` links
- 🌗 **Dark/light theme** with persistent user preference
- 🧑‍💻 **Accessible list view** showing subjects, languages, and download counts
- ⚡ **Real-time validation** with cross-field year checks

---

## 🧠 Design Decisions

- Schema validation handled entirely by **Zod**, including dependent year range checks
- Form logic modularised into **small, testable components**
- Toast-based feedback for graceful error handling and empty states
- Consistent theming with **next-themes** and Tailwind CSS tokens

---

## 🧪 Testing

- Unit and integration tests for form inputs, filters, and validation logic
- Snapshot coverage for main components
- **Planned:** smoke tests for pagination + `getBooks` API mocks

---

## 🚀 Future Improvements

- Integrate **TanStack Query** for caching, pagination, and background refetching
- Add **loading skeletons** for better UX during fetches
- Extend test coverage to include pagination and API edge cases
- Optionally introduce **infinite scroll** view

---

## 🖥️ Getting Started

```bash
npm install
npm run dev
npm test

```

## 🔒 Environment Variables

Create a `.env` file in the root directory and include:

```
NEXT_PUBLIC_API_URL=https://gutendex.com/
```

---

## 📁 Project Structure

```
├── actions/ # Server actions for API calls (Gutendex fetch logic)
├── public/ # Static assets
├── src/
│ ├── app/ # Next.js app directory (routes, layout, pages)
│ ├── components/ # Reusable UI components (BookForm, BookCard, etc.)
│ └── lib/ # Utility types and helper functions
├── tests/ # Jest + RTL test files
├── .env # Environment variables
├── eslint.config.mjs # ESLint configuration
├── jest.config.js # Jest configuration
├── jest.setup.ts # Jest setup file for RTL and mocks
├── next.config.ts # Next.js configuration
├── package.json # Dependencies and scripts
├── postcss.config.mjs # Tailwind/PostCSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation
```

---

## 🧑‍💻 Author

Built by [**Jai Bhullar**](https://jaibh-portfolio.vercel.app/) – aspiring front-end/full-stack developer based near London.

- 📫 Email: jaibhullar.developer@outlook.com
- 🔗 **LinkedIn:** [linkedin.com/in/jai-bhullar-dev](https://www.linkedin.com/in/jai-bhullar-dev)
- 📄 [View My CV](https://drive.google.com/drive/folders/11INqiG1lzqst5JbgNXueFMdqKZr6JfP9?usp=sharing)

---

## 📝 License

MIT License. Feel free to use, modify, or contribute!
