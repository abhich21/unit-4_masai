const express = require("express");

const Product = require("../models/product.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const post = await Product.create(req.body);

    return res.send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const posts = await Product
  .find().lean().exec();

    return res.send(posts);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
