import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import { Appointment } from "../models/appointmentSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address
    } = req.body || {};

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }

    const isConflict = await User.find({role: "Doctor", firstName: doctor_firstName, lastName: doctor_lastName, doctorDepartment: department});

    if(isConflict.length === 0){
        return next(new ErrorHandler("No such doctor available", 404));
    }
    if(isConflict > 1){
        return next(new ErrorHandler("Doctors Conflict! please contact through Email or Phone", 409));
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId
    })

    res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        appointment,
    })
});


export const getAllAppointments = catchAsyncErrors(async(req, res, next)=>{
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        appointments,
    })
})


export const updateAppointmentStatus = catchAsyncErrors(async(req, res, next)=>{
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next (new ErrorHandler("Appointment not found", 404))
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        appointment,
    })
})

export const deleteAppointment = catchAsyncErrors(async(req, res, next)=>{
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next (new ErrorHandler("Appointment not found", 404))
    }
    await Appointment.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
    })
})