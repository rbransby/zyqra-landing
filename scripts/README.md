# Scripts

## sync-env-to-vercel.js

A Node.js script that synchronizes environment variables from your local `.env.local` file to your Vercel project using the Vercel CLI.

### Prerequisites

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Authenticate with Vercel:
   ```bash
   vercel login
   ```

3. Link your project to Vercel:
   ```bash
   vercel link
   ```

### Usage

Run the script using npm:
```bash
pnpm sync-env
```

Or run it directly:
```bash
node scripts/sync-env-to-vercel.js
```

### What it does

1. **Validates setup**: Checks if you're authenticated with Vercel and your project is linked
2. **Reads .env.local**: Parses your local environment file
3. **Shows preview**: Displays all variables that will be synced (with values truncated for security)
4. **Confirms action**: Asks for confirmation before proceeding
5. **Syncs variables**: Uses `vercel env add` to set each environment variable for production
6. **Reports results**: Shows success/failure count for each variable

### Safety features

- **Confirmation required**: Always asks before overwriting existing Vercel environment variables
- **Value truncation**: Shows only first 20 characters of values in preview
- **Error handling**: Gracefully handles failures and reports them
- **Graceful cancellation**: Supports Ctrl+C to cancel at any time
- **Async processing**: Handles Vercel CLI properly with proper stdin/stdout handling

### Notes

- This will **overwrite** existing environment variables in Vercel for the **production** environment
- Variables are set for the **main** branch
- Empty values in `.env.local` will be synced as empty strings
- Comments and empty lines in `.env.local` are ignored
- After syncing, you may need to redeploy your Vercel project for changes to take effect
