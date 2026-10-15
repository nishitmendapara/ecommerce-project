const user = require("../model/model");
const product = require("../model/product");
const contact = require("../model/contact");
const cart = require("../model/cart");

exports.getproducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.singleproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = await product.findById(productId);
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product: productData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.searchproduct = async (req, res) => {
  try {
    const { name, category } = req.query;
    const query = {};
    if (name) { 
      query.name = { $regex: name, $options: "i" };
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    const products = await product.find(query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.contact = async (req, res) => {
  try {
    const { name, email, mobile, description, address } = req.body;
    if (!name || !email || !mobile || !description || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newContact = new contact({
      name,
      email, 
      mobile,
      description,
      address,
    });
    await newContact.save();
    res
      .status(201)
      .json({ message: "Contact added successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.addcart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
      });
    }

    if (Number(quantity) < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const productData = await product.findById(productId);

    if (!productData) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const userId = req.user.userId;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let cartData = await cart.findOne({ userId });

    if (!cartData) {
      cartData = await cart.create({
        userId: userId,
        items: [
          {
            product: productId,
            quantity: Number(quantity),
          },
        ],
      });

      return res.status(201).json({
        message: "Product added to cart successfully",
        cart: cartData,
      });
    }

    const existingProduct = cartData.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
    } else {
      cartData.items.push({
        product: productId,
        quantity: Number(quantity),
      });
    }

    await cartData.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      cart: cartData,
    });
  } catch (error) {
    console.log("ADD TO CART ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getcart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartData = await cart
      .findOne({ userId: userId })
      .populate("items.product");

    if (!cartData) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart: cartData,
    });
  } catch (error) {
    console.log("GET CART ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deletecart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const userId = req.user.userId;

    const cartData = await cart.findOne({ userId });

    if (!cartData) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const existingProduct = cartData.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cartData.items = cartData.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cartData.save();

    const updatedCart = await cart
      .findOne({ userId })
      .populate("items.product");

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.log("DELETE CART ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updatecart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
      });
    }

    if (Number(quantity) < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const userId = req.user.userId;

    const cartData = await cart.findOne({ userId });

    if (!cartData) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const existingProduct = cartData.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    existingProduct.quantity = Number(quantity);

    await cartData.save();

    const updatedCart = await cart
      .findOne({ userId })
      .populate("items.product");

    res.status(200).json({
      message: "Cart quantity updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.log("UPDATE CART ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
