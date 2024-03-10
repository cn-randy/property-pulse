import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists. Please choose another one."],
      required: [true, "Please enter your email address."],
    },
    username: {
      type: String,
      required: [true, "Please enter your username."],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true },
);

const User = models.User || model("User", userSchema);
export default User;
