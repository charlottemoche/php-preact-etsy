<?php

$request = $_SERVER['REQUEST_URI'];

if (str_starts_with($request, '/api')) {
  include __DIR__ . '/backend/api/api.php';
  exit;
}

$file = __DIR__ . '/public' . $request;
if ($request !== '/' && file_exists($file)) {
  return false;
}

readfile(__DIR__ . '/public/index.html');