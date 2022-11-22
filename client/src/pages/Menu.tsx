import { useContext } from "react";
import { AppContext } from "../App";
import Navigation from "../components/Navigation";



export default function Menu () {
	const app = useContext(AppContext)

	return (
		<div>
			<h1>Menu</h1>
			<div>
				<h2>Pages</h2>
				<Navigation />
			</div>
		</div>
	)
}