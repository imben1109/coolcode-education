# Stage 1: Build the React application
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the built files
FROM node:18-alpine

# Install a lightweight static file server
RUN npm install -g serve

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/build ./build

# Expose the port the application will run on
EXPOSE 3000

# Serve the built files
CMD ["serve", "-s", "build", "-l", "3000"]