import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../App"
import ChordproView from "../components/ChordproView"
import Like from "../components/Like"
import fetchData from "../scripts/fetchData"
import log from "../scripts/log"


export default function Song() {
	const app = useContext(AppContext)

	const { id } = useParams()

	const [songid, setSongid] = useState("")
	const [songData, setSongData] = useState({songname: "", content: ""})

	// reload at each request
	if (typeof id === "string" && id !== songid) setSongid(id)

	useEffect(() => {
		if (!id || id.length === 0) return

		fetchData("/api/song/" + id)
			.then(json => {
				log.debug("json response", json)
				if (json.valid && json.type === "SONG") {
					log.debug("set data", json)
					setSongData(json.data)
				}
			})
	}, [songid])

	return (
		<>
			<h1>
				{songData.songname}
				<Like songid={songid} disabled={!app.appData.logged}/>
			</h1>
			<p>id: {id}; songid: {songid}</p>
			<ChordproView text={songData.content}/>
		</>
	)
}