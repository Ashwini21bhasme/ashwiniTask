const UserController = require("../controller/UserController");
const OrderController = require("../controller/OrderController");
module.exports = (app) => {
  app.post("/add-user", UserController.createUser);
  app.get("/get-user", UserController.listUser);
  app.put("/rating-user", UserController.userRating);

  //order
  app.post("/add-order", OrderController.addOrder);
  app.get("/get-order", OrderController.getOrder);
};
