import mongoose from 'mongoose';
import validator from 'validator';

const appointmentSchema = new mongoose.Schema({
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
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    }

})

export const Appointment = mongoose.model('Appointment', appointmentSchema);