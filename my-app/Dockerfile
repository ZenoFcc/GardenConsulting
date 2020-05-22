# FROM node:12.13.0

# WORKDIR /usr/src/

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

FROM node:12.13.0

WORKDIR /usr/src

ENV PATH /usr/src/node_modules/.bin:$PATH

COPY . .

ADD package.json /usr/src/package.json
RUN npm install
RUN npm install react-scripts@0.9.5 -g

EXPOSE 8081

CMD ["npm", "start"]
