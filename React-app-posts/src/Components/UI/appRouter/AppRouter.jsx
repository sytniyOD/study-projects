import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../context/Context";
import Login from "../../../pages/Login";
import Posts from "../../../pages/Posts";
import { publicRoutes, privateRoutes } from "../../../router/routes";
import Loader from "../loader/Loader";

const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext)

	if (isLoading) {
		return <Loader />
	}

	return (
		isAuth
			? <Routes>
				{privateRoutes.map(page =>
					<Route
						element={<page.element />}
						path={page.path}
						exact={page.exact}
						key={page.path}
					/>
				)}
				<Route path="*" element={<Posts />} />
			</Routes>
			: <Routes>
				{publicRoutes.map(page =>
					<Route
						element={<page.element />}
						path={page.path}
						exact={page.exact}
					/>
				)}
				<Route path="*" element={<Login />} />
			</Routes>
	)
}

export default AppRouter;