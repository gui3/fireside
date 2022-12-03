import { useContext } from "react";
import { AppContext } from "../App";
import Navigation from "../components/Navigation";
import ThemeSwitch from "../components/ThemeSwitch"



export default function Menu () {
	const app = useContext(AppContext)

	return (
		<div className="center-item center-text">
			<h1>Menu</h1>
			<div>
				<h2>Pages</h2>
				<Navigation />
				<hr/>
				<ThemeSwitch/>
			</div>
		</div>
	)
}