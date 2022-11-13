import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  items: [
    {
      products: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
});

export default mongoose.model("Orders", OrderSchema);
