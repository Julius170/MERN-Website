import mongoose from 'mongoose';

const userSchema = new mongoose.Schema (
    {
        name: {type:String, reqired:true, },
        email: {type:String, reqired:true, unique: true },
        password: {type:String, reqired:true, unique: true },
        isAdmin: {type:String, default: false },
        
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User; 
