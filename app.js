const express=require("express"); //needs to be installed with npm.
const https=require("https"); //does not need to be installed with npm.
const bodyParser=require("body-parser"); //needs to be installed with npm.
const ejs=require('ejs');



const app=express();
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
    console.log("Post Request Recieved");
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const apiKey="6d420289a426055544c5dc33ea16ed3c";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
    https.get(url,function(response){
       console.log(response.statusCode);
       response.on("data",function(data){
           const weatherData=JSON.parse(data);

           const temp=weatherData.main.temp;
           const weatherDescription=weatherData.weather[0].description;
           const city=weatherData.name;
           const icon=weatherData.weather[0].icon;
           const iconURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";

           res.render('weather.ejs', {
            city: city,
            temp: temp,
            weatherDescription: weatherDescription,
            iconURL: iconURL
            });

       });
    });
});


app.listen(3000, function(){
    console.log("Server running on port 3000");
});



