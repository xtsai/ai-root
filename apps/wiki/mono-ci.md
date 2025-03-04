#


-----
## X-admin

> CI Redis
```bash
# mq
pnpm -F x-admin add @nestjs/config@3.2.3
pnpm -F x-admin add @tsailab/ioredis-mq ioredis js-yaml
pnpm -F x-admin add -D @types/js-yaml

pnpm -F x-admin add redis@4.6.13
```

> CI typeorm

- locked package : @nestjs/typeorm@10.0.2 typeorm@0.3.20 mysql2@3.11.5

```bash
# x-admin
pnpm -F x-admin add @nestjs/typeorm@10.0.2 typeorm@0.3.20 mysql2@3.11.5

# workspace
pnpm add @nestjs/typeorm@10.0.2 typeorm@0.3.20 -Dw
```

> modules

```bash
pnpm -F x-admin i @xtsai/core
```

# class-transformer

```bash
pnpm -F x-admin add class-transformer@0.5.1 class-validator@0.14.1

pnpm add -Dw class-transformer class-validator
```

- @xtsai/xai-utils

```bash
pnpm -F x-admin add @xtsai/xai-utils bcrypt@5.1.1 date-fns@4.1.0 eckey-utils@0.7.14 nanoid@3.3.4
```

---
## core

```bash

```

## JWT

```bash

pnpm -F x-admin add @nestjs/jwt@10.2.0 @nestjs/passport@10.0.3 passport passport-jwt cookie-parser
pnpm -F x-admin add @types/passport-jwt -D

#workspace
pnpm add @nestjs/jwt@10.2.0 @nestjs/passport@10.0.3 passport passport-jwt @types/passport-jwt -Dw
```

## APP project CI

```bash
pnpm -F x-admin express@4.18.1 helmet js-yaml class-validator@0.14.0 class-transformer@0.5.1
pnpm -F x-admin 
```