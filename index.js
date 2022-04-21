const express = require('express')
const port = process.env.PORT || 3000
const indiaNewsRouter = require("./routes/india-news")
const path = require('path')

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
console.log(__dirname)
app.use(express.static(path.join(__dirname, 'module')));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.sendFile( path.resolve('./module/own.html') );
})

app.use('/news', indiaNewsRouter)
app.use('/*',(req, res)=>{
    res.send("<h1>404 page not found</h1>");
})

app.listen(port, () => console.log(`App listening on port ${port}!`))