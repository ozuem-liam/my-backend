const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { accountDBSchema } = require('./account.schema');

accountDBSchema.methods.isAMatchPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

accountDBSchema.statics.hashPassword = async function (password) {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

const Account = mongoose.model('Account', accountDBSchema);
module.exports = { Account };
