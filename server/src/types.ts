import "express-session"

declare module "express-session" {
	interface SessionData {
		userid: number,
		date: Date,

		views: number
	}
}