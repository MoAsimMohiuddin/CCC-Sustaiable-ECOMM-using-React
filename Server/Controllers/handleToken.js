const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const handleToken=(req, res)=>{
    jwt.verify(
        req.body.jwt,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) {
                console.log("err ", err);
                res.sendStatus(403);
            }

            res.sendStatus(200);
        }
    );
};

module.exports=handleToken;