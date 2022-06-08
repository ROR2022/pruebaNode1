import express from "express";
import mongoose from "mongoose";
import store from "./api/models/client/store.js";

const app = express();
const port = 5500;

const mongoURL = "mongodb+srv://ror2022:Orimar20@clusterror2022.qcff4.mongodb.net/clients?retryWrites=true&w=majority";
const options={};
mongoose.connect(mongoURL);

app.use(express.json({limit:"50mb"}))

app.post("/api/clients", (req,res)=>{
    //console.log(req.body)
    let clientData= req.body;
    let mongoRecords = [];
    clientData.forEach(element => {
        mongoRecords.push({
            name: element.name,
            phone: element.phone,
            adress: element.adress
        })
        
    });
    store.create(mongoRecords,(err, records)=>{
        if (err){
            res.status(500).send(err);
        } else{
            res.status(200).send(records)
        }
    })
    //res.send("you have posted something")
})

app.delete("/api/clients", (req,res)=>{
    store.deleteMany({}, (err)=>{
        res.status(500).send(err);
    })
})
app.get("/api/clients", (req, res)=>{
    store.find({},(err,data)=>{
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    })
})

app.get("/", (req,res)=>{
    res.send("Hello World")
})


app.listen(port, ()=>{
    console.log(`Server listening at: http://localhost:${port}`)
})