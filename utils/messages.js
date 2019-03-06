var message_en ={S01:"Your Appeal has been Submitted Successfully",
E01:"something went wrong",
E02:"Employee Profile is Already Exists",
S02: "Employee Profile Added Successfully",
S03: "Feedback Done",
S04: "Course Created Successfully",
S05: "Trainer Profile is Already Exists",
S06: "Trainer Profile Added Successfully",


}

var message_ar =
{S01: "تم تقديم طلب الاستئناف بنجاح",
    E01:"هناك خطأ ما",
E02:"ملف الموظف موجود بالفعل",
S02:"تمت إضافة ملف تعريف الموظف بنجاح",
S03: "تم تنفيذ التعليقات",
S04: "الدورة التدريبية تم إنشاؤها بنجاح",
S05: "الملف الشخصي للمدرب موجود بالفعل",
S06: "تمت إضافة الملف الشخصي للمدرب بنجاح",


}





function getmessage(language,code) {
    // console.log("achie")
    console.log(language,code,"testing")
    return new Promise( function (resolve,reject){
        var message = language=="en" ? message_en : message_ar;
        
        console.log(message[code],"message")

        return resolve({ result:message[code]});
    })
}

module.exports={getmessage:getmessage}