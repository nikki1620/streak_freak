# Deployment Guide for Streak Freak

This guide will walk you through deploying your Habit Tracker website to the internet.

## Prerequisites

- A GitHub account (free)
- Your code pushed to a GitHub repository

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy React/Vite applications. It's free and provides automatic HTTPS.

### Step 1: Push Your Code to GitHub

1. If you haven't already, initialize git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/streak_freak.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (you can use your GitHub account)
3. Click **"New Project"**
4. Import your GitHub repository (`streak_freak`)
5. Vercel will automatically detect it's a Vite project and configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
6. Click **"Deploy"**
7. Wait 1-2 minutes for deployment to complete
8. Your site will be live at a URL like: `https://streak-freak.vercel.app`

### Step 3: Custom Domain (Optional)

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `streakfreak.com`)
3. Follow the DNS configuration instructions
4. Vercel automatically provides SSL certificates

### Automatic Deployments

- Every push to `main` branch automatically triggers a new deployment
- Pull requests get preview deployments automatically

---

## Option 2: Deploy to Netlify

Netlify is another excellent option with similar features to Vercel.

### Step 1: Push Your Code to GitHub

Same as Vercel - make sure your code is on GitHub.

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in (you can use your GitHub account)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose GitHub and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**
7. Your site will be live at a URL like: `https://random-name-123.netlify.app`

### Step 3: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Option 3: Deploy to GitHub Pages

GitHub Pages is free but requires a bit more setup.

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Update vite.config.js

Add the base path for GitHub Pages:

```javascript
export default defineConfig({
  base: '/streak_freak/', // Replace with your repository name
  plugins: [react()],
  // ... rest of config
})
```

### Step 4: Deploy

```bash
npm run deploy
```

Your site will be available at: `https://YOUR_USERNAME.github.io/streak_freak/`

---

## Testing Your Build Locally

Before deploying, test your production build:

```bash
npm run build
npm run preview
```

This will build your app and serve it locally so you can verify everything works.

---

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure there are no TypeScript errors (if using TypeScript)
- Check the build logs in your deployment platform

### Styles Not Loading

- Make sure Tailwind CSS is properly configured
- Verify `postcss.config.js` exists
- Check that `index.css` imports Tailwind directives

### LocalStorage Not Working

- LocalStorage works in production the same as development
- Make sure you're testing in a real browser (not incognito with strict settings)

---

## Recommended: Vercel

For this project, **Vercel is recommended** because:
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Automatic deployments on git push
- ✅ Free tier is generous
- ✅ Perfect for React/Vite apps

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages Docs: https://docs.github.com/pages

