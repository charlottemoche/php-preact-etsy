<?php
header("Content-Type: application/json");

$notesFile = __DIR__ . '/data/notes.json';
$notes = json_decode(file_get_contents($notesFile), true);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $ticketId = $_GET['ticket_id'] ?? null;

  if (!$ticketId) {
    http_response_code(400);
    echo json_encode(["error" => "Missing ticket_id"]);
    exit;
  }

  $filtered = array_values(array_filter($notes, fn($n) => $n['ticket_id'] == $ticketId));
  echo json_encode($filtered);
  exit;
}

if ($method === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  if (!isset($data['ticket_id']) || !isset($data['text'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing ticket_id or text"]);
    exit;
  }

  $newNote = [
    "id" => count($notes) > 0 ? max(array_column($notes, 'id')) + 1 : 1,
    "ticket_id" => $data['ticket_id'],
    "text" => $data['text'],
    "created_at" => date('c')
  ];

  $notes[] = $newNote;
  file_put_contents($notesFile, json_encode($notes, JSON_PRETTY_PRINT));

  echo json_encode($newNote);
  exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);