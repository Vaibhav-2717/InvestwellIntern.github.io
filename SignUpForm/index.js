var selectedRow = -1;
let usersdata = new Array();
var vg;
function init() {
   document.getElementById("tablerows").innerHTML = "";
   if (localStorage.usersdata) {
      usersdata = JSON.parse(localStorage.usersdata);
      for (var i = 0; i < usersdata.length; i++) {
         insertnewdata(i, usersdata[i].ftname, usersdata[i].lname, usersdata[i].email, usersdata[i].phone);
      }
   }
}
function savedata() {
   let ftname, lname, email, pass, repass, phone
   ftname = document.getElementById("ftname").value;
   lname = document.getElementById("lname").value;
   email = document.getElementById("email").value;
   phone = document.getElementById("phone").value;
   pass = document.getElementById("pass").value;
   repass = document.getElementById("repass").value;

   if (!ftname.match(/^[a-zA-Z ]{2,30}$/)) {
      alert('Incorrect first Name')
   } else if (!lname.match(/^[a-zA-Z ]{2,30}$/)) {
      alert('Incorrect last name')
   } else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   )) {
      alert('Email pattern is not valid');
   } else if (!phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
      alert('Phone number is not valid');
   } else if (pass.length < 6) {
      alert("Password must be at least 6 characters long.");
   }
   else if (pass !== repass) {
      alert('passwords not matched')
   }
   else {
      if (selectedRow != vg ) {
         if (usersdata.some((v) => {return v.email == email })) {
            alert("duplicate mail id");
         } else if (usersdata.some((v) => { return v.phone == phone })) {
            alert("duplicate number");
         } else {
            var stuobj = {
               "ftname": ftname,
               "lname": lname,
               "email": email,
               "phone": phone,
               "pass": pass,
               "repass": repass
            }

            if (selectedRow === -1) {
               usersdata.push(stuobj);
            } else {
               usersdata.splice(selectedRow, 1, stuobj);
            }
            localStorage.usersdata = JSON.stringify(usersdata);
            init();
            cleardata();
         }
      } else {
         var stuobj = {
            "ftname": ftname,
            "lname": lname,
            "email": email,
            "phone": phone,
            "pass": pass,
            "repass": repass
         }

         if (selectedRow === -1) {
            usersdata.push(stuobj);
         } else {
            usersdata.splice(selectedRow, 1, stuobj);
         }
         localStorage.usersdata = JSON.stringify(usersdata);
         init();
         cleardata();
      }
   }
}

function insertnewdata(index, ftname, lname, email, phone) {
   // var table = document.getElementById("storelist").getElementsByTagName('tbody')[0];
   var table = document.getElementById("tablerows");
   var newrow = table.insertRow(table.length);
   var data1 = newrow.insertCell(0);
   data1.innerHTML = ftname;
   var data2 = newrow.insertCell(1);
   data2.innerHTML = lname;
   var data3 = newrow.insertCell(2);
   data3.innerHTML = email;
   var data4 = newrow.insertCell(3);
   data4.innerHTML = phone;
   var data5 = newrow.insertCell(4);
   data5.innerHTML = '<button onclick="editdata(' + index + ')">Edit</button> <button onclick="deletedata(' + index + ')">Delete</button>';
}

function deletedata(index) {
   // var table = document.getElementById("storelist").getElementsByTagName('tbody')[0];
   // table.deleteRow(index);

   usersdata.splice(index, 1);
   localStorage.usersdata = JSON.stringify(usersdata);
   init();
}
/*document.getElementById("ftname").value="";
document.getElementById("lname").value="";
document.getElementById("email").value="";
document.getElementById("phone").value="";*/

function cleardata() {
   selectedRow = -1;
   document.getElementById("ftname").value = "";
   document.getElementById("lname").value = "";
   document.getElementById("email").value = "";
   document.getElementById("phone").value = ""
   document.getElementById("pass").value = ""
   document.getElementById("repass").value = ""
   document.getElementById("submit").innerHTML = "Submit";
}

function editdata(index) {
   vg=index
   selectedRow = index;
   var obj = usersdata[index];
   document.getElementById("ftname").value = obj.ftname;
   document.getElementById("lname").value = obj.lname;
   document.getElementById("email").value = obj.email;
   document.getElementById("phone").value = obj.phone;
   document.getElementById("pass").value = obj.pass;
   document.getElementById("repass").value = obj.repass;
   document.getElementById("submit").innerHTML = "Update";

}
