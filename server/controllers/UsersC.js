const UsersM = require('../models/UsersM');
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

class UsersCons {

    async add (req, res) {
    let { nickname,password,email } = req.body;
    if (!email || !password || !nickname)
        return res.json({ ok: false, message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS" });
    if (!validator.isEmail(email))
         return res.json({ ok: false, message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS" });
    try{
        let ex=await UsersM.findOne({nickname})
        console.log(ex)
        if (ex)  res.json({ok:false,message: `WRONG DATA PROVIDED USER ${nickname} IS ALLREADY EXIST CHANGE NICKNAME`} )
        console.log(nickname,password);
        const hash = await argon2.hash(password)
        const here = await UsersM.create({nickname,password:hash,email});
        res.json({ok:true,message:"all right"})
        // const user = await UsersM.findOne({ nickname});
        // if (user){
        //     const token = jwt.sign(nickname, jwt_secret, { expiresIn: "1 month" })    
        //     res.json({ ok: true, token, nickname })
        // }
    }
        catch(error){
           
            res.json({error})
        }
    };
    
    async login (req, res)  {
        const { nickname, password } = req.body;
        console.log(req.body);
        if (!nickname || !password)
           res.json({ ok: false, message: "All field are required" });
        try {
          const user = await UsersM.findOne({ nickname});
          console.log(user)
          if (!user) {console.log("mimo")
           res.json({ ok: false, message: "invalid data provided" })
          };
          const match = await argon2.verify(user.password, password);
          console.log(match)
          if (match) {
            // once user is verified and confirmed we send back the token to keep in localStorage in the client and in this token we can add some data -- payload -- to retrieve from the token in the client and see, for example, which user is logged in exactly. The payload would be the first argument in .sign() method. In the following example we are sending an object with key userEmail and the value of email coming from the "user" found in line 47
            const token = jwt.sign(nickname, jwt_secret, { expiresIn: "365d" }); //{expiresIn:'365d'}
            console.log(token)
            // after we send the payload to the client you can see how to get it in the client's Login component inside handleSubmit function
            res.json({ ok: true, message: "welcome back", token, nickname });
          } else { res.json({ ok: false, message: "invalid data provided" })
        };
        } catch (error) {
          res.json({ ok: false, error });
        }
      };
    
      async verify_token (req, res) {
        console.log(req.headers.authorization);
        const token = req.headers.authorization;
        jwt.verify(token, jwt_secret, (err, succ) => {
          err
            ? res.json({ ok: false, message: "something went wrong" })
            : res.json({ ok: true, succ });
        });
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