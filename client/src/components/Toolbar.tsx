import { useContext } from "react";
import { AppContext } from "../App";
import Tool from "./Tool";
import IconMenu from "../icons/icon_menu"
import IconUser from "../icons/icon_user"

export default function () {
	const app = useContext(AppContext)

	return (
		<nav>
			<Tool url="/menu">
				<IconMenu />
				Menu
			</Tool>
			<Tool url="/user">
				<IconUser />
				{app.appData.username || "Login/Signup"}
			</Tool>
		</nav>
	)
}