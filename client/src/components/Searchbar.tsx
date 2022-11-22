import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import  { useNavigate, NavigateFunction  } from 'react-router-dom'
import SearchResults from "./Searchresults"

export default function () {

	const navigate: NavigateFunction = useNavigate()

	const [search, setSearch] = useState("")
	const timer = useRef(0)
	const initial = useRef(true) // to avoid search on render

	useEffect(() => {
		if (initial.current) {
			initial.current = false
		}
		else {
			timer.current = setTimeout(() => {
				submit(search)
			}, 500)
		}
		return () => clearTimeout(timer.current);
	  }, [search])

	function change (evt: ChangeEvent<HTMLInputElement>) {
		const value: string = evt.currentTarget.value
		setSearch(value)
	}

	function keyup (evt: KeyboardEvent<HTMLInputElement>) {
		if (evt.key === "Enter") {
			submit(search)
		}
	}

	function submit (value: string) {
		console.log("searching", value)
		navigate("/search/" + value)
	}

	return (
		<div className="search section">
			<div className="searchbar">
				<input type="text" 
				onChange={change} onKeyUp={keyup}
				placeholder="search songs..." value={search}/>

				<button onClick={() =>submit(search)}>
					SEARCH
				</button>
			</div>
		</div>
	)
}