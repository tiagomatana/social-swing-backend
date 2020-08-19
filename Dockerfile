FROM node:latest
COPY . src/
WORKDIR /src
ENV MEMORY 1024
ENV PORT 3000
CMD node --max-old-space-size=$MEMORY --optimize-for-size index.js
