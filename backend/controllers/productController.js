const Product=require("../models/Product")

exports.addProduct=async(req,res)=>{
    const product=await Product.create(req.body)//frontend mdhun data add kelyvr db mdeh store hoto
    res.json(product)
}

exports.getProducts=async(req,res)=>{
    const products=await Product.find();//find product fetch krto sgle
    res.json(products)

}

exports.deleteProduct=async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id)//product id ne product find hoto 
    res.json("Product deleted")
}

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
