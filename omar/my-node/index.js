const http = require('http');
const winston = require('winston');

// Setup logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

let isReady = false;
let isStarted = false;
let isAlive = true;

setTimeout(() => {
    isStarted = true;
    logger.info('Application startup completed');
}, 5000);

setTimeout(() => {
    isReady = true;
    logger.info('Application is now ready to receive traffic');
}, 10000);

const server = http.createServer((req, res) => {
    if (req.url === '/healthz') {
        if (isAlive) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok' }));
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'unhealthy' }));
        }
    } else if (req.url === '/readiness') {
        if (isReady) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ready' }));
        } else {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'not ready' }));
        }
    } else if (req.url === '/startup') {
        if (isStarted) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'started' }));
        } else {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'starting' }));
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!\n');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}/`);
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
    logger.warn('SIGTERM received. Shutting down gracefully...');
    isReady = false;
    isAlive = false;
    server.close(() => {
        logger.info('Closed remaining connections. Exiting now.');
        process.exit(0);
    });

    // Force exit if not closed within 10 seconds
    setTimeout(() => {
        logger.error('Forcing shutdown...');
        process.exit(1);
    }, 10000);
});
