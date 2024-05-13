# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy production dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy compiled code from the build stage
COPY --from=build /app/dist ./dist

# Copy configuration files
COPY ./config ./config 

# Expose the port your app runs on
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"] 
