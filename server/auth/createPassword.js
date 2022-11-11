const crypto = require("crypto")
const hashPassword = require("./hashPassword")

module.exports = function createPassword(password) {
	var salt = crypto.randomBytes(128).toString('base64')
	var iterations = Math.floor(Math.random() * 500 + 500)

	var hash = hashPassword(
		password,
		salt,
		iterations
	)

	return {
		salt,
		password: hash,
		iterations
	}
}
