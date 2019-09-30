const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const { Schema, model } = require('mongoose');

// promisify
const bcSalt = Promise.promisify(bcrypt.genSalt, bcrypt);
const bcHash = Promise.promisify(bcrypt.hash, bcrypt);
const bcComp = Promise.promisify(bcrypt.compare, bcrypt);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: ['10', 'Username should be less than 10 characters'],
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  },
);

// eslint-disable-next-line func-names
UserSchema.methods.checkPassword = function (password) {
  return bcComp(password, this.password);
};

// Before Saving hash the password with bcrypt, using the default 10 rounds for salt
UserSchema.pre('save', function (next) {
  if (this.password !== '' && this.isModified('password')) {
    bcSalt(10)
      .then((salt) => bcHash(this.password, salt))
      .then((hashed) => {
        this.password = hashed;
        next();
      })
      .catch((e) => { console.log(e); });
  } else {
    next();
  }
});

const User = model('User', UserSchema);

module.exports = { User };
