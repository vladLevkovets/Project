const UsersM = require('../models/UsersM');
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

class UsersCons {

    async add (req, res) {
    let { nickname,password,email } = req.body;
    if (!email || !password || !nickname)
        return res.json({ ok: false, message: "All fields required" });
    if (!validator.isEmail(email))
         return res.json({ ok: false, message: "Invalid credentials" });
    try{
        let ex=await UsersM.findOne({nickname})
        console.log(ex)
        if (ex) return res.json({ok:false,nickname} )
        console.log(nickname,password);
        const hash = await argon2.hash(password)
        const here = await UsersM.create({nickname,password:hash,email});
        res.json({ok:true,nickname})
    }
        catch(error){
           
            res.json({error})
        }
    };
    

    async findOne(req,res){
        console.log(req.params)
        try{
            console.log(req.params.nickname)
            const user = await UsersM.findOne(req.params);
            res.json(user)
        }
         catch(error){
            res.json({error})
         }
       }

    async update (req,res){
       
    }   




















};
module.exports= new UsersCons();  