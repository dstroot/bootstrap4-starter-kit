# Base image
FROM iojs:slim

# Maintainer
MAINTAINER Dan Stroot <dan.stroot@gmail.com>

LABEL Description="Runs our Node App" Vendor="Tax Products Group"

# Setup environment variables
ENV NODE_ENV development
ENV PORT 3000
ENV SESSION_SECRET 4113a89a-266d-4a05-b835
ENV GOOGLE_ANALYTICS UA-XXXXX-X

# Create app folder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy and build
# Code will change more often than node modules
# (package.json) and we can cache that step.
COPY package.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app

# Expose port 3000
EXPOSE 3000

# Fire it up!
CMD [ "npm", "start" ]
