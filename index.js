const express = require("express")
const cors = require("cors")
const pool = require("./db");
const nodemailer = require('nodemailer')

const app = express()
const port = process.env.PORT || 4000;

let client;
let session;
app.use(cors());
app.use(express.json());
//app.use(express.json)








// create
app.post('/list', async (req, res)=>{
    try{
        const {name, lname, email, address, phone, status, anteckning} = req.body;
        console.log(anteckning)
        const newTodo = await pool.query("insert into otto_user (name, lname,email,address,phone,status,anteckning) values($1, $2, $3, $4, $5, $6, $7)", [name, lname, email,address,phone, status, anteckning])
        //res.json(todo.rows[0])
    }catch(err){
        console.log(err.message);
    }
})

// get all
app.get("/lists", async(req,res)=>{
    try {
        const todo = await pool.query("select * from otto_user"); // variable that went through the query shold be inside the hackparantes
        res.json(todo.rows) // send the information to client side
    } catch (error) {
        console.log(error.message)
    }
})
// get by id
app.get("/lists/:id", async(req,res)=>{
    try {
        const {id} = req.params; // get parametern value
        const todo = await pool.query("select * from todo where id = $1", [id]); // variable that went through the query shold be inside the hackparantes
        res.json(todo.rows[0])
        
    } catch (error) {
        console.log(error.message)
    }
})

// update
app.put("/lists/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const name = req.body.name;
        const lname = req.body.lname;
        const email = req.body.email;
        const address = req.body.address;
        const phone = req.body.phone;
        const status = req.body.status;
        const anteckning = req.body.anteckning;

        const updateInfo = await pool.query("update otto_user set name = $1, lname = $2, email = $3, address = $4, phone = $5, status = $6, anteckning = $7 where id = $8 returning *", [name, lname, email, address, phone, status, anteckning,id])
        res.json(updateInfo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

// delete
app.delete("/lists/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteInfo = await pool.query("delete from otto_user where id = $1", [id])
        res.send("successfully deleted!")
    } catch (error) {
        console.log(err.message);
    }
})


// send mail 
app.post("/email", (req, res)=>{
    try {
        
        
        const outputmail = `
            <p>Du har ny bokat tid!</p>
            <h3>Hej ;)</p></h3>
            <h3>Test Mail</h3>
            <br>
            <h3>Mer information angående mail</h3>
            <ul>
                ${req.body.message}
            </ul>
            <h3 style="color: red;">Kom ihåg!</h3>
            <p>Avbokning måste ske innan 24 timmar.</p>
            <br>
            <p>Varmt välkommen!</p>
            <p>Förenings name!</p>
        `;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port:8080,
            secure: true,
            auth: {
                user: 'expressdesign1121@gmail.com', // generated ethereal user
                pass: 'HApakdel1121#me', // generated ethereal password
            }
        });  
        console.log(req.body.mails);
        let mailOptions = {
            from: '"DevStud" <expressdesign1121@gmail.com>', // sender address
            to: `${req.body.mails}`, // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.message, // plain text body
            html: outputmail
        };

                    // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error +  " from sendMail")
            }
            else {
                console.log(info)
            }
        });
    } catch (error) {
        console.log(error.message)
    }
})





// server 
app.listen(port, () => console.log(`the server is runing on port ${port}`))