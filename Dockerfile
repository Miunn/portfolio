FROM node:20-alpine

# Install dependencies only when needed
WORKDIR /app

# Install OpenSSL and other required dependencies
RUN apk add --no-cache \
    openssl \
    openssl-dev \
    libc6-compat \
    python3 \
    make \
    g++ \
    postgresql-client

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the development port
EXPOSE 3000

# Start the development server with hot reloading
CMD ["npm", "run", "dev"] 