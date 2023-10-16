# # Use an official Node.js runtime as the base image
# FROM node:14

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install admin dependencies
# RUN npm install

# # Copy the rest of the admin application code to the container
# COPY . .

# # Add a command to run the clean script before starting the server
# #RUN npm run clean

# # Expose port 3000 for the admin service
# EXPOSE 3000

# # Command to start the admin service
# CMD ["npm", "start"]


# Build stage
FROM node:14 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
