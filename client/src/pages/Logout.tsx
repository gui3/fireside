import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../App";
import fetchData from "../scripts/fetchData";


export default function Logout () {
	const navigate = useNavigate()

	const app = useContext(AppContext)

	useEffect(() => {
		fetchData("/api/logout")
		.then((json: any) => {
			app.refresh()
			navigate("/")
		})
	}, [])

	return (
		<h1>Logging out ...</h1>
	)
}