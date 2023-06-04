FROM node:18
ARG CERT_FILE_PATH
ARG PRIVKEY_FILE_PATH
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

ENV PORT=8080
EXPOSE 8080
ENV CERT_FILE=/opt/app/certificate.pem
ENV PRIVKEY_FILE=/opt/app/private_key.pem

CMD [ "node", "main.js" ]