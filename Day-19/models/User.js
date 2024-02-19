const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, 
                required: true,
                unique: true
            },
                email: {
                    type: String,
                    required: true,
                    lowercase: true,
                    unique: true,
                    validate: {
                        validator: function(v) {
                            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                        },
                        message: props => `${props.value} is invalid-email`
                    }
                }
});

const User = mongoose.model('User', userSchema);
module.exports = User;