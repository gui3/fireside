
echo installing server
cd server
npm install

echo setup server
npm run knex migrate:latest



