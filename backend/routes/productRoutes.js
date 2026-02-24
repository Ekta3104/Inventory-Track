const express=require("express")

const {addProduct,getProducts,deleteProduct,updateProduct}=require("../controllers/productController")

const auth=require("../middleware/authMiddleware")//user login,token valid,if valid then access this all check authmiddlware
const admin=require("../middleware/adminMiddleware")
const router=express.Router()

router.post("/",auth,addProduct) //post api,if user authenticate he can add product and product wiill sav ein DB //login user
router.get("/",auth,getProducts)//login user can see produch
router.delete("/:id",auth,admin,deleteProduct)//product id will be deleted //login+admin
router.put("/:id", auth, updateProduct)
module.exports=router
//Frontend / Postman request पाठवतो

//Router ला request मिळते

//authMiddleware user login आहे का ते check करतो

//Valid असेल → controller function चालतो

//Response परत client ला जातो