import { useContext, useEffect, useState } from "react";
import fetchData from "../scripts/fetchData";
import Tool from "./Tool";
import log from "../scripts/log";
import { AppContext } from "../App";


export default function Like (props: any) {
	const [liked, setLiked] = useState(false)

	const app = useContext(AppContext)

	useEffect(() => {
		if (app.appData.logged) {
			fetchData("/api/like/" + props.songid)
			.then((json: any) => {
				if (json.valid) setLiked(json.data)
				else setLiked(false)
			})
		}
	}, [])

	function toggle () {
		fetchData("/api/like/" + props.songid, {
			method: "POST"
		})
		.then((json: any) => {
			if (json.valid) setLiked(json.data === "Like")
			else {
				setLiked(false)
				app.refresh()
			}
		})
	}

	return (
		<Tool action={toggle} disabled={props.disabled}>
			{liked ? "Unlike" : "Like"}
		</Tool>
	)
}