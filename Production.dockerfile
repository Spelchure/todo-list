FROM node:18
ARG CERT_FILE_PATH
ARG PRIVKEY_FILE_PATH
ARG DB_INITDB
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_HOST
WORKDIR /opt/app
COPY package*.json ./
COPY dist/main.js ./

# See : https://github.com/typicode/husky/issues/920
RUN npm ci --omit=dev --ignore-scripts

# See: https://github.com/sequelize/sequelize/issues/11174
RUN npm rebuild

# Copy certificate and private key to container
COPY ${CERT_FILE_PATH} /opt/app/certificate.pem
COPY ${PRIVKEY_FILE_PATH} /opt/app/private_key.pem

ENV CERT_FILE=/opt/app/certificate.pem
ENV PRIVKEY_FILE=/opt/app/private_key.pem

ENV DB_INITDB=${DB_INITDB}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_PORT=${DB_PORT}
ENV DB_HOST=${DB_HOST}

ENV PORT=8080
EXPOSE 8080

CMD [ "node", "main.js" ]