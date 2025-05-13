export function Home() {
	return (
		<main class="max-w-2xl mx-auto p-6 text-gray-800 dark:text-gray-300">
			<h1 class="text-3xl font-bold mb-4">Welcome to Agent Tools</h1>

			<p class="text-base text-gray-600 dark:text-gray-400 mb-6">
				This internal tool helps you manage customer support tickets: resolve issues quickly,
				escalate when needed, and keep everything organized.
			</p>

			<section class="mb-8">
				<h2 class="text-xl font-semibold mb-2">Getting Started</h2>
				<ol class="list-decimal list-inside text-sm text-gray-700 dark:text-gray-400 space-y-1 ml-4">
					<li>Click <span class="font-medium">Dashboard</span> to view open tickets</li>
					<li>Use action buttons to resolve or escalate tickets</li>
					<li>Click a ticket to view full details and notes</li>
				</ol>
			</section>

			<section class="mb-8">
				<h2 class="text-xl font-semibold mb-2">Features</h2>
				<ul class="list-disc list-inside text-sm text-gray-700 dark:text-gray-400 space-y-1 ml-4">
					<li>View all open and/or resolved tickets</li>
					<li>Resolve, escalate, or comment on tickets</li>
					<li>Filter tickets by date or status</li>
					<li>View ticket details and history</li>
				</ul>
			</section>

			<div class="mt-8">
				<a
					href="/tickets"
					class="inline-block bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800 transition"
				>
					Go to Dashboard
				</a>
			</div>
		</main>
	);
}
