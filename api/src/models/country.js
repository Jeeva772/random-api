const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const countrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
    required: true,
    userSchema: userSchema
  }
});

const Country = model("Country", countrySchema);

module.exports = Country;
