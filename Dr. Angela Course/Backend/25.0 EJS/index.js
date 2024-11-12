import express from "express";

var app = express();
var port = 3000;


app.get("/", (req, res) => {
    let dayType = "weekday";
    let adv = "Keep up the good work";

    const today = new Date();
    const days = today.getDay();
    
    if (days === 6 || days === 0) {
        dayType = "weekend";
        adv = "Have a nice day";
    }

    res.render("index.ejs", 
    {day: dayType, advice: adv});
}); 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});