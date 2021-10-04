var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
  },
});

// NOTE(numank): This aproach might not work on update.
// Further testing required.

userSchema.pre("save", function (next) {
  try {
    const user = this;
    if (user.password.length < 8) {
      return next("insecure_password");
    }
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

userSchema.pre("findOneAndUpdate", function (next) {
  const query = this;
  const update = query.getUpdate();
  if (update.password) {
    if (update.password.length < 8) {
      return next("insecure_password");
    }
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(update.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          query.setUpdate({ $set: { password: hash } });
          next();
        });
      }
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
