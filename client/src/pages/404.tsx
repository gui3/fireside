import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import fire from "../assets/fire.png"

const Page404 = () => {
    const location = useLocation();
    return (
        <div className="fullsize center-items">
            <h1>
                <img src={fire}/>
                404 (not found)
            </h1>
            <p>there is no page at {location.pathname}</p>
            <Navigation />
        </div>
    );
};

export default Page404;