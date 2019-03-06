var puppeteer = require("puppeteer");

function Pdf(name, course) {
  // var yesValue = checked == "yes" ? "checked" : ""
  // var noValue = checked === "no" ? "checked" : ""

  return new Promise(async function(resolve, reject) {
    try {
      // var yesvalue1 = checked1 == "yes" ? "checked" : ""
      // var novalue1 = checked1== "no" ? "checked" : ""
      // var yesvalue2 = checked2 == "yes" ? "checked" : ""
      // var novalue2 = checked2== "no" ? "checked" : ""
      // var yesvalue3=checked3=="yes"?"checked":""

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // const HeadingName="Hall Ticket"

      // console.log(yesvalue3)

      await page.setContent(`<!DOCTYPE html>
        <html>
<body>
<div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878">
<div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878">
       <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
       <br><br>
       <span style="font-size:25px"><i>This is to certify that</i></span>
       <br><br>
       <span style="font-size:30px"><b>${name}</b></span><br/><br/>
       <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/>
       <span style="font-size:30px"><b>${course}</b></span> <br/><br/>
     
     
</div>
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
      await page.emulateMedia("screen");
      await page
        .pdf({
          path: "./upload/certificate" + name + ".pdf",
          format: "A4",
          printBackground: true
        })
        .then(result => {
          const res = {
            message: "pdf conversion done",
            certificate: new Buffer(result).toString("base64")
          };
          return resolve({
            status: 200,
            message: res
          });
        });
      console.log("guess done");
      // await browser.close();
      //  var result=await process.exit(
      //  )
    } catch (e) {
      console.log("our error", e);
      return reject({
        message: "not done"
      });
    }
  });
}
module.exports = {
  Pdf: Pdf
};
