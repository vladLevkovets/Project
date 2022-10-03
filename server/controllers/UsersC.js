const UsersM = require("../models/UsersM");
const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});



class UsersCons {
  async add(req, res) {
    let {password, email,nickname,country,city,slogan} = req.body;
    if (!email || !password || !nickname){
      return res.json({
        ok: false,
        message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS",
      });}
    if (!validator.isEmail(email)){
      return res.json({
        ok: false,
        message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS",
      });}
    try {
      const user = await UsersM.findOne({ email }) 
      let ex = await UsersM.findOne({ nickname });
      if (ex || user){
       return res.json({
          ok: false,
          message: `WRONG DATA PROVIDED USER OR EMAIL IS ALLREADY EXIST `,
        })
      }else{
        const any=await UsersM.find()
        console.log(any)
       let status ="" 
      any.length===0 ? status="admin": status="user" 
      console.log(status)  
      const hash = await argon2.hash(password);
      const here = await UsersM.create({ nickname, password: hash, email,status});
      console.log(here,here._id.toString())
      const token = jwt.sign({email,nickname,_id:here._id,status}, jwt_secret, { expiresIn: "7d" });
      console.log(token)
      
      res.json({ ok: true, token,here, message: "ALL RIGHT" })
    }
      
    } catch (error) {
     return res.json({ error });
    }
  }

  async login(req, res) {
    const { nickname, password } = req.body;
    if (!nickname || !password){
     return res.send({ ok: false, message: "All field are required" });
    }
    try {
      const user = await UsersM.findOne({ nickname });
      console.log(user)
      if (!user) {
       return res.send({ ok: false, message: "invalid data provided" });
      }
      const match = await argon2.verify(user.password, password);
      console.log(match)
      if (match) {
        // once user is verified and confirmed we send back the token to keep in localStorage in the client and in this token we can add some data -- payload -- to retrieve from the token in the client and see, for example, which user is logged in exactly. The payload would be the first argument in .sign() method. In the following example we are sending an object with key userEmail and the value of email coming from the "user" found in line 47
        const token = jwt.sign({nickname,email:user.email,status:user.status,_id:user._id,Bdate:user.Bdate,country:user.country,slogan:user.slogan,city:user.city}, jwt_secret, { expiresIn: "7d" }); //{expiresIn:'365d'}
        // after we send the payload to the client you can see how to get it in the client's Login component inside handleSubmit function
       return res.json({ ok: true, message: "welcome back", token, nickname });
      } else {
       return res.send({ ok: false, message: "invalid data provided" });
      }
    }
     catch (error) {
     return res.send({ ok: false, error });
    }
  }

  async verify_token(req, res) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    const email=jwt.decode(token).email
    try{
    const present= await  UsersM.findOne({email})
    if (present) {
       jwt.verify(token, jwt_secret, (err, succ) => {
        console.log(token, jwt_secret)
      err
        ? res.json({ ok: false, message: "something went wrong" })
        : res.json({ ok: true, succ });
    })
  }else{
    res.json({ ok: false, message: "something went wrong" })}
  }catch (error) {
    res.json({ error });
  }
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
    let {_id,password,nickname,email,Bdate,country,city,slogan}=req.body
    console.log(password)
    try{
     const man = await UsersM.findOne({_id})
     console.log(man)
     const match = await argon2.verify(man.password, password)
     console.log(match)
     const some=await UsersM.findOne({email}) 
     console.log(some)
     const oneMore=await UsersM.findOne({nickname})
     console.log(oneMore)
      if (some!==null && some._id.toString()!==man._id.toString()){
        return res.send({ok:false,type:"email"})
      }
      if (oneMore!==null && oneMore._id.toString()!==man._id.toString()){
        return res.send({ok:false,type:"nick"})
      }
      if (!match){
        return res.json({ok:false,message:"wrong password"})
      }
      if (match ){
        const improove = await UsersM.updateOne(
        {_id}, {nickname,email,Bdate,country,city,slogan,}
        );
        console.log({_id,email,nickname,Bdate,country,slogan,city})
        const token = jwt.sign({_id,email,nickname,Bdate,country,slogan,city}, jwt_secret, { expiresIn: "7d" });
        
       return res.json({ ok: true, token,nickname,email,Bdate,country,slogan,city});
      }

    }
    catch(error){
      res.send({error});
     }
  }
   
async passwords(req,res){
    let {_id,password,newPassword1,newPassword2,nickname,email,Bdate,country,city,slogan}=req.body
    console.log(password)
    try{
     const man = await UsersM.findOne({_id})
     console.log(man)
     const match = await argon2.verify(man.password, password)
     console.log(match)
      if (!password || !newPassword1 || !newPassword2)
        return res.json({ok:false,message:"All fields required"})
      if (newPassword1!==newPassword2) 
        return res.json({ok:false,message:"Password's not matched"}) 
      if (!match)
         return res.json({ok:false,message:"Wrong password"})
      if (match ){
        const hash = await argon2.hash(newPassword2)
        const improove = await UsersM.updateOne(
        {_id}, {password:hash});
        console.log({improove})
        const token = jwt.sign({_id,password,email,nickname,Bdate,country,slogan,city}, jwt_secret, { expiresIn: "7d" })
        return res.json({ ok: true,message: 'password succesfully chenged'});
      }

    }
    catch(error){
      res.send({error});
     }
}

async mail  (req, res) {
  console.log(req.body)
  const { email,nickname, subject, message } = req.body;
    try{
      for (let i=0;i<=email.length-1;i++){
       
       const mailOptions = {
         to: email[i],
         subject: subject,
         html: '<p>' + (`Hello, ${nickname[i]}`) + '</p><p><pre>' + message + '</pre></p>'
       }
         const success = await transport.sendMail(mailOptions);
         console.log("success: ", success)
        }
         return res.json({ ok: true, message: 'emails sent' });
      }
    catch (err) {
    console.log(err)
    return res.json({ ok: false, message: err });
  }
}



  async delete (req, res){
    let {_id,newPassword2} = req.body;
    console.log(req.body)
    try{
        let man=await UsersM.findOne({_id})
        console.log(man)
        const match = await argon2.verify(man.password, newPassword2)
        console.log(match)
      if (match){
        const removed = await UsersM.deleteOne({_id});
        res.send({ok:true});
        }else if (!match){
          res.send({ok:false,message:"WRONG PASSWORD"})
        }
        
    } 
    catch(error){
        res.send({error});
    };
}









}
module.exports = new UsersCons();
