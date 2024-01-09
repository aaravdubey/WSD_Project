import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  likedVideoList: {type: Object, default: []},
  dislikedVideoList: {type: Object, default: []},
  savedLists: {type: Object, default: {"watch later": []}}
});

const User = mongoose.model('User', userSchema);

export default User;