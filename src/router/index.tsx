import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login/Login";
import AuthGuard from "./AuthGuard";
import AcountRegistration from "@/pages/AccountRegistration/AccountRegistration";
import Administration from "@/pages/Administration/Administration";
import Testing from "@/pages/Testing/Testing";
import Control from "@/pages/Administration/components/ContolComponent/Control";
import Logs from "@/pages/Administration/components/LogsComponent/Logs";

import TestPlan from "@/pages/Testing/components/TestPlan/TestPlan";
import TestCase from "@/pages/Testing/components/TestCase/TestCase";
import Project from "@/pages/Testing/components/Project/Project";
import Redirect from "@/shared/Redirect/Redirect";

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
				element: <Redirect pathName={localStorage.getItem('role') === 'DIRECTOR' ? "/registration-acc" : "/testing"}/>,
			},
			{
				path: '/login',
				id: "login",
				element: <Login />
			},
			{
				path: '/registration-acc',
				id: "account-registration",
				element: localStorage.getItem('role') === 'DIRECTOR' ? <AcountRegistration /> :  <Redirect pathName="/testing"/>
			},
			{
				path: '/administration',
				id: "administration",
				element: localStorage.getItem('role') === 'DIRECTOR' ? <Administration /> :  <Redirect pathName="/testing"/>,
				children: [
					{
						path: '',
						id: "administration.redirect",
						element: <Redirect pathName="/administration/asuz-control"/>,
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
				element: <Testing />,
				children: [
					{
						path: '',
						id: "testing.redirect",
						element: <Redirect pathName="/testing/project"/>,
					},
					{
						path: 'project',
						id: "testing.project",
						element: <Project/>
					},
					{
						path: 'test-plan',
						id: "testing.testPlan",
						element: <TestPlan/>
					},
					{
						path: 'test-case',
						id: "testing.testCase",
						element: <TestCase/>
					},
				]
			},
		]
	}
])


export default router;