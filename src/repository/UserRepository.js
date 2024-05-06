const { User } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      console.log(err);
      console.log("Something went wrong in repo layer");
      throw err;
    }
  }

  async delete(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
    } catch (err) {
      console.log("Something went wrong in repo layer");
      throw err;
    }
  }
}

module.exports = UserRepository;
