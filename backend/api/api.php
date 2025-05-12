<?php

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($request, PHP_URL_PATH);

if (preg_match('#^/api/tickets/(\d+)/notes$#', $path, $matches)) {
  $_GET['id'] = $matches[1];
  include 'notes.php';
  exit;
}
if (preg_match('#^/api/tickets/(\d+)$#', $path, $matches)) {
  $_GET['id'] = $matches[1];
  include 'tickets.php';
  exit;
}

if ($path === '/api/tickets') {
  include 'tickets.php';
  exit;
}

if ($path === '/api/metrics') {
  include 'metrics.php';
  exit;
}

http_response_code(404);
echo json_encode(["error" => "API route not found"]);