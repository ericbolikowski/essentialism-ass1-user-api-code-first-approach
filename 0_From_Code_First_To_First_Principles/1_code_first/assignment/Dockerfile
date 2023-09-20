# Dockerfile

# Set the base image
FROM node:18-slim

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the app dependencies
RUN pnpm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Specify the default command for the container
CMD [ "pnpm", "run", "start:dev" ]
