// Imports
const express = require('express')
const app = express()
const port = 3000

// Static Files
app.use(express.static('public'));
// Specific folder example
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))



// Navigation
app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/html/title.html')
})

app.get('/about', (req, res) => {
   res.sendFile(__dirname + '/html/title.html')
})

app.listen(port, () => console.info(`App listening on port ${port}`))