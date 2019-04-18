const interceptor = lambda => {
    return (event, context, callback) => {
        const correlationId = event.headers['serviceId'];

        if (!correlationId) {
            const response = {
                statusCode: 400,
                body: JSON.stringify({ parameters: ['serviceId'] }),
            };

            return callback(null, response);
        }

        const wrappedCallback = (error, response) => {
            if (error) {
                const response = {
                    statusCode: 500,
                };
                return callback(null, response);
            }
            return callback(error, response);
        };

        return lambda(event, context, wrappedCallback);
    };
};

export default interceptor;
