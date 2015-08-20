var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID

var ServerSchema = new Schema({
  hostname: String,
  location: String,
  ip: String,
  port: Number,
  map: String,
  players: Number
})

mongoose.model('Server', ServerSchema)

module.exports = mongoose.model('Server')
