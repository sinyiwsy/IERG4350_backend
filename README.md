# IERG4350_backend
IERG4350-project (backend)

## Setup Guide
**Prerequisite**
(For Mac User plz install Docker-for-mac 3.1.0 for stable developerment env)
- Docker
- Docker-compose


Make sure 8080, 18080 port unoccupied
```bash
docker-compose up
# OR (detach)
docker-compose up -d
```
Now `http://localhost:8080/index.php` will be the index of server

## Warning
- CORS is enable to all headers of all requests