#!/bin/bash

echo "🔍 Testing DAS Design Studio Deployment"
echo "========================================"
echo ""

echo "1. Testing Homepage (should show 'DAS Design Studio')..."
HOMEPAGE=$(curl -s http://localhost/ | grep -o "DAS Design Studio" | head -1)
if [ -n "$HOMEPAGE" ]; then
    echo "   ✅ Homepage shows: $HOMEPAGE"
else
    echo "   ❌ Homepage doesn't show 'DAS Design Studio'"
fi
echo ""

echo "2. Testing Portfolio Page..."
PORTFOLIO=$(curl -s http://localhost/portfolio | grep -o "Our Portfolio" | head -1)
if [ -n "$PORTFOLIO" ]; then
    echo "   ✅ Portfolio page accessible"
else
    echo "   ❌ Portfolio page not found"
fi
echo ""

echo "3. Testing Favicon..."
FAVICON=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/favicon.svg)
if [ "$FAVICON" = "200" ]; then
    echo "   ✅ Favicon accessible (HTTP $FAVICON)"
else
    echo "   ❌ Favicon not found (HTTP $FAVICON)"
fi
echo ""

echo "4. Testing Unsplash Images in Portfolio..."
UNSPLASH=$(curl -s http://localhost/portfolio | grep -o "source.unsplash.com" | head -1)
if [ -n "$UNSPLASH" ]; then
    echo "   ✅ Unsplash images configured"
else
    echo "   ❌ Unsplash images not found"
fi
echo ""

echo "5. Container Status..."
docker ps --filter "name=arch-firm" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

echo "========================================"
echo "📋 Summary:"
echo "   - Homepage: http://localhost/"
echo "   - Portfolio: http://localhost/portfolio"
echo "   - Favicon: http://localhost/favicon.svg"
echo ""
echo "💡 If you don't see changes in your browser:"
echo "   1. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)"
echo "   2. Clear browser cache completely"
echo "   3. Try incognito/private mode"
echo "   4. Try a different browser"
echo "========================================"

# Made with Bob
