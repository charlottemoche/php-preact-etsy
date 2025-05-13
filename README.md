### Install frontend dependencies
`cd frontend`

`npm install`

### Build the frontend into the public folder
`npm run build`

### From the project root, start the PHP server using the router
`php -S localhost:8000 -t public router.php`

## Front end
Inline ticket updates

Imports tailwind css

Supports light and dark modes

Mobile-responsive


## Back end
RESTful API endpoints

Writes to local json files

## In the future
Add testing (PHPUnit, vitest)

Form validation and error handling

Auth

Decouple escalate from a boolean