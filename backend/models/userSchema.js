import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First name must be at least 3 characters'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'First name must be at least 3 characters'],
    },
    email: {
        type: String,
        required: true,
        validator: [validator.isEmail, 'Please enter a valid email'],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, 'Phone Number Must Contain Exact 10 Digits!'],
        maxLength: [10, 'Phone Number Must Contain Exact 10 Digits!'],
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, 'NIC Must Contain Exact 13 Digits!'],
        maxLength: [13, 'NIC Must Contain Exact 13 Digits!'],
    },
    dob: {
        type: Date,
        required: [true, 'Date of Birth is required'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Patient', 'Doctor'],
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password  = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
}

export const User = mongoose.model('User', userSchema);