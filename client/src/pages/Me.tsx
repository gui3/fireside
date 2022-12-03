import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import Tool from "../components/Tool";


export default function () {
	const app = useContext(AppContext)

	useEffect(() => {
		app.refresh()
	}, [])

	if (app.appData.logged) {
		return (
			<div>
				<h1>User info</h1>
				<dl>
					<dt>Name:</dt>
					<dd>{app.appData.username}</dd>
					<dt>Email:</dt>
					<dd>{app.appData.email}</dd>
					<dt>Permissions:</dt>
					<dd>{app.appData.permissions.map((rolename: string) => 
						<div className="role badge">{rolename}</div>
					)}</dd>
				</dl>
				<div>
					<h2>Actions:</h2>
					<Tool url="/logout" style="button">Log out</Tool>
				</div>
			</div>
		)
	}
	else {
		return (
			<div>
				<h1>Guest</h1>
				<p>You are not logged in !</p>
			</div>
		)
	}
}