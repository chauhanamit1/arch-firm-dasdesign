# Backend Dockerfile for Strapi CMS

# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application code
COPY . .

# Build Strapi admin panel
RUN npm run build

# Production stage
FROM node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S strapi -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder
COPY --from=builder --chown=strapi:nodejs /app ./

# Create uploads directory
RUN mkdir -p /app/public/uploads && \
    chown -R strapi:nodejs /app/public/uploads

# Switch to non-root user
USER strapi

# Expose Strapi port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start Strapi
CMD ["npm", "run", "start"]