import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import AuthGuard from "./AuthGuard";
import AcountRegistration from "@/pages/AccountRegistration/AccountRegistration";
import Administration from "@/pages/Administration/Administration";
import Testing from "@/pages/Testing/Testing";

export const publicRoutePaths = [
	'/login'
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
			{
				path: '/registration-acc',
				id: "account-registration",
				element: <AcountRegistration />
			},
			{
				path: '/administration',
				id: "administration",
				element: <Administration />
			},
			{
				path: '/testing',
				id: "testing",
				element: <Testing />
			},
		]
	}
])


export default router;