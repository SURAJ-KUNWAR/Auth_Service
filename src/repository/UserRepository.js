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

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (err) {
      console.log("Something went wrong in repo layer");
      throw err;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (err) {
      console.log("something went wrong in service layer for getting an email");
    }
  }
}

module.exports = UserRepository;
