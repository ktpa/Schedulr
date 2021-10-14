const users = require("../models/users.js");

module.exports = initAdmin = async () => {
  await users.findOne({ username: "admin" }, function (err, adminUser) {
    if (err) {
      console.log(err);
    }
    if (adminUser === null) {
      const admin = new users({
        name: "admin",
        username: "admin",
        password: "password",
        email: "admin@schedulrdomain",
      });
      admin.save().then(() => console.log("Admin user created!"));
    }
  });
};
