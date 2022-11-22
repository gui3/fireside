import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AppContext } from "../App";



export default function User () {
	const app = useContext(AppContext)

	return app.appData.logged
	? <Navigate to="/me"/>
	: <Navigate to="/login"/>
}