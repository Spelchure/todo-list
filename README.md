![](https://github.com/Spelchure/todo-list/actions/workflows/ci.yml/badge.svg)

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

### Running in Production with `Minikube`

```sh
# For minikube activate environment
eval $(minikube -p minikube docker-env)
# Generate SSL certificate and private key file like above
# Build production image
docker build -f Production.dockerfile . -t todo-list \
  --build-arg="CERT_FILE_PATH=cert.pem" \
  --build-arg="PRIVKEY_FILE_PATH=cert_priv.pem"
# Apply k8s configuration
kubectl create -f deploy/todo-list.yml
# Get minikube ip address
minikube ip
# Test it
curl -k -X GET https://<minikube-ip-address>:30100/todo
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
- Minikube, K8S
