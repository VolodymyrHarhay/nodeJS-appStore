FROM node:8

RUN mkdir -p /usr/src/app-client
WORKDIR /usr/src/app-client

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

# RUN npm install \
#  && npm ls \
#  && npm cache clean --force \
#  && mv /usr/src/app-server/node_modules /node_modules

COPY . .

CMD ["npm", "run", "dev-b"]
