# Local Images Guide

## Overview
All images are now stored locally in the project to avoid dependency on external services. This ensures the website works reliably even if external image services are down.

## Image Structure

### Directory Layout
```
frontend/public/images/
├── categories/          # Category fallback images (1600x900)
│   ├── residential.jpg
│   ├── commercial.jpg
│   ├── healthcare.jpg
│   ├── education.jpg
│   ├── retail.jpg
│   └── hospitality.jpg
└── projects/           # Project-specific images
    ├── skyline-penthouse-hero.jpg      (1600x900)
    ├── skyline-penthouse-thumb.jpg     (800x600)
    ├── healing-spaces-hero.jpg         (1600x900)
    ├── healing-spaces-thumb.jpg        (800x600)
    ├── future-academy-hero.jpg         (1600x900)
    ├── future-academy-thumb.jpg        (800x600)
    ├── metropolitan-square-hero.jpg    (1600x900)
    ├── metropolitan-square-thumb.jpg   (800x600)
    ├── promenade-hero.jpg              (1600x900)
    ├── promenade-thumb.jpg             (800x600)
    ├── tech-hub-hero.jpg               (1600x900)
    └── tech-hub-thumb.jpg              (800x600)
```

## Image Sizes

### Hero Images (Detail Pages)
- **Dimensions**: 1600x900 pixels
- **Aspect Ratio**: 16:9
- **Usage**: Project detail page headers
- **Format**: JPEG

### Thumbnail Images (Homepage)
- **Dimensions**: 800x600 pixels
- **Aspect Ratio**: 4:3
- **Usage**: Project cards on homepage
- **Format**: JPEG

### Category Images (Fallback)
- **Dimensions**: 1600x900 pixels
- **Aspect Ratio**: 16:9
- **Usage**: Fallback when project-specific image not found
- **Format**: JPEG

## How Images Are Used

### Homepage (page.tsx)
```typescript
const imageMap: Record<string, string> = {
  'Skyline Penthouse': '/images/projects/skyline-penthouse-thumb.jpg',
  'Healing Spaces Medical Center': '/images/projects/healing-spaces-thumb.jpg',
  // ... more mappings
};
```

### Project Detail Pages (projects/[id]/page.tsx)
```typescript
// Project-specific images
const projectImages: Record<string, string> = {
  'Skyline Penthouse': '/images/projects/skyline-penthouse-hero.jpg',
  // ... more mappings
};

// Category fallback images
const categoryImages: Record<string, string> = {
  'Residential': '/images/categories/residential.jpg',
  // ... more mappings
};

// Selection logic: project-specific first, then category fallback
const heroImage = projectImages[projectTitle] || categoryImages[category] || categoryImages['Commercial'];
```

## Downloading Images

### Automated Script
Run the download script to fetch all images:
```bash
cd architectural-firm-website
./download-images.sh
```

This script:
1. Creates necessary directories
2. Downloads 6 category images
3. Downloads 12 project images (6 hero + 6 thumbnail)
4. Uses picsum.photos with seeds for consistency

### Manual Download
If you need to download images manually:
```bash
# Category image example
curl -L "https://picsum.photos/seed/residential-hero/1600/900" -o frontend/public/images/categories/residential.jpg

# Project hero image example
curl -L "https://picsum.photos/seed/skyline-penthouse-hero/1600/900" -o frontend/public/images/projects/skyline-penthouse-hero.jpg

# Project thumbnail example
curl -L "https://picsum.photos/seed/skyline-penthouse-thumb/800/600" -o frontend/public/images/projects/skyline-penthouse-thumb.jpg
```

## Adding New Projects

When adding a new project, follow these steps:

### 1. Download Images
```bash
# Hero image (1600x900)
curl -L "https://picsum.photos/seed/your-project-hero/1600/900" -o frontend/public/images/projects/your-project-hero.jpg

# Thumbnail image (800x600)
curl -L "https://picsum.photos/seed/your-project-thumb/800/600" -o frontend/public/images/projects/your-project-thumb.jpg
```

### 2. Update Homepage Mapping
Edit `frontend/src/app/page.tsx`:
```typescript
const imageMap: Record<string, string> = {
  // ... existing mappings
  'Your Project Name': '/images/projects/your-project-thumb.jpg',
};
```

### 3. Update Project Detail Mapping
Edit `frontend/src/app/projects/[id]/page.tsx`:
```typescript
const projectImages: Record<string, string> = {
  // ... existing mappings
  'Your Project Name': '/images/projects/your-project-hero.jpg',
};
```

### 4. Rebuild Frontend
```bash
docker-compose build frontend
docker-compose up -d frontend
```

## Using Custom Images

To use your own custom images instead of placeholders:

### 1. Prepare Images
- Resize to correct dimensions (1600x900 for hero, 800x600 for thumbnails)
- Optimize for web (compress to reasonable file size)
- Save as JPEG format

### 2. Replace Files
```bash
# Copy your images to the correct location
cp /path/to/your/hero-image.jpg frontend/public/images/projects/project-name-hero.jpg
cp /path/to/your/thumb-image.jpg frontend/public/images/projects/project-name-thumb.jpg
```

### 3. Rebuild
```bash
docker-compose build frontend
docker-compose up -d frontend
```

## Benefits of Local Images

✅ **Reliability**: No dependency on external services
✅ **Performance**: Faster loading from local server
✅ **Control**: Full control over image quality and content
✅ **Offline**: Works without internet connection
✅ **Consistency**: Images never change unexpectedly
✅ **No Rate Limits**: No API rate limiting issues

## Troubleshooting

### Images Not Showing
1. Check if images exist:
   ```bash
   ls -la frontend/public/images/projects/
   ls -la frontend/public/images/categories/
   ```

2. Verify file permissions:
   ```bash
   chmod 644 frontend/public/images/**/*.jpg
   ```

3. Check browser console for 404 errors

4. Rebuild frontend container:
   ```bash
   docker-compose build frontend
   docker-compose up -d frontend
   ```

### Wrong Images Displayed
1. Check project title matches exactly in mapping
2. Verify image paths are correct
3. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

### Images Too Large
1. Compress images using tools like:
   - ImageOptim (Mac)
   - TinyPNG (Web)
   - imagemagick (CLI)

Example compression:
```bash
# Using imagemagick
convert input.jpg -quality 85 -resize 1600x900 output.jpg
```

## Image Optimization Tips

1. **Use appropriate quality**: 85% JPEG quality is usually sufficient
2. **Compress before upload**: Use tools to reduce file size
3. **Correct dimensions**: Don't use oversized images
4. **Progressive JPEG**: Enable for better perceived loading
5. **WebP format**: Consider using WebP for better compression (requires code changes)

## Future Enhancements

Consider these improvements:

1. **WebP Support**: Add WebP versions with JPEG fallback
2. **Responsive Images**: Use srcset for different screen sizes
3. **Lazy Loading**: Implement lazy loading for better performance
4. **Image CDN**: Use CDN for production deployment
5. **Upload Interface**: Add admin interface to upload custom images