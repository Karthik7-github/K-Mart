const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    UserName: String,
    Products: [
        {
            Product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            Quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true });

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;