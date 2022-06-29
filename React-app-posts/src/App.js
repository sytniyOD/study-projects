import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Components/UI/appRouter/AppRouter";
import Navbar from "./Components/UI/navbar/Navbar";
import { AuthContext } from "./context/Context";

import './styles/App.css'

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true)
		}
		setLoading(false);
	}, [])

	return (
		<AuthContext.Provider value={{
			isAuth,
			setIsAuth,
			isLoading
		}}>
			<Router>
				<Navbar />
				<AppRouter />
			</Router>
		</AuthContext.Provider>

	)
}

export default App;