FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the full project
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
