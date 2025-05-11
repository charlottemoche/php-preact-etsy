<?php

$request = $_SERVER['REQUEST_URI'];

if (str_starts_with($request, '/api/tickets')) {
  include 'tickets.php';
  exit;
}

if (str_starts_with($request, '/api/message')) {
  include 'message.php';
  exit;
}

if (str_starts_with($request, '/api/notes')) {
  include 'notes.php';
  exit;
}

http_response_code(404);
echo json_encode(["error" => "Not found"]);