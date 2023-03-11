# Movie Library (Next.js)

Movie Library will help you to find out more about the movies you love.


## Features
- Adaptive design
- The application combines SSR and CSR to reduce server load. When the page is loaded for the first time, the data is loaded on the server (SSR) and further, when the user interacts with the web application, the data is loaded already on the client (CSR)
- Pagination for search results
- Implement a search bar that allows users to search for movies by title.
- Display a list of matching movies, with basic information such as title, year of release, and poster image
- When a user clicks on a movie from the list, they should be taken to a details page that displays more information about that movie, such as plot, actors, and ratings
- The OMDB API
- Global Spinner on changing routes
- Error handling


## Technologies
- Typescript
- Redux state manager
- Tailwind


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
