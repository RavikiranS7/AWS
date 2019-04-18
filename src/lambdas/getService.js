import SampleController from '../controllers/SampleController';
import DynamoDBClient from '../persistence/DynamoDBClient';
import SampleService from '../services/SampleService';
import interceptor from './interceptor';

const client = new DynamoDBClient(process.env.SERVICE_TABLE_NAME);
const service = new SampleService(client);
const controller = new SampleController(service);

export const handler = interceptor((event, context, callback) => {
    return controller
        .getService(event)
        .then(response => callback(null, response))
        .catch(error => callback(null, error));
});
