import {useNavigate} from "react-router-dom"
import {FormEvent, useContext} from "react"
import fetchData from "../scripts/fetchData"
import log from "../scripts/log"
import { AppContext } from "../App"

export default function Login () {
	const navigate = useNavigate()
	const app = useContext(AppContext)

	function login (evt: FormEvent<HTMLFormElement>) {
		evt.preventDefault()
		const values: FormData = new FormData(evt.currentTarget)

		fetchData("/api/login", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				login: values.get("login"),
				password: values.get("password")
			})
		})
		.then(json => {
			app.refresh()
			navigate("/")
		})
		.catch((error: Error) => {
			log.error("Probable invalid credentials")
			app.refresh()
		})
	}
	
	function signup (evt: FormEvent<HTMLFormElement>) {
		evt.preventDefault()
		const values: FormData = new FormData(evt.currentTarget)

		fetchData("/api/signup", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: values.get("username"),
				email: values.get("email"),
				password: values.get("password")
			})
		})
		.then(json => {
			app.refresh()
			navigate("/")
		})
		.catch((error: Error) => {
			log.error("Error creating user")
			app.refresh()
		})
	}

	return (
		<div>
			<h1>Connect</h1>
			<form onSubmit={login}>
				<h2>With an existing account</h2>
				<div>
					<label htmlFor="login">Login</label>
					<input type="text" name="login"/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password"/>
				</div>
				<button type="submit" className="button">Login</button>
			</form>

			<hr/>

			<form onSubmit={signup}>
				<h2>Create an account</h2>
				<div>
					<label htmlFor="username">Username</label>
					<input type="text" name="username"/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="text" name="email"/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password"/>
				</div>
				<button type="submit" className="button">Signup</button>
			</form>
		</div>
	)
}