// Imports
const express = require('express')
const app = express()
const port = 3000

// Static Files
app.use(express.static('public'));



// Navigation
app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/html/title.html')
})

app.get('/about', (req, res) => {
   res.sendFile(__dirname + '/html/title.html')
})

app.listen(port, () => console.info(`App listening on port ${port}`))