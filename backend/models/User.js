
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
