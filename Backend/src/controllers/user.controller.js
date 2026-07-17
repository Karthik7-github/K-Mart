const UserModel = require('../models/User.model');
const ProductModel = require('../models/Products.model');
const CartModel = require('../models/Cart.model');
const PaymentModel = require('../models/Payment.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookieparser');


async function RegisterUser(req, res) {
    try {
        const { UserName, MobileNo, Password } = req.body;

        if (!UserName || !MobileNo || !Password) {
            return res.status(400).json({
                Message: "All fields are required"
            });
        }

        const Usermobile = await UserModel.findOne({ MobileNo });
        const Username = await UserModel.findOne({ UserName });

        if (Username) {
            return res.status(409).json({
                Message: "Username Already Exists"
            });
        } else if (Usermobile) {
            return res.status(409).json({
                Message: "Mobile No Already Exists"
            });
        }

        const hash = await bcrypt.hash(Password, 10);

        const User = await UserModel.create({
            UserName,
            MobileNo,
            Password: hash
        });

        const token = jwt.sign(
            { id: User._id },
            process.env.JWT_SECRET_KEY
        );

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(201).json({
            Message: "User Created Successfully",
            User: User
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Message: "Server Error"
        });
    }
}

async function GetUsers(req, res) {
    const User = await UserModel.find();

    res.status(200).json({
        Message: "Fetched all Users ....",
        User: User
    })
}

async function Login(req, res) {

    try {
        const { UserName, Password } = req.body;

        const User = await UserModel.findOne({ UserName });

        if (!User) {
            return res.status(200).json({
                Message: "User Not Exists"
            })
        }

        const Pwd = await bcrypt.compare(Password, User.Password);

        if (!Pwd) {
            return res.status(404).json({
                Message: "Invalid Credentials"
            })
        }

        res.status(200).json({
            Message: "Logedin Succesfully",
            User: User
        })

    } catch (error) {
        console.log(error);
    }

}

async function CreateProduct(req, res) {

    const { ProductName, ProductID, ProductDesc, ProductCost, ProductType, ProductPic } = req.body;

    const Product = await ProductModel.create({
        ProductName, ProductID, ProductDesc, ProductCost, ProductType, ProductPic
    });

    res.status(201).json({
        Message: "Product Created",
        Product: Product
    })
}

async function GetProducts(req, res) {
    const Product = await ProductModel.find();

    res.status(200).json({
        Message: "Fetching all Products...",
        Products: Product
    })
}

async function CreateCart(req, res) {
    const { UserName, Products } = req.body;

    const Cart = await CartModel.create({
        UserName, Products
    });

    res.status(201).json({
        Message: "Cart Created",
        Cart: Cart
    })
}

async function UpdateCart(req, res) {
    try {
        const userId = req.params.id;
        const { Product, Quantity } = req.body;

        const cart = await CartModel.findOne({ UserName: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const existingProduct = cart.Products.find(
            (item) =>
                item.Product && item.Product.toString() === Product
        );

        if (existingProduct) {
            existingProduct.Quantity += Quantity || 1;
        } else {
            cart.Products.push({
                Product: Product,
                Quantity: Quantity || 1
            });
        }

        await cart.save();

        res.status(200).json({
            Message: "Cart updated successfully",
            Cart: cart
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

async function DeleteFromCart(req, res) {
  try {
    const userId = req.params.id;
    const { Product } = req.body;

    const cart = await CartModel.findOne({ UserName: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.Products = cart.Products.filter(
      (item) => item.Product.toString() !== Product
    );

    await cart.save();

    res.status(200).json({
      Message: "Product removed from cart",
      Cart: cart
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

async function GetCart(req,res) {
    const {id} = req.params;

    const Cart = await CartModel.find({UserName : id}).populate("Products.Product");;

    res.status(200).json({
        Message: `${id} Cart Products`,
        Cart : Cart
    })
}

async function CreatePayemtBox(req, res) {
    const { UserName, Payments } = req.body;

    const Payment = await PaymentModel.create({
        UserName, Payments
    });

    res.status(201).json({
        Message: "Created Payment Box",
        Payment: Payment
    })
}

module.exports = { RegisterUser, GetUsers, Login, CreateProduct, GetProducts, CreateCart, UpdateCart, CreatePayemtBox ,
    GetCart, DeleteFromCart
};