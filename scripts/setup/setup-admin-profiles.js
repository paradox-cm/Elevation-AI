#!/usr/bin/env node

/**
 * Setup Admin Profiles Database Schema
 * 
 * This script helps set up the admin profiles and site settings tables
 * Run this after setting up your Supabase project
 */

const fs = require('fs');
const path = require('path');

function printInstructions() {
  console.log('\n🚀 Admin Profiles Setup Instructions\n');
  
  console.log('1. Go to your Supabase Dashboard');
  console.log('   - Visit: https://supabase.com/dashboard');
  console.log('   - Sign in and find your "Elevation AI" project\n');
  
  console.log('2. Run the Database Schema');
  console.log('   - Go to SQL Editor in your Supabase dashboard');
  console.log('   - Copy the contents of database-schema-admin-profiles.sql');
  console.log('   - Paste and run the SQL script\n');
  
  console.log('3. Verify the Setup');
  console.log('   - Check that admin_profiles table was created');
  console.log('   - Check that site_settings table was created');
  console.log('   - Verify the default settings were inserted\n');
  
  console.log('4. Test the Admin Interface');
  console.log('   - Log into your admin panel');
  console.log('   - Click the profile icon in the top navigation');
  console.log('   - Set your display name');
  console.log('   - Visit /admin/settings to configure site settings\n');
  
  console.log('✅ Your admin profile and settings system is now ready!\n');
}

function main() {
  const schemaPath = path.join(__dirname, '..', 'database-schema-admin-profiles.sql');
  
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ database-schema-admin-profiles.sql not found!');
    console.error('Please make sure the file exists in the project root.');
    process.exit(1);
  }
  
  const schema = fs.readFileSync(schemaPath, 'utf8');
  console.log('📄 Database Schema Content:');
  console.log('=' .repeat(50));
  console.log(schema);
  console.log('=' .repeat(50));
  
  printInstructions();
}

if (require.main === module) {
  main();
}

module.exports = { printInstructions };
