cd server

if [ "$NODE_ENV" == "development" ]
then
	# start dev server with watch option
	npm run build
	npm run dev
else 
	# start prod server
	npm run start
fi
