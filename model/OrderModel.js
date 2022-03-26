const order = require("../schema/orderSchema");
const user = require("../schema/userSchema");
class OrderModel {
  static async addOrder(postData) {
    try {
      let response;
      const finduser = await user.findOne({ _id: postData.user_id });
      if (finduser) {
        const orderData = new order({ ...postData });
        await orderData.save();
        response = {
          code: 201,
          message: "Order created successfully. post method .",
          data: orderData,
        };
      } else {
        response = {
          code: 404,
          status: false,
          message: "User not found .",
        };
      }
      return response;
    } catch (error) {
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }

  static async getOrder(getData) {
    try {
      let response;
      const userList = await order.aggregate([
        {
          $group: {
            _id: "",
            amount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            amount: "$amount",
          },
        },
      ]);
      response = {
        code: 200,
        status: true,
        message: userList,
      };
      return response;
    } catch (error) {
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }
}
module.exports = OrderModel;
