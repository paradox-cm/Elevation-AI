#!/usr/bin/env node

/**
 * Setup Admin Profile for hanzel@elevationai.com
 * 
 * This script helps set up the admin profile for Hanzel
 * Run this after confirming the user exists in Supabase auth
 */

const fs = require('fs');
const path = require('path');

function printInstructions() {
  console.log('\n🚀 Hanzel Admin Setup Instructions\n');
  
  console.log('1. Verify User in Supabase Auth');
  console.log('   - Go to Supabase Dashboard → Authentication → Users');
  console.log('   - Find hanzel@elevationai.com');
  console.log('   - Copy the user ID (UUID)\n');
  
  console.log('2. Run the SQL Script');
  console.log('   - Go to SQL Editor in your Supabase dashboard');
  console.log('   - Copy the contents of setup-hanzel-admin.sql');
  console.log('   - Replace "USER_ID_HERE" with the actual user ID');
  console.log('   - Paste and run the SQL script\n');
  
  console.log('3. Verify the Setup');
  console.log('   - Check that the admin profile was created');
  console.log('   - Verify display name: Hanzsel');
  console.log('   - Verify first name: Hanzel');
  console.log('   - Verify last name: Corella\n');
  
  console.log('4. Test Login');
  console.log('   - Have Hanzel log into /admin/login');
  console.log('   - Use email: hanzel@elevationai.com');
  console.log('   - Use the password from the invite\n');
  
  console.log('✅ Hanzel should now have admin access!\n');
}

function printSQLScript() {
  const sqlPath = path.join(__dirname, 'setup-hanzel-admin.sql');
  
  if (!fs.existsSync(sqlPath)) {
    console.error('❌ setup-hanzel-admin.sql not found!');
    console.error('Please make sure the file exists in the scripts directory.');
    process.exit(1);
  }
  
  const sql = fs.readFileSync(sqlPath, 'utf8');
  console.log('📄 SQL Script Content:');
  console.log('=' .repeat(50));
  console.log(sql);
  console.log('=' .repeat(50));
}

function main() {
  console.log('🔧 Hanzel Admin Setup Helper\n');
  
  printSQLScript();
  printInstructions();
  
  console.log('📋 Quick Checklist:');
  console.log('□ User exists in Supabase auth.users table');
  console.log('□ User has confirmed email (if required)');
  console.log('□ Admin profile created with correct details');
  console.log('□ User can log into /admin/login');
  console.log('□ User has access to admin dashboard\n');
}

if (require.main === module) {
  main();
}

module.exports = { printInstructions, printSQLScript };
