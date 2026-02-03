#!/bin/bash

# YouTube Clone - Verification Script
# This script verifies that all components are in place and working

echo "🔍 YouTube Clone - Component Verification"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ - MISSING"
        return 1
    fi
}

echo "📁 Checking Directory Structure..."
check_dir "src"
check_dir "src/components"
check_dir "src/pages"
check_dir "src/services"
check_dir "public"
echo ""

echo "⚛️  Checking Components..."
check_file "src/components/Header.js"
check_file "src/components/Sidebar.js"
check_file "src/components/VideoCard.js"
echo ""

echo "📄 Checking Pages..."
check_file "src/pages/Home.js"
check_file "src/pages/Watch.js"
check_file "src/pages/Search.js"
check_file "src/pages/Shorts.js"
check_file "src/pages/Subscriptions.js"
echo ""

echo "🛠️  Checking Services..."
check_file "src/services/mockData.js"
echo ""

echo "📋 Checking Core Files..."
check_file "src/App.js"
check_file "src/index.js"
check_file "src/index.css"
check_file "public/index.html"
check_file "package.json"
check_file "tailwind.config.js"
echo ""

echo "📚 Checking Documentation..."
check_file "README.md"
check_file "FEATURES.md"
check_file "COMPONENTS.md"
check_file "DEPLOYMENT.md"
check_file ".env.example"
echo ""

echo "🔧 Checking Configuration..."
check_file "tailwind.config.js"
check_file "postcss.config.js"
echo ""

echo "📦 Checking Dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules/ installed"
else
    echo -e "${RED}✗${NC} node_modules/ not found - run 'npm install'"
fi
echo ""

echo "🏗️  Build Test..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Production build successful"
else
    echo -e "${RED}✗${NC} Production build failed"
fi
echo ""

echo "=========================================="
echo "✅ Verification Complete!"
echo ""
echo "To start the development server:"
echo "  npm start"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "For more information, see README.md"
