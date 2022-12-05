const crypto = require("crypto")

module.exports = function hashPassword (password, salt, iterations) {
	var hash = crypto.pbkdf2Sync(
		password, 
		salt, 
		iterations, 
		64,
		"sha512"
	).toString("base64")

	return hash
}
