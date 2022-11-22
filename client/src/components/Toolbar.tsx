import { useContext } from "react";
import { AppContext } from "../App";
import Navigation from "./Navigation";
import Tool from "./Tool";

export default function () {
	const app = useContext(AppContext)

	return (
		<nav>
			<Tool url="/menu">
				Menu
			</Tool>
			<Tool url="/user">
				{app.appData.username || "Login/Signup"}
			</Tool>
		</nav>
	)
}