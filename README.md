# Kanban Board - Grantify Skill Test

A simple Kanban board application built with React (Next.js) that allows users to manage tasks across different columns (To Do, In Progress, Done).

## ✅ Requirements Met

- ✅ **React-based Kanban board** - Built with Next.js and React
- ✅ **Add, move, edit, and delete tasks** - Full CRUD functionality with drag-and-drop
- ✅ **Clean design** - Modern UI using shadcn/ui components and TailwindCSS

## 🎯 Extra Credit Features

- ✅ **CRUD API** - Full REST API using Next.js API routes with Prisma ORM
- ✅ **Database support** - PostgreSQL database integration for persistent storage
- ⏳ **Deployment** - Ready for deployment (see Deployment section below)

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Drag and Drop** - Smooth task movement between columns using @hello-pangea/dnd
- **Prisma** - TypeScript-first ORM
- **PostgreSQL** - Database engine for persistent storage
- **Turborepo** - Optimized monorepo build system
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality

## Getting Started

First, install the dependencies:

```bash
bun install
```
## Database Setup

This project uses PostgreSQL with Prisma for persistent storage.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/web/.env` file with your PostgreSQL connection details:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/kanban"
   ```

3. Generate the Prisma client and push the schema:
```bash
bun run db:push
```


Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see your fullstack application.







## Deployment

### Deploying to Vercel (Recommended for Next.js)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables** (if using database)
   - Add `DATABASE_URL` in Vercel project settings
   - Add any other required environment variables

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `https://your-project.vercel.app`

### Deploying to Netlify

1. **Build the project**
   ```bash
   bun run build
   ```

2. **Deploy**
   - Connect your GitHub repo to Netlify
   - Set build command: `bun run build`
   - Set publish directory: `apps/web/.next`

### Deploying to Render

1. **Create a new Web Service**
2. **Connect your GitHub repository**
3. **Configure:**
   - Build Command: `bun install && bun run build`
   - Start Command: `cd apps/web && bun run start`
   - Environment: `Node`

**Note:** Make sure to set up the `DATABASE_URL` environment variable in your hosting platform for the database to work.

## Project Structure

```
kanban/
├── apps/
│   └── web/         # Fullstack application (Next.js)
├── packages/
│   ├── api/         # API layer / business logic
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run check-types`: Check TypeScript types across all apps
- `bun run db:push`: Push schema changes to database
- `bun run db:studio`: Open database studio UI
- `bun run check`: Run Biome formatting and linting
