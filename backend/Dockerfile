FROM node:22-alpine3.21

WORKDIR /app

# Install dependencies first (cached layer)
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy source
COPY . .

EXPOSE 3333

# Run migrations then start dev server
CMD ["sh", "-c", "node ace migration:run --force && node ace serve --hmr"]
