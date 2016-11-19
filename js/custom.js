var global_url = "http://ccsmygrade.com/ccsgiapp/functions.php";

var currentsem= "";

function getsubjectsection(data){
	subjectsection = data;
}

function getcurrentsem(data){
	currentsem = data;
}

$$(document).on('pageAfterAnimation','.page[data-page="studentsy"]',function(e){
	var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
	document.getElementById("student_name").innerHTML = studentprofile.fname+" "+studentprofile.lname;
})

$$(document).on('pageAfterAnimation','.page[data-page="teachersy"]',function(e){
	var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
	document.getElementById("teacher_name").innerHTML = teacherprofile.fname+" "+teacherprofile.lname;
})

$$(document).on('pageAfterAnimation','.page[data-page="teachersubj"]',function(e){
	document.getElementById("semester_title").innerHTML = currentsem;
})

function studentlogin(){
	
	//myApp.showPreloader();
	 
	 var uname = document.getElementById("studentusername").value;
     var pwd = document.getElementById("studentpassword").value;
	
	$$.post(global_url, {action: 'studentlogin',username: uname, password: pwd}, function (data,status) {
		var datas = JSON.parse(data);
		
		console.log(data);
		if(parseInt(data)==0){
			myApp.alert('Invalid Username or Password');
		}else{
			localStorage.setItem("studentprofile",JSON.stringify(datas));
			var login = document.getElementById("studentsuccess");
			login.click();

		}
		
	},JSON);
	
	//myApp.hidePreloader();
}


function teacherlogin(){
	
	 //myApp.showPreloader();
	 
	 var uname = document.getElementById("teacherusername").value;
     var pwd = document.getElementById("teacherpassword").value;
	
	$$.post(global_url, {action: 'teacherlogin',username: uname, password: pwd}, function (data,status) {
		var datas = JSON.parse(data);
		
		console.log(data);
		if(parseInt(data)==0){
			myApp.alert('Invalid Username or Password');
		}else{
			localStorage.setItem("teacherprofile",JSON.stringify(datas));
			var login = document.getElementById("teachersuccess");
			login.click();
		}
		
	},JSON);
	
	//myApp.hidePreloader();
}

function chairmanlogin(){
	
	//myApp.showPreloader();
	 
	 var uname = document.getElementById("chairmanusername").value;
     var pwd = document.getElementById("chairmanpassword").value;
	
	$$.post(global_url, {action: 'chairmanlogin',username: uname, password: pwd}, function (data,status) {
		var datas = JSON.parse(data);
		
		console.log(data);
		if(parseInt(data)==0){
			myApp.alert('Invalid Username or Password');
		}else{
			localStorage.setItem("chairmanprofile",JSON.stringify(datas));
			var login = document.getElementById("chairmansuccess");
			login.click();
		}
		
	},JSON);
	
	//myApp.hidePreloader();
}


function studentpreregister(){

	 var id = document.getElementById("registeridnumber").value;
	
	$$.post(global_url, {action: 'registerfindid', idnumber: id}, function (data) {
		
		document.getElementById('register_form').innerHTML = "";
		console.log(data);
		
		if (data == 1){
		$$('#register_form').append('<div class="list-block"><ul>'+
			'<li><div class="item-content item-inner item-title item-divider"><center>Registeration Form</center></div></li>'+
			'<li><div class="item-content"><div class="item-inner">'+
				  '<div class="item-title floating-label">Username</div>'+
				  '<div class="item-input"><input type="text" id="registerusername" placeholder=""/></div>'+
			'</div></div></li>'+
			'<li><div class="item-content"><div class="item-inner">'+
				  '<div class="item-title floating-label">Password</div>'+
				  '<div class="item-input"><input type="password" id="registerpassword" placeholder=""/></div>'+
			'</div></div></li>'+
		'</ul></div>'+
		'<div class="content-block"><p class="buttons-row">'+
			'<a href="#" class="button button-raised back link">Discard</a>'+
			'<a href="index.html" id="registerstudentsuccess" style="display:none;">success</a>'+
			'<a onclick="registerusernamepassword();" class="button button-raised button-fill color-pink">Register</a>'+
		'</p></div>');
		}else if (data == 0){
		myApp.alert('<center class="color-deeporange">Sorry you are not yet enrolled in the system. Please consult <br>your Chairman.<center>');
		}
		
	},JSON);
}

