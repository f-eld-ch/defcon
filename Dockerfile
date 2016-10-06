FROM node:4.4.7-slim
MAINTAINER Daniel Aschwanden <nimdanitro@gmail.com>
RUN mkdir /home/meteorapp

WORKDIR /home/meteorapp

ADD . ./meteorapp

# Do basic updates
RUN apt-get update -q && apt-get clean

# Get curl in order to download curl
RUN apt-get install curl -y \

  # Install Meteor
  && (curl https://install.meteor.com/ | sh) \

  # Build the Meteor app
  && cd /home/meteorapp/meteorapp \
  && meteor npm install --production
  && meteor build /home/meteorapp/build --directory \

  # Build the NPM packages needed for build
  && cd /home/meteorapp/build/bundle/programs/server \
  && npm install \

  # Get rid of Meteor. We're done with it.
  && rm /usr/local/bin/meteor \
  && rm -rf ~/.meteor \

  #no longer need curl
  && apt-get --purge autoremove curl -y

RUN npm install -g forever

EXPOSE 80
ENV PORT 80

CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "build/bundle/main.js"]
