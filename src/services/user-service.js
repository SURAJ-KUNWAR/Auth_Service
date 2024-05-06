const UserRepository = require("../repository/UserRepository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (err) {
      console.log("Something went wrong in service layer ");
      throw err;
    }
  }
}
module.exports = UserService;
