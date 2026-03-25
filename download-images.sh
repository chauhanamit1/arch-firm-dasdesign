#!/bin/bash

# Download high-quality architectural images for the website
# Using picsum.photos to download and save locally

echo "Downloading architectural images..."

# Create directories
mkdir -p frontend/public/images/projects
mkdir -p frontend/public/images/categories

# Download category hero images (1600x900)
echo "Downloading category images..."
curl -L "https://picsum.photos/seed/residential-hero/1600/900" -o frontend/public/images/categories/residential.jpg
curl -L "https://picsum.photos/seed/commercial-hero/1600/900" -o frontend/public/images/categories/commercial.jpg
curl -L "https://picsum.photos/seed/healthcare-hero/1600/900" -o frontend/public/images/categories/healthcare.jpg
curl -L "https://picsum.photos/seed/education-hero/1600/900" -o frontend/public/images/categories/education.jpg
curl -L "https://picsum.photos/seed/retail-hero/1600/900" -o frontend/public/images/categories/retail.jpg
curl -L "https://picsum.photos/seed/hospitality-hero/1600/900" -o frontend/public/images/categories/hospitality.jpg

# Download project-specific images (1600x900 for hero, 800x600 for thumbnails)
echo "Downloading project images..."

# Skyline Penthouse (Residential)
curl -L "https://picsum.photos/seed/skyline-penthouse-hero/1600/900" -o frontend/public/images/projects/skyline-penthouse-hero.jpg
curl -L "https://picsum.photos/seed/skyline-penthouse-thumb/800/600" -o frontend/public/images/projects/skyline-penthouse-thumb.jpg

# Healing Spaces Medical Center (Healthcare)
curl -L "https://picsum.photos/seed/healing-spaces-hero/1600/900" -o frontend/public/images/projects/healing-spaces-hero.jpg
curl -L "https://picsum.photos/seed/healing-spaces-thumb/800/600" -o frontend/public/images/projects/healing-spaces-thumb.jpg

# Future Academy (Education)
curl -L "https://picsum.photos/seed/future-academy-hero/1600/900" -o frontend/public/images/projects/future-academy-hero.jpg
curl -L "https://picsum.photos/seed/future-academy-thumb/800/600" -o frontend/public/images/projects/future-academy-thumb.jpg

# Metropolitan Square (Commercial)
curl -L "https://picsum.photos/seed/metropolitan-square-hero/1600/900" -o frontend/public/images/projects/metropolitan-square-hero.jpg
curl -L "https://picsum.photos/seed/metropolitan-square-thumb/800/600" -o frontend/public/images/projects/metropolitan-square-thumb.jpg

# The Promenade (Retail)
curl -L "https://picsum.photos/seed/promenade-hero/1600/900" -o frontend/public/images/projects/promenade-hero.jpg
curl -L "https://picsum.photos/seed/promenade-thumb/800/600" -o frontend/public/images/projects/promenade-thumb.jpg

# Tech Innovation Hub (Commercial)
curl -L "https://picsum.photos/seed/tech-hub-hero/1600/900" -o frontend/public/images/projects/tech-hub-hero.jpg
curl -L "https://picsum.photos/seed/tech-hub-thumb/800/600" -o frontend/public/images/projects/tech-hub-thumb.jpg

echo "✅ All images downloaded successfully!"
echo "Images saved to:"
echo "  - frontend/public/images/categories/ (6 category images)"
echo "  - frontend/public/images/projects/ (12 project images)"

# Made with Bob
