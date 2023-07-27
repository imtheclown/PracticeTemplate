`use strict`;
// barangay model
module.exports = (mongoose, Schema) => {
  const BarangaySchema = new Schema({
    province_id: {
      type: String,
      ref: 'Provinces'
    },
    municipality_id: {
      type: String,
      ref: 'Municipalities'
    },
    name: String,
    _id: String
  });

  return mongoose.model('Barangay', BarangaySchema);
};
