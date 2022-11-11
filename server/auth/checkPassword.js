const crypto = require("crypto")
const hashPassword = require("./hashPassword")

module.exports = function checkPassword (
	passwordAttempt,
	originalHash,
	salt,
	iterations
) {
	return originalHash == hashPassword(
		passwordAttempt, 
		salt, 
		iterations
	)
}