const http = require("http");
const fs = require("fs")
var requests = require("requests")

const homeFile = fs.readFileSync("index.html", "utf-8")

const replaceVal = (tempVal,orgVal) =>{
    let temperature = tempVal.replace("{%tempval%}",parseInt(orgVal.main.temp - 273))
    temperature = temperature.replace("{%tempmin%}",parseInt(orgVal.main.temp_min- 273))
    temperature = temperature.replace("{%tempmax%}",parseInt(orgVal.main.temp_max- 273))
    temperature = temperature.replace("{%tempcity%}",orgVal.name)
    temperature = temperature.replace("{%tempcountry%}",orgVal.sys.country)
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main)
    return temperature;
}

const server = http.createServer( (req, res) =>{
    if(req.url == '/'){
    requests("http://api.openweathermap.org/data/2.5/weather?q=karachi&appid=57ce85823974200cb412db852fb58ee1")
    .on('data', (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData]
        const realTimeData = arrData.map(val => replaceVal(homeFile,val)).join("");
        res.write(realTimeData)
        })
    
    .on('end', (err) => {
      if (err) return console.log('connection closed due to errors', err);
      console.log("chl rha ha....")
      res.end();
    }); }
});
server.listen(8000,"127.0.0.1")

