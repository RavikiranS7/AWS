//@flow
import SampleService from '../services/SampleService';
import Response from '../response/Response';

class SampleController {
    service: SampleService;

    constructor(service: SampleService) {
        this.service = service;
    }

    async getService(event) {
        try {
            const { serviceId } = event.pathParameters;
            const serviceDetails = await this.service.retrieve(serviceId);
            return Response.ok().withJson(serviceDetails);
        } catch (error) {
            throw error;
        }
    }
}

export default SampleController;
