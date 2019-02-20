var puppeteer=require('puppeteer');
var fs=require('fs-extra');
var hbs=require('handlebars');
var path=require('path');
var moment=require('moment');
const nodemailer = require('nodemailer')
function Pdf  (yesvalue1,novalue1,yesvalue2,novalue2)  {
    // var yesValue = checked == "yes" ? "checked" : ""
    // var noValue = checked === "no" ? "checked" : ""

    return new Promise(async function(resolve,reject){
    try{
        // var yesvalue1 = checked1 == "yes" ? "checked" : ""
        // var novalue1 = checked1== "no" ? "checked" : ""
        // var yesvalue2 = checked2 == "yes" ? "checked" : ""
        // var novalue2 = checked2== "no" ? "checked" : ""
        // var yesvalue3=checked3=="yes"?"checked":""


        const browser= await puppeteer.launch();
        const page=await browser.newPage();
       // const HeadingName="Hall Ticket"
        const ImgSrc=__dirname+'/survey.png'
        console.log("ImgSrc==========",ImgSrc)
        // console.log(yesvalue3)

        await page.setContent(`<!DOCTYPE html>
        <html>
<body>
<center><h3 style="margin-left: -122px">CheckList<h3></center>
<p><font size="3">Fire Alarm Control Panel(FACP)Readliness Major Alarms</font></p>

<div style="margin: 20px;
    margin-left: -8px;
    margin-top: 7px">
<form action="/action_page.php">
<div >
  <input type="checkbox" style="margin-right=293px" name="vehicle1" value="Bike" ${yesvalue1}>Yes<br>
  </div>
  <div style="margin-top: -18px;
    margin-left:78px">
  <input type="checkbox" name="vehicle2" value="Car"${novalue1}>No<br>
  </div>
  <hr style="margin-left: 5px;width: 388px">
  
  <p><font size="3" style="margin-left:7px">Annual Maintenance Contract(AMC)</font></p>

<div style="margin: 20px;
    margin-left: 1px;
    margin-top: 7px">
<form action="/action1_page.php">
<div >
  <input type="checkbox" style="margin-right=293px" name="vehicle1" value="Bike" ${yesvalue2}>Yes<br>
  </div>
  <div style="margin-top: -18px;
    margin-left:78px">
  <input type="checkbox" name="vehicle2" value="Car"${novalue2}>No<br>
  </div>
  <hr style="margin-left: 4px;width: 388px">
  
  
  </form>
</div>


</body>
</html>
        `);
        // <input type="checkbox" style="margin-right=293px" name="vehicle1" value="Bike" ${yesvalue3}><p style="text-align:justify;margin:3px;margin-left: 20px;
        // margin-top: -18px;">All the information provided above is true <br>the best of my knowledge.I understand I will be<br>levied a penality if found to be incorrect
        //   <div style="margin-top: 53px;
//     margin-left: 182px;">
//   <input type="submit" value="Submit">
//   </div>
        await page.emulateMedia('screen');
        await page.pdf({
            path:'/home/manojs/pdf/checklistpdf.pdf',
            format:'A4',
            printBackground:true
        }).then(result=>{
            
            return resolve({
            message:"pdf conversion done",
            result: (new Buffer(result)).toString('base64')
        })
    })
        console.log("guess done");
        // await browser.close();
        //  var result=await process.exit(    
        //  )
      
    } catch(e){
        console.log('our error',e)
        return reject({
            message:"not done"
        })
    }
} ) 
}
  
    function mail(email){

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
      port: 587,
      secure: false,
        auth: {
          user: "sanedservices2019@gmail.com",
          pass: "Sanedwebservices1!"
        }
      });
            var mailOptions = {
              transport: transporter,
              from: "Saned Services" + "<sanedservices2019@gmail.com>",
              to: email,
              subject: 'Saned Services',
              attachments: [{   // filename and content type is derived from path
              // filename and content type is derived from path
            path: '/home/manojs/pdf/checklistpdf.pdf'
        },
            ],
            
              html: "Dear "+ email +"<br>This is your survey Report for your building" + email + "  with SANED as a Supplier.  SANED will be rolling out new services for Sharjah residents."+"<br><br>" + "We will contact you for further information.<br><br><br>"+"Best Regards,<br>"+"SANED Team."
        
            };
            transporter.sendMail(mailOptions, (error, info) => {
              console.log(info)
              
              if (info) {
                console.log("Mail send error: ", info);
              }
            })
        }
    
  


module.exports={
    mail:mail,
   Pdf:Pdf
}