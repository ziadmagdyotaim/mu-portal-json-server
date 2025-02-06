const jsonServer = require('json-server')
const cors = require('cors')  // Import CORS package

const server = jsonServer.create()

// Allow all origins
server.use(cors({
    origin: '*',  // Allows all origins (not recommended for production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false
}));

const middlewares = jsonServer.defaults()
server.use(middlewares)

// URL Rewriting Rules
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

// Database and Routing
const router = jsonServer.router('db.json')
server.use(router)

server.listen(3000, '0.0.0.0', () => {
    console.log('JSON Server is running on port 3000 and accessible from all origins')
})

// Export the Server API
module.exports = server
