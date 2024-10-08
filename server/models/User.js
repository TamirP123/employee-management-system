const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');

const userSchema =  new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String, 
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(dateTime){
        return dayjs(dateTime).format("h:mm A MM/DD/YYYY")
    },
},
clockedIn: {
  type: Boolean,
  default: false
},
clockedInTime: { 
  type: Date 
},
profilePicture: {
  type: String,
  default: '',
},
  
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;