const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  serial: {
    type: Number,

    unique: true,
  },
  bbc: {
    type: String,
  },
  name: {
    type: String,
  },
  fname: {
    type: String,
  },
  address: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  joining: {
    type: String,
  },
  enroll: {
    type: String,
  },
  remark: {
    type: String,
  },
});

// Pre-save hook to auto-generate serial number
userProfileSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next(); // Only generate a serial number for new documents
  }

  try {
    const lastUserProfile = await UserProfile.findOne(
      {},
      {},
      { sort: { serial: -1 } }
    );

    if (lastUserProfile) {
      this.serial = lastUserProfile.serial + 1;
    } else {
      this.serial = 1; // If no existing documents, start with 1
    }

    next();
  } catch (error) {
    next(error);
  }
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
