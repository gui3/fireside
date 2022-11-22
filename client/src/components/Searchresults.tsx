import { useState, useEffect, ChangeEvent, useContext } from "react"
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import fetchData from "../scripts/fetchData";
import log from "../scripts/log"
import Like from "./Like";


export default function SearchResults(props: any) {
	const app = useContext(AppContext)
	
	const [songs, setSongs] = useState([])

	useEffect(() => {
		const research = props.search
		log.debug("searching : " + research)

		const base = "https://base.url"
		const url = new URL("/api/song", base)
		const path = url.pathname
		const params = url.searchParams
		params.append("search", research)

		fetchData(path + "?" + params)
			.then(data => data.valid && data.type === "SONGS" && setSongs(data.data))
			.catch(error => log.error(error))
	}, [props.search])

	return (
		<div>
			<h3>Search Results</h3>
			<ol>
				{songs && songs.map && songs.map((song: any, ix: number) => {
					return (
						<li key={ix}>
							<Link to={"/song/" + song.songid}>
								<h4>{song.songname}</h4>
								<p>{song.author}</p>
							</Link>
							<Like songid={song.songid} disabled={!app.appData.logged}/>
						</li>
					)
				})}
			</ol>
		</div>
	)
}