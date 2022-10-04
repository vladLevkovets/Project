const express = require('express')
    const cors = require("cors")
    app = express(),
    mongoose = require('mongoose'),
    UsersR=require('./routes/UsersR')
    require("dotenv").config({ path: "./.env" });
// to print incoming requests from mongoose in the terminal
mongoose.set('debug',true)
// =================== setting to use the body of a request ===================
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// connecting to mongo and checking if DB is running
async function connecting(){
try {
    await mongoose.connect(process.env.MONGO)
    console.log('Ready to fight')
} catch ( error ) {
    console.log('Houston , we have a PROBLEM !!');
}
}
connecting()
// end of connecting to mongo and checking if DB is running

// routes
app.use('/users', UsersR);

const path=require('path');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,'../client/build')));

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,'../client/build','index.html'))
})

// Set the server to listen on port 3000
PORT= process.env.PORT || 4040
app.listen(PORT, () => console.log(`server on duty`))