import { TicketDashboard } from "../TicketDashboard";
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';

export function Home() {
	const [message, setMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		fetchAPI()
	}, []);

	function fetchAPI() {
		axios.get('/api/message.php')
		.then((res) => {
			console.log(res.data)
			setMessage(res.data.message);
		})
		.catch((err) => {
			setErrorMessage(err.message)
			setMessage('');
		})
	}
	
	return (
		<main class="min-h-screen bg-gray-50 p-6 font-sans">
			<header class="mb-6">
				<h1 class="text-2xl font-bold text-gray-800">Agent Tools Dashboard</h1>
				{message && <p class="text-green-700 mt-2">{message}</p>}
				{errorMessage && <p class="text-red-600 mt-2">{errorMessage}</p>}
			</header>

			<TicketDashboard />
		</main>
	);
}
