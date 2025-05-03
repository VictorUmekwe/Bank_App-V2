import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["local", "international"],
      required: true,
    },
    recipientBank: {
      type: String,
      required: function () {
        return this.type === "international";
      },
    },
    recipientAccountNumber: {
      type: String,
      required: true,
    },
    iban: {
      type: String,
      required: function () {
        return this.type === "international";
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);
