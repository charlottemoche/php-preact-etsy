export function Ticket({ orderId, issue, details }) {
	return (
		<li class="border p-3 rounded hover:bg-gray-100 cursor-pointer">
			<a href={`/ticket/${orderId}`} class="block">
				<div class="flex justify-between items-center">
					<span class="text-sm">{`Order #${orderId} – “${issue}”`}</span>
					<div class="flex gap-2">
						<button
							type="button"
							class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								alert(`Resolved ticket #${orderId}`);
							}}
						>
							Resolve
						</button>
						<button
							type="button"
							class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								alert(`Escalated ticket #${orderId}`);
							}}
						>
							Escalate
						</button>
						<button
							type="button"
							class="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded text-sm"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								alert(`Note added to ticket #${orderId}`);
							}}
						>
							Add Note
						</button>
					</div>
				</div>
				<div class="pt-2 text-sm italic truncate text-gray-600">
					{details}
				</div>
			</a>
		</li>
	);
}