function registerusernamepassword(){
	
	var sid = document.getElementById("registeridnumber").value;
	var suname = document.getElementById("registerusername").value;
	var spass = document.getElementById("registerpassword").value;

	$$.post(global_url, {action: 'registerusernamepassword', studentid: sid, username: suname, password: spass}, function (data) {
		
		console.log(data);
		myApp.alert('<center><strong>Registration Successful!</strong><br>Please login with your <strong>Username</strong> and <strong>password</strong>.</center>');
		var success = document.getElementById("registerstudentsuccess");
		success.click();
		
	},JSON);
	
}

/* function studentregister(){
	 
	 var sem = document.getElementById("registersemester").value;
	 var yr = document.getElementById("registeryear").value;
	 var sec = document.getElementById("registersection").value;
	 var id = document.getElementById("registeridnumber").value;
	 var fname = document.getElementById("registerfirstname").value;
	 var mid = document.getElementById("registermiddleinitial").value;
	 var lname = document.getElementById("registerlastname").value;
	 var uname = document.getElementById("registerusername").value;
	 var pwd = document.getElementById("registerpassword").value;
	
	$$.post(global_url, {action: 'registerstudent',semester: sem, year: yr, section: sec, idnumber: id, firstname: fname, middleinitial: mid, lastname: lname, username: uname, password: pwd}, function (data,status) {
		
		console.log(data);
		myApp.alert('<center><strong>Registration Successful!</strong><br>Please login with your <strong>Username</strong> and <strong>password</strong>.</center>');
		var register = document.getElementById("registerstudentsuccess");
		register.click();
		
	},JSON);
} */



function showfirstsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="studentsubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
		var studid = document.getElementById("student_id").value = studentprofile.studentID;
		
		$$.post(global_url, {action: 'displaygradefirstsem', studentid: studid}, function (data) {
			
			document.getElementById('displaygrade').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
				
				if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
				$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-green">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-blue">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == 3.00){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-orange">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == 5.00){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-red">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == "INC"){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == "0"){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-pink">'+datas[i].grade+'</span></div></div></div></li>');
				}else{
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-pink">0</span></div></div></div></li>');
				}
				
			}	
		},JSON);	
	})
}


function showsecondsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="studentsubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
		var studid = document.getElementById("student_id").value = studentprofile.sid;
		
		$$.post(global_url, {action: 'displaygradesecondsem', studentid: studid}, function (dat) {
			
			document.getElementById('displaygrade').innerHTML = "";
			console.log(dat);
			var datas = JSON.parse(dat);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
				$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-green">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-blue">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == 3.00){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-orange">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == 5.00){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-red">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == "INC"){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge">'+datas[i].grade+'</span></div></div></div></li>');
				}else if(datas[i].grade == "0"){
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-pink">'+datas[i].grade+'</span></div></div></div></li>');
				}else{
					$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-pink">0</span></div></div></div></li>');
				}
			}	
		},JSON);	
	})
}


function teachershowfirstsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="teachersubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
		var tid = document.getElementById("teacher_id").value = teacherprofile.teacherid;
		
		$$.post(global_url, {action: 'displaysubjfirstsem', teacherid: tid}, function (data) {
			
			document.getElementById('displaysubj').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+',1);" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Students to Subject</a></li><li><a onclick="teacherallstudentssection('+datas[i].courseid+',1);" href="pages/addstudentyear.html" class="item-link item-content item-inner item-title">Add Students to Subject by Section</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+');" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>');
			}	
		},JSON);	
	})
}

function teachershowsecondsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="teachersubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
		var tid = document.getElementById("teacher_id").value = teacherprofile.teacherid;
		
		$$.post(global_url, {action: 'displaysubjsecondsem', teacherid: tid}, function (data) {
			
			document.getElementById('displaysubj').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+',2);" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Students to Subject</a></li><li><a onclick="teacherallstudentssection('+datas[i].courseid+',2);" href="pages/addstudentyear.html" class="item-link item-content item-inner item-title">Add Students to Subject by Section</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+');" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>');
			}	
		},JSON);	
	})
}

function teacherallstudents(courseid,sem){
$$(document).on('pageAfterAnimation','.page[data-page="addstudent"]',function(e){
	$$.post(global_url, {action: 'displayallstudents', semester: sem}, function (data,status) {
		
		document.getElementById('displaystudents').innerHTML="";
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
			$$('#displaystudents').append('<li><a href="#" onclick="addstudent('+datas[i].studentID+','+courseid+');" class="item-link item-content item-title item-inner">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</a></li>');
		}


	},JSON);

})
}

