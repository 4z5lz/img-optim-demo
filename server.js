const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const spdy = require('spdy')
const fs = require('fs')

const portHttp = 3000
const portHttps = 3001
const app = express()

//prevent CORS shit
app.use(cors({
    maxAge: 3000
}))

//console-log the http traffic
morgan.token('protocol', function(req, res) {
    return req.secure ? 'https' : 'http '
});
app.use(morgan(':date[iso] :protocol -- :method :url :status :res[content-length] - :response-time ms'))

//serve the dist folder.
//this simulates Amazon's s3 service.
//Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.
app.use(express.static('dist'))

const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt'),
    protocols: ['h2', 'spdy/3.1', 'http/1.1']
}

// HTTPS  
spdy.createServer(options, app)
    .listen(portHttps, (error) => {
    if (error) {
        console.error(error)
        return process.exit(1)
    } else {
        console.log('HTTPS+HTTP/2 server started: https://localhost:' + portHttps)
    }
})

// HTTP    
app.listen(portHttp, function() {
    console.log('HTTP server started: http://localhost:' + portHttp)
})