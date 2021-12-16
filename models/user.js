import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dataGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "DataGroup",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
