# IERG4350_backend
IERG4350-project (backend)

# Database
```
cd db/
docker-compose up -d
```

# Endpoint
- [x] POST /categories
- [x] GET /categories
- [x] DELETE /categories/:id
- [ ] PUT /categories/:id
- [ ] GET /categories/:id/products

- [x] POST /products
- [x] GET /products
- [x] DELETE /products/:id
- [ ] PUT /products/:id

- [x] POST /user
- [x] GET /user/auth

# TODO list
- [ ] Product Schema: + cat_id => route
- [ ] Category: search product by cat
- [ ] OAuth 2.0
- [ ] Stripe
- [ ] SendGrid
