# Use a base image with Java and Node.js
FROM openjdk:17-jdk-slim as base

# Set working directory
WORKDIR /app/server

# Copy and build the API
COPY server /app/server
RUN ./gradlew build

# Copy and build the UI
FROM node:18-alpine as ui-build
WORKDIR /app/ui
COPY ui /app/ui
RUN npm install && npm run build

# Copy and build the Instruction service
FROM node:18-alpine as instruction-build
WORKDIR /app/instruction
COPY instruction /app/instruction
RUN npm install
RUN npm run build

# Final image
FROM nginx:alpine

# Install OpenJDK and Node.js with npm and process manager
RUN apk add --no-cache openjdk17 nodejs npm supervisor

WORKDIR /app

# Copy built artifacts
COPY --from=base /app/server/build/libs/server-0.0.9.jar /app/server.jar
COPY --from=ui-build /app/ui/build /app/ui/build
COPY --from=instruction-build /app/instruction /app/instruction

# Copy Nginx configuration
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf.template
CMD /bin/sh -c "export PORT=${PORT:-8081} && envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf"

# Install dependencies for instruction
WORKDIR /app/instruction
RUN npm install --production

# Add supervisord configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose the ports
EXPOSE 8081 8080 3000 3001

# Start all services
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]