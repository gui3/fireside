import { createContext, useEffect, useRef, useState } from "react";
import Router from './Router'
import fetchData from "./scripts/fetchData";
import log from "./scripts/log";

export const AppContext = createContext({
	appData: {
		logged: false,
		userid: -1,
		username: "",
		email: "",
		permissions: []
	},
	updateAppData: (input: any) => {},
	refresh: () => {}
})

export default function App() {
	const initial = useRef(true) // to avoid log on render

	const [refreshing, setRefreshing] = useState(true)

	function refresh () {
		log.debug("refreshing", refreshing)
		setRefreshing(!refreshing)
	}

	const [appData, setAppData] = useState({
		logged: false,
		userid: -1,
		username: "",
		email: "",
		permissions: []
	})
	
	function updateAppData (input: any): void {
		setAppData({
			...appData,
			...input
		})
	}


	useEffect(() => {
		log.debug("REFRESH user data")
		fetchData("/api/me")
		.then((json: any) => {
			if (json.valid && json.success) {
				updateAppData({
					logged: true,
					userid: json.data.userid,
					username: json.data.username,
					email: json.data.email,
					permissions: json.data.permissions.map((role: any) => role.rolename)
				})
			}
			else {
				updateAppData({
					logged: false,
					userid: -1,
					username: "",
					email: "",
					permissions: []
				})
			}
		})
		.catch((error: Error) => {
			log.error("Error fetching user data")
		})
	}, [refreshing])

	useEffect(() => {
		if (initial.current) {
			initial.current = false
		}
		else if (appData.logged) {
			log.info("Welcome, " + appData.username)
		}
		else {
			log.info("Disconnected, Goodbye!")
		}
	}, [appData.logged, appData.username])

	return (
		<AppContext.Provider
		value={{appData, updateAppData, refresh}} >
			<Router />
		</AppContext.Provider>
	)
}
