<?php
header("Content-Type: application/json");

$notesFile = __DIR__ . '/data/notes.json';
$notesRaw = json_decode(file_get_contents($notesFile), true);
$method = $_SERVER['REQUEST_METHOD'];
$ticketId = $_GET['id'] ?? null;

if (!$ticketId || !is_numeric($ticketId)) {
	http_response_code(400);
	echo json_encode(["error" => "Invalid ticket ID"]);
	exit;
}

if ($method === 'GET') {
	$filtered = array_values(array_filter($notesRaw, fn($n) => $n['ticket_id'] == $ticketId));
	echo json_encode($filtered);
	exit;
}

if ($method === 'POST') {
	$data = json_decode(file_get_contents('php://input'), true);
	if (!isset($data['text']) || trim($data['text']) === '') {
		http_response_code(400);
		echo json_encode(["error" => "Missing note text"]);
		exit;
	}

	$newNote = [
		"id" => count($notesRaw) > 0 ? max(array_column($notesRaw, 'id')) + 1 : 1,
		"ticket_id" => (int)$ticketId,
		"text" => trim($data['text']),
		"created_at" => date('c')
	];

	$notesRaw[] = $newNote;
	file_put_contents($notesFile, json_encode($notesRaw, JSON_PRETTY_PRINT));

	echo json_encode($newNote);
	exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
