const jwt = require("jsonwebtoken");
module.exports = async(req,res,next)=>{
    const authHeaders = req.headers.authorization;
    if(!authHeaders){
            return res.status(400).json({
            status :0,
            message :"Tdak Ada token"
        })
    }
    jwt.verify(authHeaders, "YOK BISA YOK S.KOM", (err, decoded)=>{
        if(err){
            return res.status(400).json({
            status :0,
            message :"Token Invalid",
            error : err.message
        })
    }
    req.id = decoded
    next();
    });
};