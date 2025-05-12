import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Header } from './components/Header.js';
import { Home } from './pages/Home/index.js';
import { TicketDashboard } from './pages/TicketDashboard/index.js';
import { TicketDetailsPage } from './pages/TicketDetails/index.js';
import { Help } from './pages/Help/index.js'
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main class="min-h-[calc(100vh-96px)] bg-gray-50 p-6 2xl:px-40">
				<Router>
					<Route path="/" component={Home} />
					<Route path="/tickets" component={TicketDashboard} />
					<Route path="/tickets/:id" component={TicketDetailsPage} />
					<Route path="/help" component={Help} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
