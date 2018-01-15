function login() {
	//参数验证
	if ($("#shopid").val() == "") {

        $('#my-alert').removeClass().addClass("am-alert am-alert-warning");

        $('#my-msg').text("请填写用户名");
        return false;
    }

    if ($("#password").val() == "") {

        $('#my-alert').removeClass().addClass("am-alert am-alert-warning");

        $('#my-msg').text("请填写密码");
        return false;
    }
    $("#btnLogin").html("登录中 ... <i class='am-icon-spinner am-icon-spin'></i>");
	
	var id = $("#shopid").val();
	var pwd = $("#password").val();
	var requestPath = getRequestPath();
	//后台查询
	$.ajax({
		//请求方式
		type:"post",
		//请求路径
		url:requestPath+RESOURCE_PROJECT_NAME+'login',
		//是否异步请求
		async:true,
		//传参
		data:{
			shopId:id,
			pwd:pwd
		},
		//发送请求前执行方法
//		beforeSend:function(){ },
		//成功返回后调用函数
		success:function(data){
			if(data.ret == 0){
				var shopName = data.content;
                saveCookie("shopName",shopName);
				saveCookie("mcId",id);
				window.location.href = "../templates/WfrmMain.html";
			}else{
                $('#my-alert').removeClass().addClass("am-alert am-alert-warning");
                $('#my-msg').text("用户名或密码不正确");
                $("#btnLogin").html("登录");
            }
		},
		//调用出错执行的函数
//		error:function(){ }
	});
}
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    
    if (e && e.keyCode == 13) { // enter 键
        login();
    }
};
