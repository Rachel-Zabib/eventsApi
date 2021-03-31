const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
let connectMongo=require("../config/databaseMongo")

const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
  firstName:String,
  LastName:String,
  age:{
    type:Number,
    min:[0,"age must be positive"],
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  }
 
});
PeopleSchema.plugin(aggregatePaginate);

const PeopleModel = mongoose.model('peoples', PeopleSchema);

module.exports = PeopleModel;