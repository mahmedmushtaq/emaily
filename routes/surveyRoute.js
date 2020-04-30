const mongoose = require("mongoose");
const requiredLogin = require("../midlewares/requireLogin");
const requireCredits = require("../midlewares/requireCredits");

const Mailer = require("../services/Mailer");
const SurveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("survey");
module.exports = app=>{
    app.get("/api/surveys/thanks",(req,res)=>{
        res.send("thanks for voting");
    });
    app.post("/api/surveys",requiredLogin,requireCredits,async (req,res)=>{

        const {title,subject,body,recipients} = req.body;


        const survey = new Survey({
            title,
            subject,
            body,
            recipients:recipients.split(",").map(email => ({ email: email.trim() })),
            _user:req.user.id,
            dateSent: Date.now(),
        })

        const mailer = new Mailer(survey,SurveyTemplate(survey));

       try{
            await mailer.send();
            await survey.save();
            req.user.credits -=1;
            const user = await req.user.save();

            res.send(user);
       }catch(err){
             res.status(422).send(err);
        }

    });
}