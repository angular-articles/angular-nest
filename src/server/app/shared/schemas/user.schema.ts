import * as mongoose from 'mongoose';

export const CreateUserSchema = new mongoose.Schema({
    firstName: mongoose.Schema.Types.String,
    lastName: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
}, {
    versionKey: false
});
