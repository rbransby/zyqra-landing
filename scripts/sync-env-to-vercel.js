#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const envVars = {};
    
    content.split('\n').forEach((line, index) => {
      // Skip empty lines and comments
      if (!line.trim() || line.trim().startsWith('#')) {
        return;
      }
      
      // Parse KEY=VALUE format
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const [, key, value] = match;
        envVars[key.trim()] = value.trim();
      } else {
        log(`Warning: Skipping invalid line ${index + 1}: ${line}`, 'yellow');
      }
    });
    
    return envVars;
  } catch (error) {
    log(`Error reading .env.local file: ${error.message}`, 'red');
    process.exit(1);
  }
}

function setVercelEnvVar(key, value) {
  return new Promise((resolve) => {
    log(`Setting ${key}...`, 'blue');
    
    // For production, don't use gitBranch parameter
    // For preview, we can use gitBranch
    const args = ['env', 'add', key, 'production'];
    
    // Use spawn to properly handle stdin input
    const child = spawn('vercel', args, {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    // Send the value to stdin
    child.stdin.write(value);
    child.stdin.end();
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        log(`✓ ${key} set successfully`, 'green');
        resolve(true);
      } else {
        log(`✗ Failed to set ${key}: ${stderr}`, 'red');
        resolve(false);
      }
    });
    
    child.on('error', (error) => {
      log(`✗ Failed to set ${key}: ${error.message}`, 'red');
      resolve(false);
    });
  });
}

function checkVercelAuth() {
  return new Promise((resolve) => {
    const child = spawn('vercel', ['whoami'], { stdio: 'pipe' });
    
    child.on('close', (code) => {
      resolve(code === 0);
    });
    
    child.on('error', () => {
      resolve(false);
    });
  });
}

function checkVercelProject() {
  return new Promise((resolve) => {
    const child = spawn('vercel', ['ls'], { stdio: 'pipe' });
    
    child.on('close', (code) => {
      resolve(code === 0);
    });
    
    child.on('error', () => {
      resolve(false);
    });
  });
}

async function syncEnvVars(envVars) {
  log('\n🔄 Syncing environment variables...', 'bold');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [key, value] of Object.entries(envVars)) {
    const success = await setVercelEnvVar(key, value);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  log('\n📊 Sync Summary:', 'bold');
  log(`✓ Successfully synced: ${successCount}`, 'green');
  if (failCount > 0) {
    log(`✗ Failed to sync: ${failCount}`, 'red');
  }
  
  if (successCount > 0) {
    log('\n🎉 Environment variables synced to Vercel!', 'green');
    log('💡 Remember to redeploy your project for changes to take effect.', 'blue');
  }
}

async function main() {
  log('🚀 Syncing .env.local to Vercel...', 'bold');
  
  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    log('❌ .env.local file not found!', 'red');
    log('Please create .env.local file first.', 'yellow');
    process.exit(1);
  }
  
  // Check if user is authenticated with Vercel
  const isAuthenticated = await checkVercelAuth();
  if (!isAuthenticated) {
    log('❌ Not authenticated with Vercel!', 'red');
    log('Please run: vercel login', 'yellow');
    process.exit(1);
  }
  
  // Check if project is linked
  const isProjectLinked = await checkVercelProject();
  if (!isProjectLinked) {
    log('❌ Vercel project not linked!', 'red');
    log('Please run: vercel link', 'yellow');
    process.exit(1);
  }
  
  // Parse environment variables
  log('📖 Reading .env.local...', 'blue');
  const envVars = parseEnvFile(envPath);
  
  if (Object.keys(envVars).length === 0) {
    log('⚠️  No environment variables found in .env.local', 'yellow');
    return;
  }
  
  log(`📝 Found ${Object.keys(envVars).length} environment variables`, 'green');
  
  // Confirm before proceeding
  log('\n🔍 Environment variables to sync:', 'bold');
  Object.entries(envVars).forEach(([key, value]) => {
    const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
    log(`  ${key}=${displayValue}`);
  });
  
  log('\n⚠️  This will overwrite existing Vercel environment variables!', 'yellow');
  log('Press Ctrl+C to cancel, or Enter to continue...');
  
  // Wait for user confirmation
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', (data) => {
    if (data[0] === 3) { // Ctrl+C
      log('\n❌ Cancelled by user', 'red');
      process.exit(0);
    }
    if (data[0] === 13) { // Enter
      process.stdin.setRawMode(false);
      process.stdin.pause();
      syncEnvVars(envVars);
    }
  });
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  log('\n❌ Cancelled by user', 'red');
  process.exit(0);
});

main().catch((error) => {
  log(`❌ Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});
