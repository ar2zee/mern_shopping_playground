const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   date: {
       type: Date,
       default: new Date().toISOString()
   }
});

module.exports = mongoose.model('Item', ItemSchema)