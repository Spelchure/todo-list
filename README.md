# TODO LIST

Simple NodeJS REST Application with some patterns

## Scripts

### Development

Please define your variables in `.env` according to `.env.example`

```sh
npm run dev
```

### Running in Development with `Docker Compose`

```sh
# Development build
npm run build:dev
docker compose -f Development.docker-compose.yml up -d
# For cleaning: docker compose -f Development.docker-compose.yml down -v
```

### Production build

```
npm run build
```

### Running in Production with `Docker Compose`

```sh
# Production build
npm run build
# Generate SSL certificate
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 > cert_priv.pem
openssl req -x509 -key cert_priv.pem > cert.pem
# Run with compose
docker compose -f Production.docker-compose.yml up -d
# For cleaning: docker compose -f Production.docker-compose down -v
```

### Lint

```
npm run lint
```

## Tools/Technologies Used

- Dependency Injection with _inversify.js_
- Domain Driven Design
- Hexagonal Architecture
- Webpack, WebpackShellPlugin, WebpackNodeExternals
- Dotenv
- Docker, Docker Compose