import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import AuthGuard from "./AuthGuard";

export const publicRouteNames = [
	'login'
]

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<AuthGuard>
				<Layout />
			</AuthGuard>
		),
		children: [
			{
				path: '',
				id: "home",
				element: <Home />
			},
			{
				path: '/login',
				id: "login",
				element: <Login />
			},
		]
	}
])


export default router;