## Loom walkthrough
[https://www.loom.com/share/b369b8514a0345c8a7ca7c551476253e](https://www.loom.com/share/ba206111550e4b2788a29db95544c096?sid=4c20c287-2f9a-455c-a863-112f993f3c00)

## Start project

### Install frontend dependencies
`cd frontend`

`npm install`

### From inside /frontend
`npm run build`

### Optional, watch css to see changes
`npm run watch`

### Start the PHP server from the project root
`php -S localhost:8000 -t public router.php`

## Project Specs

### Full stack
Built with Preact + PHP

Supports ticket resolution, escalation, and internal notes

Tickets can be filtered by status and sorted by created date

### Frontend
Inline ticket updates

Imports tailwind css

Supports light and dark modes

Mobile-responsive


### Backend
RESTful API endpoints

Data stored in local JSON files

### In the future
Add testing (PHPUnit, vitest)

Support pagination

Form validation and error handling

Auth

Decouple escalate from a boolean

Add an `order_id` separate from the ticket `id`
