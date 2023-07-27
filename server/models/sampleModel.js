'use strict';

module.exports = (mongoose, Schema) => {
  const SampleSchema = new Schema({
    name: { type: String, required: true },
    pogiGyud: { type: Boolean, default: true }
  });

  return mongoose.model('Sample', SampleSchema);
};
