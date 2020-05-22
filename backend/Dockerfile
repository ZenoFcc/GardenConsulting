# FROM node:12.13.0

# WORKDIR /usr/src/

# COPY  package*.json ./

# RUN npm install --global nodemon
# RUN npm i -f
# RUN npm cache clean -f
# RUN npm install -gn

# COPY . .

# EXPOSE 5000

# CMD ["nodemon", "app.js"]

FROM node:12.13.0

WORKDIR /usr/src

ENV PATH /usr/src/node_modules/.bin:$PATH

RUN npm install --global nodemon

ADD package.json /usr/src/package.json
RUN npm install --global nodemon
RUN npm i -f
RUN npm cache clean -f
RUN npm install -gn

EXPOSE 8080

CMD ["nodemon", "app.js", "--legacy-watch"]
