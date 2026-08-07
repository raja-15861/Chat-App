const jwt=require('jsonwebtoken');

exports.generateToken=(userId,res)=>{
    const token= jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token,{
        maxAge:7*24*60*60*1000, //MS
        httpOnly:true, //prevent XSS attacks cross site scripting attack
        // Production (Vercel frontend -> Render backend) is cross-site, so SameSite must be "none"
        // and secure:true for the browser to send the cookie on AJAX requests.
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production"


    })
    return token;
}
