const user = require("../model/model");
const product = require("../model/product");
const contact = require("../model/contact");
const cart = require("../model/cart");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// -------------------- TOKEN CONFIGURATION --------------------

const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES = "30d";

const isProduction = process.env.NODE_ENV === "production";

const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
  maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
};

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const createAccessToken = (existingUser) =>
  jwt.sign(
    {
      userId: existingUser._id.toString(),
      role: existingUser.role,
      type: "access",
    },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES },
  );

const createRefreshToken = (existingUser) =>
  jwt.sign(
    {
      userId: existingUser._id.toString(),
      type: "refresh",
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES },
  );

const clearAuthCookies = (res) => {
  res.clearCookie("token", clearCookieOptions);
  res.clearCookie("refreshToken", clearCookieOptions);
};

// -------------------- REGISTER --------------------

exports.register = async (req, res) => {
  try {
    const { name, email, password, address, gender } = req.body;

    if (!name || !email || !password || !address || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await user.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await user.create({
      name,
      email: email.toLowerCase().trim(),
      password,
      address,
      gender,
      role: "user",
      refreshTokenHash: null,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        gender: newUser.gender,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- LOGIN --------------------

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = await user.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!existingUser || existingUser.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = createAccessToken(existingUser);
    const refreshToken = createRefreshToken(existingUser);

    // Store the hash, not the raw refresh token.
    existingUser.refreshTokenHash = hashToken(refreshToken);
    await existingUser.save();

    res.cookie("token", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(200).json({
      message: "Login successful",
      role: existingUser.role,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- REFRESH TOKEN --------------------

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      clearAuthCookies(res);

      return res.status(401).json({
        message: "Refresh token missing. Please log in again.",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      clearAuthCookies(res);

      return res.status(401).json({
        message: "Refresh token expired or invalid. Please log in again.",
      });
    }

    if (decoded.type !== "refresh" || !decoded.userId) {
      clearAuthCookies(res);

      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const existingUser = await user.findById(decoded.userId);

    if (
      !existingUser ||
      !existingUser.refreshTokenHash ||
      existingUser.refreshTokenHash !== hashToken(refreshToken)
    ) {
      clearAuthCookies(res);

      return res.status(401).json({
        message: "Refresh token revoked. Please log in again.",
      });
    }

    // Create a new pair of tokens.
    const newAccessToken = createAccessToken(existingUser);
    const newRefreshToken = createRefreshToken(existingUser);

    // Rotate the refresh token.
    existingUser.refreshTokenHash = hashToken(newRefreshToken);
    await existingUser.save();

    res.cookie("token", newAccessToken, accessCookieOptions);
    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    return res.status(200).json({
      message: "Token refreshed successfully",
      role: existingUser.role,
    });
  } catch (error) {
    console.error("Refresh error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- ADD PRODUCT --------------------


exports.addproduct = async (req, res) => {
  try {
    const { name, price, description, category, rating } = req.body;

    const image = req.file ? req.file.filename : null;

    // Check required fields
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      rating === undefined ||
      rating === "" ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Convert values to numbers
    const productPrice = Number(price);
    const productRating = Number(rating);

    // Validate price
    if (!Number.isFinite(productPrice) || productPrice <= 0) {
      return res.status(400).json({
        message: "Please enter a valid price",
      });
    }

    // Validate rating
    if (
      !Number.isFinite(productRating) ||
      productRating < 1 ||
      productRating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const newProduct = await product.create({
      name,
      price: productPrice,
      description,
      category,
      image,
      rating: productRating,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- UPDATE PRODUCT --------------------

exports.updateproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const { name, price, description, category } = req.body;

    // Update only fields supplied in the request.
    if (name !== undefined) existingProduct.name = name;
    if (price !== undefined) existingProduct.price = price;
    if (description !== undefined) {
      existingProduct.description = description;
    }
    if (category !== undefined) {
      existingProduct.category = category;
    }

    if (req.file) {
      existingProduct.image = req.file.filename;
    }

    const updatedProduct = await existingProduct.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- DELETE PRODUCT --------------------

exports.deleteproduct = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Delete product error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- GET CONTACTS --------------------

exports.getcontact = async (req, res) => {
  try {
    const contacts = await contact.find();

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Get contacts error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- DELETE CONTACT --------------------

exports.deletecontact = async (req, res) => {
  try {
    const deletedContact = await contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error) {
    console.error("Delete contact error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- ALL USERS --------------------

exports.allusers = async (req, res) => {
  try {
    const users = await user
      .find({ role: "user" })
      .select("-password -refreshTokenHash");

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- ALL CARTS --------------------

exports.getallcarts = async (req, res) => {
  try {
    const carts = await cart
      .find()
      .populate("userId", "name email")
      .populate("items.product");

    return res.status(200).json({
      message: "All cart products fetched successfully",
      carts,
    });
  } catch (error) {
    console.error("Get all carts error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// -------------------- LOGOUT --------------------

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET,
        );

        if (decoded.type === "refresh" && decoded.userId) {
          const existingUser = await user.findById(decoded.userId);

          if (
            existingUser &&
            existingUser.refreshTokenHash === hashToken(refreshToken)
          ) {
            existingUser.refreshTokenHash = null;
            await existingUser.save();
          }
        }
      } catch (error) {
        // Invalid or expired refresh token: still clear browser cookies.
      }
    }

    clearAuthCookies(res);

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
