const mongoose = require('mongoose');

const userLogonSessionScheme = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  logDate: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('LogonSession', userLogonSessionScheme,'LogonSession');
// export default LogonSession