const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    UserName: String,
    Payments: [
        {
            Cart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "cart"
            },
            Amount:Number
        }
    ],
},{ timestamps: true });

const PaymentModel = new mongoose.model("payment",PaymentSchema);

module.exports = PaymentModel;