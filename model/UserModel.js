const user = require("../schema/userSchema");
const { ObjectId } = require("mongoose").Types;

class UserModel {
  static async createUser(postData) {
    try {
      const userData = new user({ ...postData });
      await userData.save();
      return {
        code: 201,
        message: "User created successfully. post method .",
        data: userData,
      };
    } catch (error) {
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }

  static async listUser(getData) {
    try {
      let response;
      let checking = [];
      const pagination = {
        skip: 0,
        limit: 10,
      };

      if (getData.limit) {
        pagination.limit = Number(getData.limit);
        if (getData.page) {
          const skip = getData.limit * (getData.page - 1);
          pagination.skip = Number(skip);
          pagination.page = Number(getData.page);
        }
      }
      if (getData.search) {
        checking.push({
          $match: {
            user_name: new RegExp(getData.search, "i"),
          },
        });
      } else if (getData.rating) {
        checking.push({
          $match: {
            rating: {
              $elemMatch: { ratings: getData.rating },
            },
          },
        });
      } else {
        checking.push({
          $match: {},
        });
      }
      checking.push({ $sort: { _id: -1 } });

      const totalLength = await user.aggregate(checking);

      pagination.totalRecord = totalLength.length;

      checking.push({
        $skip: pagination.skip,
      });

      checking.push({
        $limit: pagination.limit,
      });

      const userList = await user.aggregate(checking);
      response = {
        code: 200,
        message: "User list successfully. get method .",
        data: userList,
      };
      response.pagination = pagination;
      return response;
    } catch (error) {
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }

  static async userRating(updateData) {
    try {
      let response;
      const findUser = await user.findOne({ _id: updateData.user_id });
      if (findUser) {
        const userRating = await user.findOneAndUpdate(
          {
            _id: updateData.user_id,
          },

          {
            updated_at: new Date().getTime(),
            $push: {
              rating: {
                ...updateData,
              },
            },
          }
        );

        response = {
          code: 200,
          message: "User rating successfully.",
          data: userRating,
        };
      } else {
        response = {
          code: 404,
          message: "User not found .",
          status: false,
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
}
module.exports = UserModel;
