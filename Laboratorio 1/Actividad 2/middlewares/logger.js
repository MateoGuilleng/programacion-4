const logger = (req, res, next) => {
    const start = Date.now();
    
    const originalSend = res.send;
    res.send = function(body) {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        
        console.log(`[${timestamp}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
        
        originalSend.call(this, body);
    };
    
    next();
};

module.exports = logger;