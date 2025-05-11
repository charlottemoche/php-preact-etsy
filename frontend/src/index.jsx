import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { TicketDashboard } from './pages/TicketDashboard/index.jsx';
import { Help } from './pages/Help/index.jsx'
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/tickets" component={TicketDashboard} />
					<Route path="/tickets/:id" component={TicketDashboard} />
					<Route path="/help" component={Help} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
