import FunctionsClient from './functions-client';

class UsersFunctionsClient extends FunctionsClient {
    getUserByPhoneNumber(phoneNumber) {
        return this.call('getUserByPhoneNumber', { phoneNumber });
    }

    getUserById(userId) {
        return this.call('getUserById', { userId });
    }
}

export default new UsersFunctionsClient();
