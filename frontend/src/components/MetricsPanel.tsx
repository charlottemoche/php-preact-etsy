import { useEffect, useState } from 'preact/hooks';
import { BarChart3, CheckCircle, AlertTriangle, FileText, MessageSquare } from 'lucide-preact';

export function MetricsPanel() {
	const [metrics, setMetrics] = useState<null | {
		total: number;
		open: number;
		resolved: number;
		escalated: number;
		average_notes: number;
	}>(null);

	useEffect(() => {
		fetch('/api/metrics')
			.then(res => res.json())
			.then(setMetrics)
			.catch(console.error);
	}, []);

	if (!metrics) return null;

	const items = [
		{ label: 'Total', value: metrics.total, icon: FileText, color: 'bg-gray-100 dark:bg-gray-700' },
		{ label: 'Open', value: metrics.open, icon: BarChart3, color: 'bg-blue-100 text-blue-800' },
		{ label: 'Resolved', value: metrics.resolved, icon: CheckCircle, color: 'bg-green-100 text-green-800' },
		{ label: 'Escalated', value: metrics.escalated, icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-800' },
		{ label: 'Avg. Notes/Ticket', value: metrics.average_notes, icon: MessageSquare, color: 'bg-purple-100 text-purple-800' },
	];

	return (
		<div class="max-w-lg">
			<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">Ticket Stats</h2>
			<div class="bg-white dark:bg-dark-2 border border-gray-100 dark:border-gray-600 rounded shadow p-4 w-full space-y-3">
				{items.map(({ label, value, icon: Icon, color }) => (
					<div class="flex items-center gap-3 p-2 rounded">
						<div class={`rounded-full p-2 ${color}`}>
							<Icon class="w-4 h-4" />
						</div>
						<div class="flex justify-between w-full items-center">
							<p class="text-sm text-gray-600 dark:text-gray-300">{label}</p>
							<p class="font-medium text-sm">{value}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}