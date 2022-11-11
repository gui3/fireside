const crypto = require("crypto")

module.exports = function createId () {
	return crypto.randomBytes(128).toString('base64')
}
