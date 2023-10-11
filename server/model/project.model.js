const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData", // Reference to the User model
  },
  teamMembers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData", // Reference to the User model
      },
      role: String, // Specify the role for each team member
    },
    // ... (more team members can be added here)
  ],
  // ... (other fields)
});

const Projectlist = mongoose.model("projectlist", projectSchema);

module.exports = { Projectlist };
