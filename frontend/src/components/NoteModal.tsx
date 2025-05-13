import { useState } from 'preact/hooks';
import Button from './CoreComponents.js';

export function NoteModal({
	onSubmit,
	onClose,
}: {
	onSubmit: (note: string) => void;
	onClose: () => void;
}) {
	const [note, setNote] = useState('');

	return (
		<div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
			<div class="bg-white dark:bg-dark rounded-lg shadow-lg p-4 w-full max-w-md">
				<h3 class="text-lg font-semibold mb-2">Add a Note</h3>
				<textarea
					class="w-full border border-gray-300 rounded p-2 text-sm"
					rows={4}
					value={note}
					onInput={(e) => setNote(e.currentTarget.value)}
				/>
				<div class="mt-4 flex justify-end gap-2">
					<Button variant="gray" onClick={onClose}>Cancel</Button>
					<Button
						variant="blue"
						onClick={() => {
							onSubmit(note);
							onClose();
						}}
						disabled={!note.trim()}
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
}