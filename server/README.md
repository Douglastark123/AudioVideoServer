## Setup steps

### Installing dependencies
```bash
 npm i
```

### Environment variables
- DATABASE_URL

ex:.
```env
DATABASE_URL="file:./dev.db"
```

### Database
- Run database migrations
```sh
npx prisma migrate dev --name init
```
