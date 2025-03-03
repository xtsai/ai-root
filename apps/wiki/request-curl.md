#


# CURL template

```bash
curl --location 'https://127.0.0.1:16489/v1/auth/login' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer ' \
--data-raw '{
    "account": "admin",
    "password": "xtsai@123",
    "isLock": true,
    "code": "J84m.m7oer4wq"
}'


# Get health

curl --location 'https://127.0.0.1:3000/health' 

```