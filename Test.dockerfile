FROM node:18
ARG DB_INITDB
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_HOST
WORKDIR /opt/app
COPY . ./

RUN npm ci --ignore-scripts

# See: https://github.com/sequelize/sequelize/issues/11174
RUN npm rebuild

ENV DB_INITDB=${DB_INITDB}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_PORT=${DB_PORT}
ENV DB_HOST=${DB_HOST}
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "run","test:integration"]