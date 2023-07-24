import cors from 'cors';
import fs from 'node:fs';
import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import * as https from 'https';
import errorHandler from './error-handler';
import container from './container';
import Configuration from 'configuration';
import {exit} from 'node:process';
import compression from 'compression';

const readCredentials = (certfile: string, privkey: string) => {
  const cert = fs.readFileSync(certfile, 'utf8');
  const key = fs.readFileSync(privkey, 'utf8');

  return {key, cert};
};

export default function createRestApplication(config: Configuration) {
  const server = new InversifyExpressServer(container);
  server.setConfig(app => {
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.json());
  });
  server.setErrorConfig(app => {
    app.use(errorHandler);
  });

  const app = server.build();

  if (process.env.NODE_ENV === 'production') {
    const certFilePath = config.get<string>('cert');
    const privkeyFilePath = config.get<string>('privkey');

    if (certFilePath === undefined || privkeyFilePath === undefined) {
      console.error(
        '\nERROR: CERT_FILE and PRIVKEY_FILE environment variables are required in production\n'
      );
      exit(1);
    }

    const credentials = readCredentials(
      config.get<string>('cert'),
      config.get<string>('privkey')
    );
    return https.createServer(credentials, app);
  }

  return app;
}
