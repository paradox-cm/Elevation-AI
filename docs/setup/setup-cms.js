#!/usr/bin/env node

/**
 * Elevation AI CMS Setup Script
 * 
 * This script helps you set up the CMS system by:
 * 1. Creating the .env.local file with your Supabase credentials
 * 2. Providing instructions for database setup
 * 3. Testing the connection
 */

const fs = require('fs');
const path = require('path');

// Your Supabase credentials
const SUPABASE_CONFIG = {
  url: 'https://jnxdlekylqtwdfvggkmx.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpueGRsZWt5bHF0d2Rmdmdna214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjQ1OTMsImV4cCI6MjA3Mzc0MDU5M30.08V-mrqDVgbnWixEw-6DSdY34Icfpqu0mxYt97ihp8I',
  serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpueGRsZWt5bHF0d2Rmdmdna214Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2NDU5MywiZXhwIjoyMDczNzQwNTkzfQ.q0lzVI1R15YvCCYtC_WSxe8bqS5zrndWjdO6ljJsYyg',
  projectId: 'jnxdlekylqtwdfvggkmx'
};

function createEnvFile() {
  const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_CONFIG.url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_CONFIG.anonKey}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_CONFIG.serviceRoleKey}

# Supabase Project ID
NEXT_PUBLIC_SUPABASE_PROJECT_ID=${SUPABASE_CONFIG.projectId}
`;

  const envPath = path.join(process.cwd(), '.env.local');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local file with your Supabase credentials');
  } catch (error) {
    console.error('❌ Error creating .env.local file:', error.message);
    console.log('\n📝 Please manually create .env.local with the following content:');
    console.log(envContent);
  }
}

function printInstructions() {
  console.log('\n🚀 Elevation AI CMS Setup Instructions\n');
  
  console.log('1. 📊 Database Setup:');
  console.log('   - Go to your Supabase dashboard: https://supabase.com/dashboard');
  console.log('   - Navigate to SQL Editor');
  console.log('   - Copy and run the contents of database-schema.sql');
  console.log('   - This will create all necessary tables and initial data\n');
  
  console.log('2. 🗄️ Storage Setup:');
  console.log('   - Go to Storage in your Supabase dashboard');
  console.log('   - Create a new bucket called "media"');
  console.log('   - Set it to public access\n');
  
  console.log('3. 👤 Create Admin User:');
  console.log('   - Go to Authentication in your Supabase dashboard');
  console.log('   - Add a new user with email/password');
  console.log('   - Note the user ID for database updates\n');
  
  console.log('4. 🔧 Update Database Records:');
  console.log('   - Run this SQL in your Supabase SQL Editor:');
  console.log('   - Replace "your-admin-user-id" with your actual user ID:');
  console.log(`
UPDATE pages SET created_by = 'your-admin-user-id' WHERE created_by IS NULL;
UPDATE site_settings SET updated_by = 'your-admin-user-id' WHERE updated_by IS NULL;
`);
  
  console.log('5. 🚀 Start Development Server:');
  console.log('   - Run: npm run dev');
  console.log('   - Visit: http://localhost:3000/admin');
  console.log('   - Login with your admin credentials\n');
  
  console.log('6. 🧪 Test Dynamic Pages:');
  console.log('   - Visit: http://localhost:3000/website/faq-dynamic');
  console.log('   - Visit: http://localhost:3000/website/blog-dynamic\n');
  
  console.log('📚 Next Steps:');
  console.log('   - Create content in the admin interface');
  console.log('   - Test the dynamic components');
  console.log('   - Refactor existing pages to use CMS content\n');
}

function main() {
  console.log('🎯 Setting up Elevation AI CMS...\n');
  
  createEnvFile();
  printInstructions();
  
  console.log('✨ Setup complete! Follow the instructions above to finish the configuration.');
}

if (require.main === module) {
  main();
}

module.exports = { createEnvFile, printInstructions };
