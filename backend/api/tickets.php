<?php
header("Content-Type: application/json");

$ticketsFile = __DIR__ . '/data/tickets.json';
$ticketsRaw = json_decode(file_get_contents($ticketsFile), true);

$tickets = [];
foreach ($ticketsRaw as $t) {
	$tickets[$t['id']] = $t;
}

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;
$status = $_GET['status'] ?? null;

if ($method === 'PATCH' && $id) {
	if (!isset($tickets[$id])) {
		http_response_code(404);
		echo json_encode(['error' => 'Ticket not found']);
		exit;
	}

	$data = json_decode(file_get_contents('php://input'), true);
	$existing = $tickets[$id];

	foreach ($data as $key => $value) {
		if ($key === 'notes') continue;
		$existing[$key] = $value;
	}

	$existing['updated_at'] = date('c');
	$tickets[$id] = $existing;

	file_put_contents($ticketsFile, json_encode(array_values($tickets), JSON_PRETTY_PRINT));
	echo json_encode($tickets[$id]);
	exit;
}

if ($method === 'GET' && $id) {
	if (!isset($tickets[$id])) {
		http_response_code(404);
		echo json_encode(["error" => "Ticket not found"]);
		exit;
	}

	echo json_encode($tickets[$id]);
	exit;
}

if ($method === 'GET') {
	$result = $tickets;
	if ($status) {
		$result = array_filter($result, fn($ticket) => $ticket['status'] === $status);
	}

	echo json_encode(array_values($result));
	exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);