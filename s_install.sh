echo "installing & building client"
cd client
NODE_ENV=development npm install
npm run build
npm install
cd ..

echo "installing server"
cd server
NODE_ENV=development npm install
npm run build

echo "setup server"
npm run knex migrate:latest



