/* @flow */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import AWS from 'aws-sdk';
import proxy from 'proxy-agent';

const DYNAMO_CLIENT = (function(): DocumentClient {
    if (process.env.IS_PROXY_ENABLED === 'true') {
        AWS.config.update({
            httpOptions: { agent: proxy('http://proxy.test.com:9898') },
        });
        return new AWS.DynamoDB.DocumentClient();
    }
    return new AWS.DynamoDB.DocumentClient();
})();

class DynamoProvider {
    client: DocumentClient;
    tableName: string;

    constructor(tableName: string, client: DocumentClient = DYNAMO_CLIENT) {
        this.tableName = tableName;
        this.client = client;
    }
    async retrieve(serviceId: Object): Promise<Object> {
        const parameters = {
            TableName: this.tableName,
            Key: serviceId,
        };

        return new Promise((resolve, reject) => {
            this.client.get(parameters, async (error, data) => {
                return error ? reject(error) : resolve(data.Item);
            });
        });
    }
}

export default DynamoProvider;
