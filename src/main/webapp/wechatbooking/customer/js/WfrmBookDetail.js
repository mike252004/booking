var price;
var totalPrice;
var selectCount;
var mcId;
var roomTypeId;
var startDate;
var endDate;
window.onload = function(){
	$("#room_name").html("单人豪华套房");
	init();
	initDate(); //初始化时间控件
}
function initDate(){
	var myDate = new Date();
    var today = myDate.getFullYear() + "-" + (myDate.getMonth() -0 + 1) + "-" + myDate.getDate();
    var dateRange1 = new pickerDateRange('date1', {
        isTodayValid: true,
        startDate: startDate,
        endDate: endDate,
        needCompare: false,
        defaultText: '<br/>',
        autoSubmit: true,
        isSingleDay: false,
        inputTrigger: 'input_trigger1',
        theme: 'ta',
        stopToday:false, //选择日期截止到当天
        success: function(obj) {
        	startDate = obj.startDate;
        	endDate = obj.endDate;
        	freshContent();
        }
    });
}
function init(){
	var params = getRequestParam();
	mcId = params["mcId"];
	roomTypeId = params["roomTypeId"];
	startDate = params["begDate"];
	$("#my-startDate").html(startDate);
	endDate = params["endDate"];
	$("#my-endDate").html(endDate);
	freshContent();
}
function freshContent(){
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'book/queryInfo',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            roomTypeId:roomTypeId,
            startDate:startDate,
            endDate:endDate
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	if(data.ret == -1){ //该房型可预订房间数为0
        		$("#doc-select-2").children().remove();
        		$("#orderPrice").html("总价:￥0");
        		alert("该时间段中无可预订房间");
        	}
            if(data.ret == 0){
            	var content = data.content;
            	var days = content.days;
				$("#stayDay").html(days);
				var name = content.cname;
				$("#room_name").html(name);
            	price = content.totalPrice;  
            	var shopName = content.shopName;
            	//判断是否已有图片标签
            	if($("#room_img").find("img").length == 0){
            		var imgName = content.imgName;
	            	var img = document.createElement("img");
					//拼接访问路径
					var requestUrl = RESOURCE_NGINX_DOMAIN_NAME + "/image/"+shopName+"/"+name+"/"+imgName;
	            	img.src = requestUrl;
	            	img.className = "am-img-responsive";
	            	img.style = "margin:auto";
	            	$("#room_img").append(img);
            	}
            	var count = content.count - 0;
            	if(count != null || count != "" || count !== undefined){
            		$("#doc-select-2").children().remove(); //清空房间数下拉框
            		for(var i=0;i<count;i++){
	            		var option = document.createElement("option");
	            		option.value = i+1;
	            		option.innerHTML = (i+1)+" 间";
	            		$("#doc-select-2").append(option);
            		}
            		selectRoomCount();
            	}
            }
        },
        //调用出错执行的函数
//		error:function(){ }
  });
}
function selectRoomCount(){
    if($("#doc-select-2").val() == null ||
        $("#doc-select-2").val() == "" ||
        $("#doc-select-2").val()=== undefined){
        $("#orderPrice").html("总价:￥0");
        return;
    }
	selectCount = $("#doc-select-2 option:selected").val() - 0;
	totalPrice = selectCount * price;
	if(totalPrice == null || totalPrice == "" || totalPrice === undefined){
		totalPrice = 0;
	}
	$("#orderPrice").html("总价:￥"+totalPrice);
}
function onclick_order(){
	var priceValue = $("#orderPrice").html();
	if(priceValue == "总价:￥0"){
		alert("该时间段中无可预订房间");
		return ;
	}
	var price = totalPrice;
	var roomName = $("#room_name").html();
	var count = selectCount;
	var customer = $("#orderName").val();
    var checkName = true;
    var checkPhone = true;
    var checkId = true;
	if(customer == null || customer == "" || customer === undefined){
        checkName = false;
	}
	var phoneReg = /^[0-9]{11,12}$/; //验证电话号码有效性
	var phone = $("#orderTel").val();
	if(!phoneReg.exec(phone)){
	    checkPhone = false;
	}
	$("#phone-msg").html("");
	var idNum = $("#orderIDCard").val();
	var idNumReg = /^[0-9]{17}[a-zA-Z0-9]$/;
	if(!idNumReg.exec(idNum)){
	    checkId = false;
	}
	if(checkName == true){
        $("#customer-msg").html("");
    }else {
        $("#customer-msg").html("联系人信息为空");
    }
    if(checkPhone == true){
        $("#phone-msg").html("");
    }else {
        $("#phone-msg").html("联系电话信息有误");
    }
    if(checkId == true){
        $("#idCard-msg").html("");
    }else {
        $("#idCard-msg").html("身份证信息有误");
    }
    if(checkName == false || checkPhone == false || checkId == false){
        return;
    }
	saveCookie("roomName",roomName);
	saveCookie("customer",customer);
	saveCookie("startDate",startDate);
	saveCookie("endDate",endDate);
	saveCookie("count",count);
	saveCookie("phone",phone);
	saveCookie("idNum",idNum);
	saveCookie("mcId",mcId);
	saveCookie("roomTypeId",roomTypeId);

	var requestPath = getRequestPath();
	var redirect_uri = requestPath+RESOURCE_PROJECT_NAME+"wechatbooking/customer/templates/WfrmOrderIdentify.html?price="+price;
    redirect_uri = encodeURIComponent(redirect_uri);//对回调页面进行编码
    //微信登录授权，获取code，用于获取父openId
    var url = "https://wechat.wuuxiang.com/i5xwxplus/connect/oauth2/authorize?" +
        "appid="+RESOURCE_PARENT_APP_ID+
        "&redirect_uri="+redirect_uri+
        "&response_type=code" +
        "&scope=snsapi_base" +
        "&state=123#wechat_redirect";
	window.location.href = url;
}
