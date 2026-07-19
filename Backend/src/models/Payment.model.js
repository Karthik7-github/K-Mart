const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  UserName: String,
  Payments: [
    {
      Receipt: [
        {
          Product: Object, // or better → ref
          Quantity: Number
        }
      ],
      TotalAmount: Number,
      Date: Date
    }
  ]
}, { timestamps: true });

const PaymentModel = new mongoose.model("payment",PaymentSchema);

module.exports = PaymentModel;