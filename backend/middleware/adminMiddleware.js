module.exports=(req,res,next)=>{ //req.user.role check krta
    console.log("ADMIN CHECK:", req.user.role);
    
    if(req.user.role!=="admin"){ //admin nsel tr acces denied

        return res.status(403).json({ message: "Only admin allowed" })
    }
    next();
}