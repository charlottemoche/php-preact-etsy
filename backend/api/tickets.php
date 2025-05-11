<?php
header("Content-Type: application/json");

$dataFile = __DIR__ . '/data/tickets.json';
$tickets = json_decode(file_get_contents($dataFile), true);

$id = $_GET['id'] ?? null;

if ($id) {
  if (isset($tickets[$id])) {
    echo json_encode($tickets[$id]);
  } else {
    http_response_code(404);
    echo json_encode(["error" => "Ticket not found"]);
  }
  exit;
}

echo json_encode(array_values($tickets));