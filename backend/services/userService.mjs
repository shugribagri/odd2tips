import User from "../models/userModel.js";

class UserService {
  async createUser(email, password, name, profilePicture) {
    const user = new User({ email, password, name, profilePicture });
    await user.save();
    return user;
  }

  async findUserByEmail(email) {
    return User.findOne({ email });
  }
}

export default new UserService();