function addstudent(studentid,subjid){
	
	var teacherprof = localStorage.getItem("teacherprofile");
	var teacher = JSON.parse(teacherprof);
	var tid = teacher.teacherid;
	
	myApp.confirm('Add this student to the subject?', function () {
		
		$$.post(global_url, {action: 'enrollstudent',teachid: tid, studid: studentid, subid: subjid}, function (data,status) {
			
			console.log(data);
			myApp.alert('Successfully added!');
			
		},JSON);
        
    });
	
}



/////////////////////////////SHOW ENROLL BY SECTION HERE/////////////////////////
/////////////////////////////SHOW ENROLL BY SECTION HERE/////////////////////////
/////////////////////////////SHOW ENROLL BY SECTION HERE/////////////////////////
function teacherallstudentssection(cid,sem){
	
	
	//var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
	//var tid = document.getElementById("teacher_id").value = teacherprofile.teacherid;
	//var yr = document.getElementById("enrollyear").value;
	//var sec = document.getElementById("enrollsection").value;

	$$(document).on('pageAfterAnimation','.page[data-page="addstudentyear"]',function(e){
		document.getElementById("input_cid").value = cid;
		document.getElementById("input_sem").value = sem;
	//document.getElementById('enroll_btn').innerHTML="";
		//$$.post(global_url, {action: 'sample'}, function (data) {
			//$$('#enroll_btn').append('<a href="#" onclick="myApp.alert('+cid+','+sem+','+tid+')" class="button button-fill color-pink">Enroll Year and Section</a>');				
		//},JSON);
	})

}


function addyearandsection(){
	
	var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
	var tid = document.getElementById("teacher_id").value = teacherprofile.teacherid;

	var yr = document.getElementById("enrollyear").value;
	var sec = document.getElementById("enrollsection").value;

	var cid = document.getElementById("input_cid").value
	var sem = document.getElementById("input_sem").value

	//myApp.alert(tid);
	//myApp.alert(yr);
	//myApp.alert(sec);
	//myApp.alert(cid);
	//myApp.alert(sem);
	myApp.confirm('Enroll this year and section to the subject?', function () {
		
		$$.post(global_url, {action: 'enrollyearsection', teacherid: tid, year: yr, section: sec, courseid: cid, semester: sem}, function (data) {
			
			console.log(data);
			myApp.alert('Year and Section<br>Successfully Enrolled!');
			
		},JSON);
        
    });

	//$$(document).on('pageAfterAnimation','.page[data-page="addstudentyear"]',function(e){
		//document.getElementById("input_cid").value = cid;
		//document.getElementById("input_sem").value = sem;
	//document.getElementById('enroll_btn').innerHTML="";
		//$$.post(global_url, {action: 'sample'}, function (data) {
			//$$('#enroll_btn').append('<a href="#" onclick="myApp.alert('+cid+','+sem+','+tid+')" class="button button-fill color-pink">Enroll Year and Section</a>');				
		//},JSON);
	//})

}

/////////////////////////////SHOW ENROLL BY SECTION HERE/////////////////////////
/////////////////////////////SHOW ENROLL BY SECTION HERE/////////////////////////
/////////////////////////////SHOW ENROLL BY SECTION HERE/////////////////////////



function teachershowenrolled(courseid){
$$(document).on('pageAfterAnimation','.page[data-page="enrolledstudents"]',function(e){

	$$.post(global_url, {action: 'displayenrolled', sub: courseid}, function (data,status) {
		
		document.getElementById('displayenrolled').innerHTML="";
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
			if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-green">'+datas[i].grade+'</span></div></a></li>');
			}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-blue">'+datas[i].grade+'</span></div></a></li>');
			}else if(datas[i].grade == 3.00){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-orange">'+datas[i].grade+'</span></div></a></li>');
			}else if(datas[i].grade == 5.00){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-red">'+datas[i].grade+'</span></div></a></li>');
			}else if(datas[i].grade == "INC"){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge">'+datas[i].grade+'</span></div></a></li>');
			}else if(datas[i].grade == "0"){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">'+datas[i].grade+'</span></div></a></li>');
			}else{
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">0</span></div></a></li>');
			}
			
			
		}
	},JSON);
})
}

