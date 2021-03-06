# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR /src

# Copy the file from your host to your current location.
COPY package.json .
RUN apt-get update
RUN apt-get install software-properties-common -y 
RUN apt-get install gcc make libc-dev python g++ -y

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the specified command within the container.
CMD [ "node", "main.js" ]

