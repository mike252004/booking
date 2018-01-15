var orderId;
var frontPay;
window.onload = function(){
	init();
}
function init(){
	var params = getRequestParam();
    frontPay = params["frontPay"];
    //订单号
    orderId = getCookie("pay_orderId");
    $("#order_id").html(orderId);
    //支付金额
    var price = getCookie("pay_price");
    $("#order_price").html(price);
    //商户名称
    var shopName = getCookie("shopName");
    $("#shop_name").html(shopName);
    //商户地址
    var address = getCookie("address");
    $("#shop_address").html(address);
    //商户电话
    var orderTel = getCookie("orderTel");
    $("#shop_tel").html(orderTel);
    if(frontPay != null && frontPay != "" && frontPay !== undefined && frontPay == "1"){
        $("#pay_type").html("前台支付");
        var a = document.createElement("a");
        a.className = "am-icon-btn am-success am-icon-check";
        var span = document.createElement("span");
        span.innerHTML = " 预订成功！";
        $("#order_flag").append(a);
        $("#order_flag").append(span);
        return;
    }
    if(frontPay != null && frontPay != "" && frontPay !== undefined && frontPay == "2"){
        $("#pay_type").html("网上支付");
        finishPay();
    }else{
        $("#pay_type").html("未支付");
        var a = document.createElement("a");
        a.className = "am-icon-btn am-danger am-icon-close";
        var span = document.createElement("span");
        span.innerHTML = " 预订支付失败！";
        $("#order_flag").append(a);
        $("#order_flag").append(span);
    }
}
function finishPay(){
    var requestPath = getRequestPath();
    $.ajax({
    //请求方式
    type:"post",
    //请求路径
    url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/finishPay',
    //是否异步请求
    async:true,
    //传参
    data:{
        id:orderId
    },
    //发送请求前执行方法
//		beforeSend:function(){ },
    //成功返回后调用函数
    success:function(data){
        var a = document.createElement("a");
        a.className = "am-icon-btn am-success am-icon-check";
        var span = document.createElement("span");
        span.innerHTML = " 预订成功！";
        $("#order_flag").append(a);
        $("#order_flag").append(span);
    },
    //调用出错执行的函数
//		error:function(){ }
    });
	
}
