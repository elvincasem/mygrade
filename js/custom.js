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


function studentregister(){
	 
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
}


function showfirstsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="studentsubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
		var studid = document.getElementById("student_id").value = studentprofile.sid;
		
		$$.post(global_url, {action: 'displaygradefirstsem', studentid: studid}, function (dat) {
			
			document.getElementById('displaygrade').innerHTML = "";
			console.log(dat);
			var datas = JSON.parse(dat);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-green">'+datas[i].grade+'</span></div></div></div></li>');
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
			
				$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-pink">'+datas[i].grade+'</span></div></div></div></li>');
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
			
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+')" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Student to Subject</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+')" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>');
			}	
		},JSON);	
	})
}


function teacherallstudents(courseid){
$$(document).on('pageAfterAnimation','.page[data-page="addstudent"]',function(e){

	$$.post(global_url, {action: 'displayallstudents'}, function (data,status) {
		
		document.getElementById('displaystudents').innerHTML="";
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
		//var sid = JSON.stringify(datas[i].sid);
			$$('#displaystudents').append('<li><a href="#" onclick="addstudent('+datas[i].sid+','+courseid+');" class="item-link item-content item-title item-inner">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</a></li>');
	
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

function teachershowenrolled(courseid){
$$(document).on('pageAfterAnimation','.page[data-page="enrolledstudents"]',function(e){

	$$.post(global_url, {action: 'displayenrolled', sub: courseid}, function (data,status) {
		
		document.getElementById('displayenrolled').innerHTML="";
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
		
			$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">'+datas[i].grade+'</span></div></a></li>');
			//$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="myApp.alert('+datas[i].sid+');" class="item-link item-content item-inner item-title">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">'+datas[i].grade+'</span></div></a></li>');
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
				$$('#edit_action').append('<p class="buttons-row"><a href="#" class="button back">Discard</a><a href="#" onclick="updatefinalgrade('+datas[i].studentID+')" class="button button-fill color-pink">Save</a></p>');
			}
		},JSON);
	
	})
}

function updatefinalgrade(studentid){
	
	var grade = document.getElementById("gradeinput").value;
	
	$$.post(global_url, {action: 'updatefinalgrade',finalgrade: grade, studid: studentid}, function (data,status) {
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		myApp.alert('<center><strong>Final Grade<br>Successfully Updated</strong></center>');
		//var register = document.getElementById("registerstudentsuccess");
		//register.click();
		
	},JSON);
	
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
			
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="passsubjid('+datas[i].courseid+')" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Student to Subject</a></li><li><a href="pages/teachersearch.html" onclick="showenrolled();" class="item-link item-content item-inner item-title">Student Grades</a></li><br></ul></div></div></li>');
			}	
		},JSON);	
	})
}




$$(document).on('pageAfterAnimation','.page[data-page="chairmansearch"]',function(e){
	document.getElementById('displayteachers').innerHTML = "";
	
	$$.post(global_url, {action: 'displayteachers'}, function (data,status) {
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
		
			$$('#displayteachers').append('<li><a href="pages/chairmanteacher.html" class="item-link item-content item-inner item-title" onclick="viewteachersubjects('+datas[i].teacherid+');">'+datas[i].fname+' '+datas[i].lname+'</a></li>');
		}
	},JSON);
	
})


function viewteachersubjects(id){
	//var teacherfname = first;
	//var teacherlname = last;
	//var tid = id;
	
	$$(document).on('pageAfterAnimation','.page[data-page="chairmanteacher"]',function(e){
	
	//myApp.alert(first);
	//myApp.alert(last);
	//myApp.alert(id);
	
	//document.getElementById("teacher_name").value = teacherfname+" "+teacherlname;
	document.getElementById("teacher_id").value = id;
	
		$$.post(global_url, {action: 'displayteachersubjects', teacherid: id}, function (data) {
			
			document.getElementById('displaysubjects').innerHTML = "";
			document.getElementById('teacher_name').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				$$('#displaysubjects').append('<li class="accordion-item"><a href="#" class="item-link item-content"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><div class="item-content item-divider"><div class="item-inner"><div class="item-title">1st Semester</div></div></div></li><li><a href="pages/chairmangrade.html" class="item-link item-content item-inner item-title" onclick="getsubjectsection();">1-A</a></li><br><li><div class="item-content item-divider"><div class="item-inner"><div class="item-title">2nd Semester</div></div></div></li><li><a href="pages/chairmangrade.html" class="item-link item-content item-inner item-title" onclick="getsubjectsection();">1-A</a></li><br></ul></div></div></li>');
				
				$$('#teacher_name').append(''+datas[i].fname+''+datas[i].lname+'')
			}	
			
		},JSON);
	
	})
}


























































