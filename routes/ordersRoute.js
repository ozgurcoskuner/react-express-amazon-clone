const express = require("express");
const router = express.Router();
const Orders = require("../model/Orders");
const Products = require("../model/Products");
const admin = require("../firebase-admin/firebase-admin");

router.get("/:userId/:idToken", async (req, res) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(req.params.idToken);
    const uid = decodedToken.uid;
    if(uid === req.params.userId){
    const order = await Orders.find({ userId: req.params.userId });

    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
    res.json(order);
  }else{
    res.status(401).json({message: 'unauthorized'})
  }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id/:userId/:idToken", async (req, res) => {
  try{
  const decodedToken = await admin.auth().verifyIdToken(req.params.idToken);
  const uid = decodedToken.uid;
  if(uid === req.params.userId){
    try {
      await Orders.deleteOne({ productId: req.params.id });
      res.json({ message: "order is deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else{
    res.status(401).json({message: 'unauthorized'})
  }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//delete all orders for spesific user
//it is just a replica of succesfull payment of a order
router.delete("/:userId/:idToken", async (req, res) => {
  try{
  const decodedToken = await admin.auth().verifyIdToken(req.params.idToken);
  const uid = decodedToken.uid;
  if(uid === req.params.userId){
    try {
      await Orders.deleteMany({ userId: req.params.userId });
      res.json({ message: "payment is succesfull" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else{
    res.status(401).json({message: 'unauthorized'})
  }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(req.body.idToken);
    const uid = decodedToken.uid;
    
    if (req.body.userId === uid) {
      const product = await Products.findById(req.body.productId);

      if (product) {
        const createdOrder = new Orders({
          userId: req.body.userId,
          productId: req.body.productId,
        });

        const newOrder = await createdOrder.save();
        res.status(201).json(newOrder);
      } else {
        res.status(400).json({ message: "product not exist" });
      }
    }
    else{
      res.status(401).json({message: 'unauthorized'})
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
