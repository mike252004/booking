var startDate;
var endDate;
var count;
var mcId;
var roomTypeId;
var orderId;
var clinker;
var ilinktel;
var idNum;
var price;
var roomName;
window.onload = function(){
    // var parentOpenId = "oKpM8sxxZwi4tPWM4ZBLTFNINd_M";
    // getPayKey(parentOpenId);
	init();
}
function init(){
	var params = getRequestParam();
	price = params["price"];
	roomName = getCookie("roomName");
	startDate = getCookie("startDate");
	endDate = getCookie("endDate");
	count = getCookie("count");
	clinker = getCookie("customer");
	ilinktel = getCookie("phone");
	idNum = getCookie("idNum");
	mcId = getCookie("mcId");
	roomTypeId = getCookie("roomTypeId");
	$("#orderPrice").html("￥ "+price);
	$("#room_name").html(roomName);
	$("#my-start").html(startDate);
	$("#my-end").html(endDate);
	$("#my-count").html(count);
	$("#customer-name").html(clinker);
	$("#my-phone").html(ilinktel);
	$("#my-idCard").html(idNum);
}
/**
 * 前台支付
 * 将该笔订单设置为未完成订单
 */
function onclick_frontPay(){
    path = "../templates/WfrmBookStatus.html?frontPay=1";
    checkOrder("",path);
}
/**
 * 立即支付
 * @param {Object} id 支付方式的id
 */
function onclick_pay(id){
    //防止连续多次下单，删除下单支付按钮，替换为加载
    $('.am-modal-actions-group').children().remove();
    var load = document.createElement("div");
    load.style = "width: 100%;height: 120px;";
    document.getElementById('my-actions-body').appendChild(load);
    document.getElementById('my-actions').style = "background-image: url('../images/timg.gif');background-position-y:-78px";
	if(id == "crm_pay"){ //crm支付 paytypeid:3
        var payTypeId = 3;
        checkOrder(payTypeId,"");
	}
	if(id == "wechat_pay"){ //微信支付 paytypeid:6
        var payTypeId = 6;
        checkOrder(payTypeId,"");
	}
}
// function getPaySign(payTypeId){
//     var openId = getCookie("openId");
//     var mpid = getCookie("mpId");
//     var requestPath = getRequestPath();
//     var finishPath = requestPath+RESOURCE_PROJECT_NAME+"myOrder/finishPay?orderId="+orderId;
// 	var requestPath = getRequestPath();
//     var param = "{'body':'订单描述','openid':'"+openId+"','mpid':'"+mpid+"','udStateUrl':'"+finishPath+"','money':'"+price
//         +"','trueMoney':'"+price+"','kind':'10325'"+",'storeid':'"+mcId+"','paytypeid':'"+payTypeId+"'"+",'orderId':'"+orderId
//         +"','payFrom':3"+",'payMoney':'"+price+"','ishdfk':'0','goods':[{'goodsName':'手机','price':'99'" +
//         ",'quantity':'1'},{'goodsName':'电视','price':'2','quantity':'2'}]}";
// 	$.ajax({
//         //请求方式
//         type:"post",
//         //请求路径
//         url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/createPayMd5',
//         //是否异步请求
//         async:true,
//         //传参
//         data:{
//             mcId:mcId,
//             data:param
//         },
//         //发送请求前执行方法
// //		beforeSend:function(){ },
//         //成功返回后调用函数
//         success:function(data){
//         	debugger;
//         	if(data.ret == 0){
//         		param = param +"&sign="+data.content;
//         		var path = RESOURCE_PAY_COMMON_IP_PORT+"tcsl/CommPayPage.htm?data="+param;
//                 payOrder(path);
//         	}
//         },
//         //调用出错执行的函数
// //		error:function(){ }
//   });
// }
/**
 * 检查该房型是否可预订
 */
function checkOrder(payTypeId,path){
	var requestPath = getRequestPath();
	//判断房间数量是否足够
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/checkOrder',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            roomTypeId:roomTypeId,
            count:count,
            endDate:endDate,
            startDate:startDate
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	if(data.ret == 0){
        		orderId = data.content;
                if(payTypeId == "" && path != ""){ //前台支付
                    payOrder(path);
                }
                if(payTypeId != "" && path == ""){ //立即支付
                    //getPaySign(payTypeId);
                    var params = getRequestParam();
                    var code = params["code"];
                    getParentOpenId(code,payTypeId);
                }
        	}
        },
        //调用出错执行的函数
