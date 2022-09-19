const UsersM = require('../models/UsersM');


class UsersCons {

    async add (req, res) {
        let { nickname,password } = req.body;
        let ex=await UsersM.findOne({nickname})
        console.log(ex)
        if (ex) {res.send({ok:false,nickname} )
        }else{
        try{
            console.log(catName);
            const here = await UsersM.create({nickname,password});
            res.send({ok:true,nickname})
        }
            catch(error){
           
            res.send({error})
        }}
    }






















};
module.exports= new UsersCons();  