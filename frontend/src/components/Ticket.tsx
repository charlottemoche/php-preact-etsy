import Button from "./CoreComponents.js";

export function Ticket({ id, issue, details }) {
	return (
		<li class="border p-3 rounded hover:bg-gray-100 cursor-pointer">
			<a href={`/ticket/${id}`} class="block">
				<div class="flex justify-between items-center">
					<span class="text-sm">{`Order #${id} – “${issue}”`}</span>
					<div class="flex gap-2">
						<Button
							variant="green"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								alert(`Resolved ticket #${id}`);
							}}
						>
							Resolve
						</Button>

						<Button
							variant="yellow"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								alert(`Escalated ticket #${id}`);
							}}
						>
							Escalate
						</Button>

						<Button
							variant="gray"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								alert(`Note added to ticket #${id}`);
							}}
						>
							Add Note
						</Button>
					</div>
				</div>
				<div class="pt-2 text-sm italic truncate text-gray-600">
					{details}
				</div>
			</a>
		</li>
	);
}