#!/bin/bash

echo "🚀 FinanceOS - GitHub Deployment Script"
echo "======================================="
echo ""

# Check if gh is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    echo "📦 Creating repository..."

    # Create repository
    gh repo create FinanceOS --public --description "All-in-One Personal Finance Platform built with Next.js, Supabase, Plaid, and Finnhub"

    echo "🔗 Adding remote..."
    git remote add origin https://github.com/anomalyco/FinanceOS.git

    echo "📤 Pushing to GitHub..."
    git branch -M main
    git push -u origin main

    echo ""
    echo "✅ Done! Repository: https://github.com/anomalyco/FinanceOS"
else
    echo "❌ GitHub CLI not found"
    echo ""
    echo "Please do the following manually:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: FinanceOS"
    echo "3. Description: 'All-in-One Personal Finance Platform built with Next.js, Supabase, Plaid, and Finnhub'"
    echo "4. Set to Public"
    echo "5. Do NOT initialize with README"
    echo "6. Click 'Create repository'"
    echo ""
    echo "7. Then run these commands:"
    echo ""
    echo "   cd $(pwd)"
    echo "   git remote add origin https://github.com/anomalyco/FinanceOS.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "8. Enter your GitHub credentials when prompted"
    echo ""
fi
