const OrderModel = require("../model/OrderModel");
class OrderController {
  static addOrder(req, res) {
    const postData = req.body;
    OrderModel.addOrder(postData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) => res.status(err.code).json(err));
  }

  static getOrder(req, res) {
    const getData = req.query;
    OrderModel.getOrder(getData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) => res.status(err.code).json(err));
  }
}
module.exports = OrderController;
