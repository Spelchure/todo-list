![](https://github.com/Spelchure/todo-list/actions/workflows/ci.yml/badge.svg)

# TODO LIST

Simple NodeJS REST Application with some patterns

## Scripts

### Development

Please define your variables in `.env` according to `.env.example`

```sh
npm run dev
# Don't forget to set the DB_* parameters and start the postgres
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
# Create a PV
kubectl apply -f deploy/data-pv.yml
# Create a PVC
kubectl apply -f deploy/data-pvc.yml
# Run Postgres with HELM
# Update deploy/postgre-values.yml for your needs
helm install db -f deploy/postgre-values.yml bitnami/postgresql
# Create the Deployment
kubectl create -f deploy/todo-list.yml
# Get minikube ip address
minikube ip
# Test it
curl -k -X GET https://<minikube-ip-address>:30100/todo
```

### Test

Only integration tests are available. For running integration tests:

```sh
./scripts/integration-test.sh
```

### Lint

```
npm run lint
```

## Notes

### For running only postgres from compose:

```sh
docker compose -f Development.docker-compose.yml up db -d
psql -h localhost -U <username> <db>
```