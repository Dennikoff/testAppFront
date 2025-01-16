import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect({pathName} : {pathName: string}) {

	const navigate = useNavigate();
	useEffect(() => {
		navigate({pathname: pathName});
	}, [])
	return (
		<div>Redirect...</div>
	)
}
