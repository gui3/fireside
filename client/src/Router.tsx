import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Song from "./pages/Song";
import Page404 from "./pages/404";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Me from "./pages/Me";
import User from "./pages/User";
import Logout from "./pages/Logout";
import Menu from "./pages/Menu";

export default function Router() {

	/*
	const [DevRoute, setDevRoute] = useState(null)
  
	// render DEV route only on DEV_MODE
	useEffect(_ => {
	  if (CLIENT_CONFIG.DEV_MODE) {
		setDevRoute(<Route path="DEV_TEST" element={<DevPage session={session}/>} />)
	  }
	}, [CLIENT_CONFIG.DEV_MODE])
	*/

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="menu" element={<Menu />} />
					<Route path="login" element={<Login />} />
					<Route path="logout" element={<Logout />} />
					<Route path="me" element={<Me />} />
					<Route path="user" element={<User />} />
					<Route path="song/:id" element={<Song />} />
					<Route path="search" element={<Search />}>
						<Route path=":search" />
					</Route>
					<Route path="about" element={<About />} />
					<Route path="contact" element={<Contact />} />
					<Route path="*" element={<Page404 />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export const routes: any = [
	{
		name: "Home",
		index: true,
		path: "/"
	}, {
		name: "My Account",
		path: "/user"
	}, {
		name: "Songs",
		path: "/search"
	}, {
		name: "About",
		path: "/about"
	}/*, {
		name: "Contact",
		path: "/contact"
	}, {
    name: "?",
    path: "fireplace",
    secret: true
  }*/
]