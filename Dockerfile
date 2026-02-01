# Use the official Nginx base image
FROM nginx:alpine

# Copy your static files from the local 'site-content' directory to the Nginx web root
COPY ./ /usr/share/nginx/html