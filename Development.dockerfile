FROM node:18
WORKDIR /opt/app
COPY package*.json ./
COPY build/main.js ./

RUN npm ci --ignore-scripts

# See: https://github.com/sequelize/sequelize/issues/11174
RUN npm rebuild

ENV PORT=8080
EXPOSE 8080
CMD [ "node", "main.js" ]