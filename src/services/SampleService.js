//@flow
import DynamoDBClient from '../persistence/DynamoDBClient';

class SampleService {
    client: DynamoDBClient;

    constructor(client: DynamoDBClient) {
        this.client = client;
    }

    async retrieve(serviceId: string): Promise<Object> {
        return this.client.retrieve({ serviceId });
    }
}

export default SampleService;
