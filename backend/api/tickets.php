<?php
header("Content-Type: application/json");

$dataFile = __DIR__ . '/data/tickets.json';
$tickets = json_decode(file_get_contents($dataFile), true);

$id = $_GET['id'] ?? null;

if ($id) {
  foreach ($tickets as $ticket) {
    if ($ticket['id'] === $id) {
      echo json_encode($ticket);
      exit;
    }
  }

  http_response_code(404);
  echo json_encode(["error" => "Ticket not found"]);
  exit;
}

echo json_encode($tickets);