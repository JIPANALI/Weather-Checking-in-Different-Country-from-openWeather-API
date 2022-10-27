const express=require("express");

//for getting some info fro  other web server so this requiest will required
const https=require("https");

//it is allow to by the name of in html we will acces by the name in this field
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}))







app.get("/", function(req,res){

  res.sendFile(__dirname+"/index.html")
});

  app.post("/",function(req,res){

    const query=req.body.cityName;  //geting city name  from the html  using body parser
    const apiKey="c52794e841abdb5e6725299637b561bc";
    const unit="metric"

    //here query is taken as string because in cityName in html we were mension that that is text type so it is came in string
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url, function(response){
      console.log(response);
      response.on("data", function(data){
        const weatherData=JSON.parse(data)
        console.log(weatherData);

        const obj={
          name:"jipan",
          hobbie:"reading book"
        }

        console.log(JSON.stringify(obj));

        const temp=weatherData.main.temp
        console.log(temp);

        const weatherDescri=weatherData.weather[0].description
        console.log(weatherDescri);

        const icoN=weatherData.weather[0].icon
        const imageURL="http://openweathermap.org/img/wn/" +icoN+ "@2x.png"


        //if you want to more than one of the send request then it will crush  so what we will do
        // res.send("<h1>The temperature in Paris is " +temp +" degree celcius.</h1>");

        // we use the write method then finally one send method
        res.write("<p> The weather is Currently is " +weatherDescri+" <p>");
        res.write("<h1>The temperature in "+ query+" is "+temp + " degree celcius.</h1>");
        res.write("<img src="+imageURL+">");
        res.send();
      })
    })



  })










app.listen(process.env.PORT || 3000, function(){
  console.log("Server is started on port 3000");
})
