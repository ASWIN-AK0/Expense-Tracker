FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the full project
COPY . .

# Environment variables
ENV MONGO_URI=your_connection_string

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
