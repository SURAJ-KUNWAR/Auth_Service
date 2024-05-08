const UserRepository = require("../repository/UserRepository");
const jwt = require("jsonwebtoken");
const { AUTH_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

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
  async signin(email, plainPassword) {
    try {
      //1) get user by email
      const user = await this.userRepository.getByEmail(email);
      //2) compare incoming plain password with encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password doesnt match");
        throw { error: "Incorrect password" };
      }
      //3) if password match then create token and send it to user
      const newJwt = this.createToken({
        email: user.email,
        id: user.id,
      });
      return newJwt;
    } catch (err) {
      console.log("Something went wrong in sign in process");
      throw err;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw {
          err: "token not valid",
        };
      }
      console.log(response);
      const user = await this.userRepository.getById(response.id);
      console.log(user);

      if (!user) {
        throw {
          err: " user does not exist",
        };
      }
      return user.id;
    } catch (err) {
      throw err;
    }
  }
  createToken(user) {
    try {
      const result = jwt.sign(user, AUTH_KEY, { expiresIn: "1h" });
      return result;
    } catch (err) {
      console.log("Something went wrong in token creation");
      throw err;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, AUTH_KEY);
      return response;
    } catch (err) {
      console.log("something went wrong in token validation ", err);
      throw err;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (err) {
      console.log("Something went wrong in password comparision");
      throw err;
    }
  }
}
module.exports = UserService;
