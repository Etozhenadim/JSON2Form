# 🚀 Deployment Guide

## GitHub Pages Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**

### 2. Configure Repository

Update the following files with your GitHub username:

#### package.json
```json
{
  "homepage": "https://YOUR-USERNAME.github.io/form-json-generator",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR-USERNAME/form-json-generator.git"
  }
}
```

#### README.md
Replace `your-username` with your actual GitHub username in:
- Repository URLs
- Live Demo links
- Clone commands

### 3. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Form JSON Generator"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/YOUR-USERNAME/form-json-generator.git

# Push to main branch
git push -u origin main
```

### 4. Automatic Deployment

Once you push to the `main` branch, GitHub Actions will automatically:
- ✅ Install dependencies
- ✅ Run tests and linting
- ✅ Build the project
- ✅ Deploy to GitHub Pages

### 5. Access Your App

Your app will be available at:
`https://YOUR-USERNAME.github.io/form-json-generator`

## Manual Deployment

If you prefer manual deployment:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## Troubleshooting

### GitHub Pages Not Updating
- Check if GitHub Actions workflow completed successfully
- Verify the `homepage` field in package.json
- Ensure the repository is public (required for free GitHub Pages)

### Build Failures
- Check the Actions tab in your GitHub repository
- Review the workflow logs for specific error messages
- Ensure all dependencies are properly installed

### Custom Domain
To use a custom domain:
1. Add a `CNAME` file to the `public` folder
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings
