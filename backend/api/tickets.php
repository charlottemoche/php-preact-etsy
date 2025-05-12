<?php
header("Content-Type: application/json");

$dataFile = __DIR__ . '/data/tickets.json';

$ticketsRaw = json_decode(file_get_contents($dataFile), true);

$tickets = [];
foreach ($ticketsRaw as $t) {
  $tickets[$t['id']] = $t;
}

$status = $_GET['status'] ?? null;
$id = $_GET['id'] ?? null;

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'PATCH') {
  if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ticket ID']);
    exit;
  }

  $data = json_decode(file_get_contents('php://input'), true);

  if (!isset($tickets[$id])) {
    http_response_code(404);
    echo json_encode(['error' => 'Ticket not found']);
    exit;
  }

  $tickets[$id] = array_merge($tickets[$id], $data);
  $tickets[$id]['updated_at'] = date('c');

  file_put_contents($dataFile, json_encode(array_values($tickets), JSON_PRETTY_PRINT));
  echo json_encode($tickets[$id]);
  exit;
}

if ($id && $method === 'GET') {
  if (isset($tickets[$id])) {
    echo json_encode($tickets[$id]);
  } else {
    http_response_code(404);
    echo json_encode(["error" => "Ticket not found"]);
  }
  exit;
}

if ($status) {
  $tickets = array_filter($tickets, function ($ticket) use ($status) {
    return $ticket['status'] === $status;
  });
}

error_log("GET params: " . json_encode($_GET));

echo json_encode(array_values($tickets));