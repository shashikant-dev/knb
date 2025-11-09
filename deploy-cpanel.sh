#!/bin/bash

# KNB Group - cPanel Deployment Script
# Run this script after uploading files to cPanel

echo "========================================="
echo "KNB Group - cPanel Deployment"
echo "========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project directory?"
    exit 1
fi

echo ""
echo "📦 Step 1: Installing dependencies..."
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🏗️  Step 2: Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build application"
    exit 1
fi

echo ""
echo "🗄️  Step 3: Checking database connection..."
node -e "
const mysql = require('mysql2/promise');
(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('✅ Database connection successful');
    await connection.end();
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    process.exit(1);
  }
})();
"

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Ensure environment variables are set in cPanel Node.js App"
echo "2. Run 'npm run init-db' to initialize database (first time only)"
echo "3. Start the application in cPanel Node.js App interface"
echo "4. Set Application Startup File to: server.js"
echo "5. Verify .htaccess is in place for Apache proxying"
echo ""
echo "For detailed instructions, see CPANEL_DEPLOYMENT.md"
echo "========================================="

