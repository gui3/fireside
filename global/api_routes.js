
export default [
	// AUTH & USERS ---------------------
	{
		path: "/api/signup",
		method: "POST",
		expects: "json body with keys username, email, password",
		description: "creates a new account & redirects to /api/login",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/login",
		method: "POST",
		expects: "json body with keys username|email|login, password",
		description: "attempt to login to an account, creates a session with cookie if success",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/logout",
		method: "ALL",
		expects: "<nothing>",
		description: "deletes the current session",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/session",
		method: "ALL",
		expects: "",
		description: "sends information about current session",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/me",
		method: "GET",
		expects: "<nothing>",
		description: "sends information about current user (username, email, userid)",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/me",
		method: "PUT",
		expects: "json body with keys username?, email?, password?",
		description: "updates the current user with new values",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/me",
		method: "DELETE",
		expects: "json body with keys password !",
		description: "if password is correct, deletes the current user's account",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/user?search=<string>",
		method: "GET",
		expects: "<nothing>",
		description: "list all users, filtered by optionnal parameter search",
		handler: "server/src/routes/r_auth"
	}, {
		path: "/api/user/:id",
		method: "GET",
		expects: "<nothing>",
		description: "sends username and userid of user :id",
		handler: "server/src/routes/r_auth"
	},
	// ADMIN ROUTES ----------------------
	/**
	 * all admin routes are protected by user role "admin"
	 * you need the admin role to access them
	 */
	{
		path: "/api/admin/can/:id",
		method: "GET",
		expects: "<nothing>",
		description: "sends all roles of user :id",
		handler: "server/src/routes/r_admin"
	}, {
		path: "/api/admin/can",
		method: "GET",
		expects: "<nothing>",
		description: "sends a list of all users and their permissions",
		handler: "server/src/routes/r_admin"
	}, {
		path: "/api/admin/grant",
		method: "POST",
		expects: "json body with keys userid, rolename",
		description: "grants user with permission of the name rolename",
		handler: "server/src/routes/r_admin"
	}, {
		path: "/api/admin/revoke",
		method: "POST",
		expects: "json body with keys userid, rolename",
		description: "revoke permission rolename from user",
		handler: "server/src/routes/r_admin"
	}, {
		path: "/api/admin/role",
		method: "GET",
		expects: "<nothing>",
		description: "sends the list of available roles and their ids",
		handler: "server/src/routes/r_admin"
	}, {
		path: "/api/admin/role",
		method: "POST",
		expects: "json body with key rolename",
		description: "creates role of name rolename",
		handler: "server/src/routes/r_admin"
	}, {
		path: "/api/admin/role",
		method: "DELETE",
		expects: "json body with key rolename",
		description: "deletes role rolename",
		handler: "server/src/routes/r_admin"
	}, 
	// SONGS ---------------------------
	{
		path: "/api/song?search=<string>",
		method: "GET",
		expects: "<nothing>",
		description: "sends list of songs, filtered by optional param search",
		handler: "server/src/routes/r_song"
	}, {
		path: "/api/song/:id",
		method: "GET",
		expects: "<nothing>",
		description: "sends song identified by :id",
		handler: "server/src/routes/r_song"
	}, {
		path: "/api/song",
		method: "POST",
		expects: "to be logged, json body with keys songname, content, author?",
		description: "creates a new song",
		handler: "server/src/routes/r_song"
	}, {
		path: "/api/song/:id",
		method: "PUT",
		expects: "to be logged, json body with keys songname?, content?, author?",
		description: "updates song identified by :id",
		handler: "server/src/routes/r_song"
	}, {
		path: "/api/song/:id",
		method: "DELETE",
		expects: "to be logged",
		description: "deletes song identified by id",
		handler: "server/src/routes/r_song"
	},
	// BOOKS ------------
	{
		path: "/api/book",
		method: "GET",
		expects: "to be logged",
		description: "lists all book of current user",
		handler: "server/src/routes/r_book"
	},{
		path: "/api/book/:id",
		method: "GET",
		expects: "to be logged",
		description: "gives details about book :id of current user & list of songs",
		handler: "server/src/routes/r_book"
	},{
		path: "/api/book",
		method: "POST",
		expects: "body with {bookid, bookname}",
		description: "creates a new book for current user",
		handler: "server/src/routes/r_book"
	},{
		path: "/api/book/:id",
		method: "PUT",
		expects: "book owned by current user, body with {bookid, bookname}",
		description: "update a book",
		handler: "server/src/routes/r_book"
	},{
		path: "/api/book/:id",
		method: "DELETE",
		expects: "book :id owned by current user",
		description: "deletes book identified by id",
		handler: "server/src/routes/r_book"
	},{
		path: "/api/book/song",
		method: "POST",
		expects: "body {bookid, songid, transpose?, order?}",
		description: "add  song into book if owned by current user",
		handler: "server/src/routes/r_book"
	},{
		path: "/api/book/song",
		method: "DELETE",
		expects: "body {bookid, songid}",
		description: "remove song from book if owned by current user",
		handler: "server/src/routes/r_book"
	},
	// LIKES
	{
		path: "/api/like/:id",
		method: "POST",
		expects: "to be logged",
		description: "like or unlike song :id",
		handler: "server/src/routes/r_like"
	}, {
		path: "/api/like/:id",
		method: "GET",
		expects: "to be logged",
		description: "returns {data: true} if the song :id is liked by current user",
		handler: "server/src/routes/r_like"
	}
]
