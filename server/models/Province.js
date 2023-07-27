`use strict`;
// province model
module.exports = (mongoose, Schema) => {
  const ProvinceSchema = new Schema({
    name: String,
    _id: String
  });

  return mongoose.model('Provinces', ProvinceSchema);
};
