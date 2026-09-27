const express =require('express');
const fs = require('fs');
const user =require('./MOCK_DATA.json')
const app = express();
const port =8000;

app.use(express.urlencoded({extended:false}))
app.get("/user",(req,res)=>{
    const html =`
    <ul>
        ${user.map((user)=>`<li>${user.first_name}</li>`).join("")}
        
    </ul>`
    res.send(html);
})
app.get("/api/user",(req,res)=>{
    return res.json(user);
});

app.route("/api/user/:id").get((req,res)=>{
    const id =Number(req.params.id);
    const users = user.find(users=>users.id===id);
    return res.json(users);
}).put((req,res)=>{
    const body= req.body;
    user.push({...body, id:  user.length+1});
    fs.write('./MOCK_DATA.json',JSON.stringify(user),(err,res)=>{
       return res.json({status:"success", id:  user.length});
    })
    
})
.delete((req,res)=>{
    return res.json({status:"pending"});
});
app.listen(port,()=>console.log(`server at port ${port}`))
