const UserModel = require("../model/UserModel");
class UserController {
  static createUser(req, res) {
    const postData = req.body;
    UserModel.createUser(postData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) => res.status(err.code).json(err));
  }

  static listUser(req, res) {
    const getData = req.query;
    UserModel.listUser(getData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) => res.status(err.code).json(err));
  }

  static userRating(req, res) {
    const updateData = req.body;
    UserModel.userRating(updateData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) => res.status(err.code).json(err));
  }
}
module.exports = UserController;
