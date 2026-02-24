const express=require ("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")

dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongodb connected")).catch((err)=>console.log(err))


app.use("/api/auth",require("./routes/authRoutes"))//mhnje sglya req /api/auth ashya authroutes kd jatil
app.use("/api/products",require("./routes/productRoutes"))
app.use("/api/sales",require("./routes/saleRoutes"))
app.listen(5000,()=>{
    console.log("server running on port 5000")
})

