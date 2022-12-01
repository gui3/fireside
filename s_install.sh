
echo "installing & building client"

cd client
npm install
npm run build
cd ..

echo installing server
cd server
npm install
npm run build

echo setup server
npm run knex migrate:latest



