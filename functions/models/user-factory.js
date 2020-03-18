const UserDto = require('./user-dto');

module.exports = class UserFactory {
    constructor(config) {
        this.config = config;
    }

    async createUser() {
        const user = new UserDto(this.config);
        return user;
    }
};

