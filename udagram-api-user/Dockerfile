FROM node:14.0.0
# Create app directory
WORKDIR /usr/src/app
# Install the app dependencies
# The wildcard is used both package.json and package-lock.json are copied where available (npm@5+)
COPY package*.json ./
RUN npm ci
# Bundle app source
COPY . .
EXPOSE 8080
CMD ["npm", "run", "prod"]