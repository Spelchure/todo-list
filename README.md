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
npm run build:dev
docker compose up -f Development.docker-compose.yml -d
# For cleaning: docker compose -f Development.docker-compose.yml down -v
```

### Production build

```
npm run build
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