# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt separately
COPY requirements.txt /app/

# Install GCC and other necessary build tools before installing Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    build-essential \
    libasound2-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy only the server folder into the container at /app/server
COPY server /app/server

# Generate the Prisma Python client at build time. Runtime DATABASE_URL overrides this.
RUN DATABASE_URL="postgresql://user:password@localhost:5432/database" \
    prisma generate --schema server/schema.prisma

# Make Cloud Run's runtime port available locally too.
EXPOSE 8000

# Run the API server. Cloud Run injects PORT.
CMD exec uvicorn server.main:app --host 0.0.0.0 --port ${PORT:-8000}

