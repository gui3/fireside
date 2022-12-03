import { routes } from "../Router"
import Tool from "./Tool"

export default function Navigation() {
	return (
		<nav className="center-text">
			<ul>
				{routes.map((route: any, ix: number) => !route.secret &&
					<li key={ix}>
						<Tool url={route.path} style="button">{route.name}</Tool>
					</li>
				)}
			</ul>
		</nav>
	)
};
