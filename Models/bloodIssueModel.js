const mongoose = require('mongoose')

const bloodIssueSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bloodRequest',
    },
    blood_component: {
      plasma: {
        type: String,
        default: null,
      },
      platelet: {
        type: String,
        default: null,
      },
      rbc: {
        type: String,
        default: null,
      },
      wb: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('bloodIssue', bloodIssueSchema,"bloodIssue")
// export default BloodIssueModel