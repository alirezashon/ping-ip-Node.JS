const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render('home',{name:'stdout'});
  });
  
  app.post('/myform', function(req, res){ 
    var ip = req.body.mytext;
    console.log(ip); //mytext is the name of your input box
    const { exec } = require("child_process");
    exec(`ping  ${ip}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('home',{name:` ${stdout}`});
    });
    
  });
    


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));