#!/bin/bash

echo "🔧 Setting up public permissions for Project and Service APIs..."
echo ""
echo "Please follow these steps in Strapi Admin:"
echo ""
echo "1. Open http://localhost:1337/admin in your browser"
echo "2. Click 'Settings' (gear icon) in the left sidebar"
echo "3. Under 'USERS & PERMISSIONS PLUGIN', click 'Roles'"
echo "4. Click on 'Public' role"
echo "5. Scroll down and find:"
echo "   - Project section: Check 'find' and 'findOne'"
echo "   - Service section: Check 'find' and 'findOne'"
echo "6. Click 'Save' button at the top right"
echo ""
echo "After saving, refresh http://localhost:3000 to see your sample project!"
echo ""
echo "✨ Your sample data is already in the database:"
echo "   - 1 Project: Modern Office Interior Redesign ($250K)"
echo "   - 4 Services: Interior Design, Space Planning, etc."
echo ""
echo "Just need to enable public access! 🚀"

# Made with Bob
