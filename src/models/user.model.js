import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


//mongoose ka pre hook data save hone se just phle run hota hai

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //makes the searching easy
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true, //makes the searching easy
    },

    avatar: {
      type: String, //cloudinary url (thirdparty)
      required: true,
    },

    coverImage: {
      type: String,
    },

    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); //agar password modify nhi hua toh seedha next middleware pe chle jao

    this.password = bcrypt.hash(this.password,10)
    next()
})//save is an event, this means jb bhi data save ho rha ho us se phle i want to peform some task
//async function is used as the algorithm to perform encryption takes time

userSchema.methods.isPasswordCorrect = async function(password){
      return await bcrypt.compare(password,this.password) //this.password aata hai database se and password user daalega, bcrypt inko compare krke bta dega ki match hua ya nhi
}

//jwt ek bearer's token hai, matlab ye token jiske bhi pass hai hum usko data bhej dete hai and it is pretty strong in security

//do important jwt tokens
userSchema.methods.generateAccessToken = function() {
    jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {
            _id: this._id,
           //refresh token has less information in comparison to that of access token
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
