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

## Endpoints

### PHP ver.
POST /backend/index?action=login
POST /backend/index?action=forgot
POST /backend/index?action=cart

POST /backend/index?add_category
POST /backend/index?add_product
POST /backend/index?update_category
POST /backend/index?update_product
POST /backend/index?delete_category
POST /backend/index?delete_product

GET /backend/index?action=category
GET /backend/index?action=product
GET /backend/index?action=logout
GET /backend/index?action=auth_admin
GET /backend/index?action=auth




