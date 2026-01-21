import mongoose from 'mongoose';


export const dbConnection = async () => {
await mongoose.connect(process.env.MONGO_URL, {
    dbName: 'MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM',
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error(`some error occurred while connecting to MongoDB: ${err}`);
});
};