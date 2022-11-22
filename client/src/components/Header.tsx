import AppLogo from "./AppLogo";
import { Link } from "react-router-dom";
import Toolbar from "./Toolbar";
import Searchbar from "./Searchbar";

export default function Header () {

    return (
        <header className="flex row">
            <Link to="/">
				<AppLogo size="2em"/>
                <span className="sitename">
                    Fireside
                </span>
            </Link>
			<Searchbar />
            <Toolbar />
        </header>
    )
}