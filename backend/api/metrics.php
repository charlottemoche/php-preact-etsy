<?php
header("Content-Type: application/json");

$tickets = json_decode(file_get_contents(__DIR__ . '/data/tickets.json'), true);
$notes = json_decode(file_get_contents(__DIR__ . '/data/notes.json'), true);

$total = count($tickets);
$open = count(array_filter($tickets, fn($t) => $t['status'] === 'open'));
$resolved = count(array_filter($tickets, fn($t) => $t['status'] === 'resolved'));
$escalated = count(array_filter($tickets, fn($t) => !empty($t['escalated'])));
$average_notes = $total > 0 ? round(count($notes) / $total, 2) : 0;

echo json_encode([
	"total" => $total,
	"open" => $open,
	"resolved" => $resolved,
	"escalated" => $escalated,
	"average_notes" => $average_notes
]);