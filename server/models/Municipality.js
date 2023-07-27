`use strict`;
// municipality model
module.exports = (mongoose, Schema) => {
  const MunicipalitySchema = new Schema({
    province_id: {
      type: String,
      ref: 'Provinces'
    },
    name: String,
    _id: String
  });

  return mongoose.model('Municipalities', MunicipalitySchema);
};
