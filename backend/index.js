const connectToMongo = require(`./db`);

const express = require(`express`);
var cors=require(`cors`);
connectToMongo();

const app= express();



const port = 5000;

app.use(cors());

app.use(express.json());



app.use(`/api/lawyer`,require(`./routes/lawyer.js`));
app.use(`/api/client`,require(`./routes/client.js`));
app.use(`/api/connection`,require(`./routes/connection.js`));
app.use(`/api/appointment`,require(`./routes/appointment.js`));

app.get('/',(req,res)=>{
   console.log("hello world")
})


app.listen(port,()=>
{
    console.log("Listening to port ");

})


