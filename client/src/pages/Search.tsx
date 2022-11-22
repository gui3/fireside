import { useParams } from "react-router-dom"

import SearchResults from "../components/Searchresults";

export default function Search () {

	const params = useParams()
	const search = params.search || ""

	return (
		<SearchResults search={search}/>
	)
}