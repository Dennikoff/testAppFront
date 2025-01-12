import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect() {

	const navigate = useNavigate();
	useEffect(() => {
		navigate({pathname: '/administration/asuz-control'});
	}, [])
	return (
		<div>Redirect...</div>
	)
}
