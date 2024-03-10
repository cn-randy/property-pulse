import { model, models, Schema } from "mongoose";

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter a name for this property."],
    },
    type: {
      type: String,
      enum: ["apartment", "chalet", "condo", "cottage", "house"],
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: [true, " Please enter the number of beds"],
    },
    baths: {
      type: Number,
      required: [true, " Please enter the number of bathrooms"],
    },
    square_feet: {
      type: Number,
      required: [true, " Please enter the square footage"],
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [{ type: String }],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Property = models.Property || model("Property", propertySchema);

export default Property;
