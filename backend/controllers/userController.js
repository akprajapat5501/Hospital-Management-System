import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role} = req.body || {};

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role) {
        return next(new ErrorHandler('Please Fill Full Form', 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new ErrorHandler('User Already Exists', 400));
    }
    const user = await User.create({
        firstName, lastName, email, phone, nic, dob, gender, password, role
    });
    generateToken(user, "Registered Successfully", 201, res);
});


export const Login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body || {};
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password & Confirm Password Doesn't Match", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password and Email", 400))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password and Email", 400))
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role does not exist", 400))
    }

    generateToken(user, "Login Successful!", 200, res);

})


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body || {};

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return next(new ErrorHandler('Please Fill Full Form', 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists`, 400));
    }

    const admin = await User.create({ firstName, lastName, email, phone, nic, dob, gender, password, role: 'Admin' });

    res.status(201).json({
        success: "true",
        message: "New Admin Added Successfully",
        admin
    })
})


export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: 'Doctor' })

    res.status(200).json({
        success: true,
        message: "Doctors fetched successfully",
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const users = req.user;

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users
    })
})


export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Admin Logged Out Successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Patient Logged Out Successfully",
    });
});


export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar is required", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format is not supported", 400));
    }
    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment){
        return next(new ErrorHandler("Please provide full details", 400));
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400)) 
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

    if(!cloudinaryResponse){
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role:"Doctor",
        doctorDepartment,
        docAvatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    })
    res.status(201).json({
        success: true,
        message: "New Doctor Registered Successfully",
        doctor
    })
})