function shownameoneditgrade(studid){
	$$(document).on('pageAfterAnimation','.page[data-page="editgrade"]',function(e){
		
		$$.post(global_url, {action: 'showstudentnameonedit', studentid: studid}, function (data,status) {
			
			document.getElementById('student_name').innerHTML="";
			document.getElementById('edit_action').innerHTML="";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
				$$('#student_name').append(''+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'');
				$$('#edit_action').append('<p class="buttons-row"><a href="#" class="button back">Discard</a><a href="#" onclick="updatefinalgrade('+datas[i].studentID+')" class="button button-fill color-pink">Save</a><a href="#" class="back" id="editsuccess" style="display:none;">success</a></p>');
			}
		},JSON);
	
	})
}

function updatefinalgrade(studentid){
	
	var grade = document.getElementById("gradeinput").value;
	
	$$.post(global_url, {action: 'updatefinalgrade',finalgrade: grade, studid: studentid}, function (data) {
		
		console.log(data);
		//var datas = JSON.parse(data);
		//console.log(datas);
		myApp.alert('<center><strong>Final Grade<br>Successfully Updated</strong></center>');
		var success = document.getElementById("editsuccess");
		success.click();
		
	},JSON);
	
}



























$$(document).on('pageAfterAnimation','.page[data-page="chairmansearch"]',function(e){
	document.getElementById('displayteachers').innerHTML = "";
	
	$$.post(global_url, {action: 'displayteachers'}, function (data,status) {
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
		
			$$('#displayteachers').append('<li><a href="pages/chairmanteacher.html" class="item-link item-content item-inner item-title" onclick="viewteachersubjects('+datas[i].teacherid+');">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</a></li>');
		}
	},JSON);
	
})


function viewteachersubjects(id){
	
	$$(document).on('pageAfterAnimation','.page[data-page="chairmanteacher"]',function(e){
	
	document.getElementById("teacher_id").value = id;
	
		$$.post(global_url, {action: 'displayteachersubjects', teacherid: id}, function (data) {
			
			document.getElementById('displaysubjects').innerHTML = "";
			document.getElementById('teacher_name').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
				$$('#teacher_name').append(''+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<br>')
			
				$$('#displaysubjects').append('<li><a href="pages/sectionstudents.html" class="item-link item-content item-inner item-title" onclick="displaysectionstudents('+datas[i].courseid+','+id+');"><strong><b>'+datas[i].coursetitle+'</b></strong></a></li>');
			}	
			
		},JSON);
	
	})
}


/* function chairmanshowsection(courseid,tid){

	myApp.alert(courseid);
	myApp.alert(tid);
$$(document).on('pageAfterAnimation','.page[data-page="chairmansubjectsection"]',function(e){
	
	$$.post(global_url, {action: 'displaysections', courseid: cid, year: yr}, function (data,status) {
		
		document.getElementById('display_sections').innerHTML="";
		document.getElementById('display_coursetitle').innerHTML = "";
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
		
		var varsec = String(datas[i].sectionName);
		
			$$('#display_coursetitle').append(''+datas[i].coursetitle+'<br>');
			
			$$('#display_sections').append('<li><a href="pages/sectionstudents.html" onclick="displaysectionstudents('+datas[i].sectionid+','+cid+');" class="item-link item-content item-inner item-title">'+datas[i].section+'</a></li>');
			//$$('#display_sections').append('<li><a href="pages/chairmangrade.html" onclick="alertsection('+datas[i].section+','+cid+');" class="item-link item-content item-inner item-title">'+datas[i].section+'</a></li>');
			//$$('#display_sections').append('<li><a href="pages/chairmangrade.html" onclick="myApp.alert('+datas[i].section+','+cid+');" class="item-link item-content item-inner item-title">'+datas[i].section+'</a></li>');
			
		}


	},JSON);

})
}   */


function displaysectionstudents(cid, tid){
	$$(document).on('pageAfterAnimation','.page[data-page="sectionstudents"]',function(e){		
		
		$$.post(global_url, {action: 'displaysectionstudents', courseid: cid, teacherid: tid}, function (data) {
		
		document.getElementById('display_sectionstudents').innerHTML=""; 
		//document.getElementById('display_sectionname').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
			if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-green">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-blue">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == 3.00){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-orange">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == 5.00){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-red">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == "INC"){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == "0"){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">'+datas[i].grade+'</span></div></div></li>');
			}else{
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">0</span></div></div></li>');
			}
			
			
		}
		
		},JSON);
	})
}





















