//		error:function(){ }
  });
}
/**
 * 获取用户对父公众号(商龙)的openId
 * @param code
 */
function getParentOpenId(code,payTypeId){
    var requestPath = getRequestPath();
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/getParentOpenId',
        //是否异步请求
        async:true,
        //传参
        data:{
            code:code
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var parentOpenId = data.content;
                getPayKey(parentOpenId,payTypeId);
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 获取用于通用支付接口的支付key,跳转通用支付页
 * @param parentOpenId
 */
function getPayKey(parentOpenId,payTypeId) {
    var openId = getCookie("openId");
    var mpid = getCookie("mpId");
    var appid = getCookie("appid");
    var requestPath = getRequestPath();
    var finishPath = requestPath+RESOURCE_PROJECT_NAME+"wechatbooking/customer/templates/WfrmBookStatus.html?frontPay=2";

    var param = {
        "body": "订单描述",
        "storeid": mcId,
        "unionid": "",
        "paySerialNo": "",
        "goods": [

        ],
        "appid": appid,
        "turnUrl": finishPath,
        "payBusinNo": "M20170704456412C",
        "kind": "10325",
        "paytypeid": payTypeId,
        "udStateUrl": "http://o2oapi.wuuxiang.com/tcsl/CommonAddMoneyCommitAction.htm",
        "ishdfk": 0,
        "payMoney": price,
        "cardinfo": [

        ],
        "busiScopeNo": "rechargeCard",
        "money": price,
        "openid": openId,
        "orderid": orderId,
        "mpid": mpid,
        "trueMoney": price,
        "payFrom": 3,
        "items": [
            {
                "itemcount": 1,
                "itemid": "582",
                "itemname": "原始紫菜包饭",
                "price": 10.05,
                "skuinfo": "",
                "remark": "",
                "code": "111"
            }
        ],
        "parentOpenid": parentOpenId
    };
    param = JSON.stringify(param);
    param = "data="+param;
    //绕过安全检测的头信息
    var head = {'isrsa':0};
    head = JSON.stringify(head);
    $.ajax({
        //请求方式
        type:"post",
        dataType:"json",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/getPayKey',
        //是否异步请求
        async:true,
        //传参
        data:{
            requestParam:param,
            headParam:head
        },
        //发送请求前执行方法
        // beforeSend:function(xhr){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var key = data.content;
                var envType = RESOURCE_PAY_TYPE; // 1 测试 2预发布 3正式
                var path =  RESOURCE_PAY_PAGE + "?" +"key="+key+"&envType=" + envType;
                payOrder(path);
            }else{
                alert(data.content);
            }
        },
        error: function (XMLHttpReuqest, textStautus, errothrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpReuqest.readyState);
            console.log(XMLHttpRequest.responseText);
            console.log(textStautus);
            console.log(errothrown);
        }
    });
}
/**
 * 添加订单
 */
function payOrder(path){
	debugger;
	var requestPath = getRequestPath();
	var now = getNowTime();
	var dinerId = getCookie("dinerId");
    var shopName = getCookie("shopName");
    var shopTel = getCookie("orderTel");
	var openId = getCookie("openId");
    var address = getCookie("address",address);
    if(openId == null || openId == "" || openId === undefined){
        alert("WfrmOrderIdentify payOrder() openId is null");
        return;
    }
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/addOrder',
        //是否异步请求
        async:true,
        //传参
        data:{
            orderId:orderId,
			mcId:mcId,
			clinker:clinker,
			ilinktel:ilinktel,
			startDate:startDate,
			endDate:endDate,
			orderTime:now,
			dinerid:dinerId,
			idcard:idNum,
			roomTypeId:roomTypeId,
			count:count,
			price:price,
            roomName:roomName,
            openId:openId,
            shopName:shopName,
            shopTel:shopTel,
            address:address
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	debugger
        	saveCookie("pay_orderId",orderId);
        	saveCookie("pay_price",price);
    		window.location.href = path;
        },
        //调用出错执行的函数
//		error:function(){ }
  });
}
/**
 * 返回当前时间 YYYY-MM-DD HH:mm:ss
 */
function getNowTime(){
	var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year+"-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";
    
    if(hh < 10)
    	clock += "0";
    clock += hh + ":";
    
    if(mm < 10)
    	clock += "0";
    clock += mm + ":";
    
    if(ss < 10)
    	clock += "0";
    clock += ss;

    return (clock);
}
