const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  studentId: {
    type: String
  },
  studentName: {
    type: String
  },
  email: {
    type: String
  },
  class: {
    type: String
  },
  enrollementYear: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  }
  
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
