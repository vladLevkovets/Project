const UsersM = require("../models/UsersM");
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

class UsersCons {
  async add(req, res) {
    let { nickname, password, email } = req.body;
    if (!email || !password || !nickname){
       res.json({
        ok: false,
        message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS",
      });}
    if (!validator.isEmail(email)){
       res.json({
        ok: false,
        message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS",
      });}
    try {
      const mail = await UsersM.findOne({ email }) 
      let ex = await UsersM.findOne({ nickname });
      if (ex || mail){
        res.json({
          ok: false,
          message: `WRONG DATA PROVIDED USER OR EMAIL IS ALLREADY EXIST `,
        });}
      const hash = await argon2.hash(password);
      const here = await UsersM.create({ nickname, password: hash, email });
      const token = jwt.sign({email}, jwt_secret, { expiresIn: "7d" });
      res.json({ ok: true, token, nickname, message: "ALL RIGHT" });
      
    } catch (error) {
      res.json({ error });
    }
  }

  async login(req, res) {
    const { nickname, password } = req.body;
    if (!nickname || !password){
      res.send({ ok: false, message: "All field are required" });
    }
    try {
      const user = await UsersM.findOne({ nickname });
      if (!user) {
       return res.send({ ok: false, message: "invalid data provided" });
      }
      const match = await argon2.verify(user.password, password);
      if (match) {
        // once user is verified and confirmed we send back the token to keep in localStorage in the client and in this token we can add some data -- payload -- to retrieve from the token in the client and see, for example, which user is logged in exactly. The payload would be the first argument in .sign() method. In the following example we are sending an object with key userEmail and the value of email coming from the "user" found in line 47
        const token = jwt.sign({nickname,email:user.email,status:user.status}, jwt_secret, { expiresIn: "7d" }); //{expiresIn:'365d'}
        // after we send the payload to the client you can see how to get it in the client's Login component inside handleSubmit function
       return res.json({ ok: true, message: "welcome back", token, nickname });
      } else {
       return res.send({ ok: false, message: "invalid data provided" });
      }
    }
     catch (error) {
      res.send({ ok: false, error });
    }
  }

  async verify_token(req, res) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    jwt.verify(token, jwt_secret, (err, succ) => {
        console.log(token, jwt_secret)
      err
        ? res.json({ ok: false, message: "something went wrong" })
        : res.json({ ok: true, succ });
    });
  }

  async findOne(req, res) {
    console.log(req.params);
    try {
      console.log(req.params.nickname);
      const user = await UsersM.findOne(req.params);
      res.json(user);
    } catch (error) {
      res.json({ error });
    }
  }

  async update(req, res) {
    let {password,nickname,email,Bdate,country,city,slogan}=req.body
    try{
     let man=await UsersM.findOne(_id)
     let id=man._id
     const match = await argon2.verify(man.password, password)
      if (match){
        const improove = await UsersM.updateOne(
        {id}, {password,nickname,email,Bdate,country,city,slogan}
        );
      }
    }
    catch(error){
      res.send({error});
     }
  }
   

  async delete (req, res){
    let {email,nickname,password} = req.body;
    console.log(req.body)
    try{
        let man=await UsersM.findOne({email})
        console.log(man)
        const match = await argon2.verify(man.password, password)
        console.log(match)
      if (match){
        const removed = await UsersM.deleteOne({email});
        console.log({nickname});
        res.send({ok:true,message:`Good buy, ${nickname}!  We'll remember you!`});
        }
        
    } 
    catch(error){
        res.send({error});
    };
}









}
module.exports = new UsersCons();
