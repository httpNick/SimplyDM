var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID

var UserSchema = new Schema({
  displayName: String,
  identifier: String,
  steamid: String,
  avatar: String,
  clientToken: String,
  subscriber: Boolean,
  isAdmin: Boolean
})

mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')
