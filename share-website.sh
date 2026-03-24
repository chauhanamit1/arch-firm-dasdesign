#!/bin/bash

# Quick Website Sharing Script
# This script helps you share your website over the internet using ngrok

set -e

echo "🌐 Website Sharing Setup"
echo "======================="
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed"
    echo ""
    echo "Installing ngrok..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install ngrok
        else
            echo "Please install Homebrew first: https://brew.sh"
            exit 1
        fi
    else
        echo "Please install ngrok manually from: https://ngrok.com/download"
        exit 1
    fi
fi

echo "✅ ngrok is installed"
echo ""

# Check if ngrok is configured
if ! ngrok config check &> /dev/null; then
    echo "⚠️  ngrok is not configured with an auth token"
    echo ""
    echo "Steps to configure:"
    echo "1. Sign up at: https://dashboard.ngrok.com/signup"
    echo "2. Get your auth token from: https://dashboard.ngrok.com/get-started/your-authtoken"
    echo "3. Run: ngrok config add-authtoken YOUR_TOKEN_HERE"
    echo ""
    read -p "Press Enter after you've configured ngrok..."
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check if website is running
if ! docker-compose ps | grep -q "Up"; then
    echo "🚀 Starting website..."
    docker-compose up -d
    echo "⏳ Waiting for services to be ready..."
    sleep 10
else
    echo "✅ Website is already running"
fi

echo ""
echo "🌐 Creating public tunnel..."
echo ""
echo "Your website will be accessible at the URL shown below."
echo "Share this URL with anyone for review!"
echo ""
echo "Press Ctrl+C to stop sharing"
echo ""
echo "================================================"
echo ""

# Start ngrok
ngrok http 80

# Made with Bob
