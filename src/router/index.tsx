import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import AuthGuard from "./AuthGuard";
import AcountRegistration from "@/pages/AccountRegistration/AccountRegistration";
import Administration from "@/pages/Administration/Administration";
import Testing from "@/pages/Testing/Testing";
import Control from "@/pages/Administration/components/ContolComponent/Control";
import Logs from "@/pages/Administration/components/LogsComponent/Logs";
import Redirect from "@/pages/Administration/components/Redirect/Redirect";

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
				element: <Administration />,
				children: [
					{
						path: '',
						id: "administration.redirect",
						element: <Redirect/>,
					},
					{
						path: 'asuz-control',
						id: "administration.asuz-control",
						element: <Control/>
					},
					{
						path: 'logs',
						id: "administration.logs",
						element: <Logs/>
					},
				]
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