var gcId;
var dinerId;
var openId;
var mpId;
$(function(){
	$('.con').fullpage({
	    navigation: true,
	    anchors: [],
	    menu: '.menu',
	    navigationTooltips: [],
	    verticalCentered:false,
	});
	//获取请求参数
	getParam();
})
function getParam(){
	//获取请求参数
	var params = getRequestParam();
	gcId = params["gcid"];
	dinerId = params["dinerid"];
	openId = params["openid"];
	mpId = params["mpid"];
	var appid = params["appid"]; //所在公众号appid
	var values = [gcId,dinerId,openId,mpId,appid];
	if(!checkEmpty(values)){
		return;
	}
    saveCookie("dinerId",dinerId);
	saveCookie("openId",openId);
	saveCookie("mpId",mpId);
	saveCookie("appid",appid);
}
function onclick_wcBook(){
	var url = "../templates/WfrmOrder.html?gcid="+gcId +"&dinerid="+ dinerId +"&openid="+ openId +"&mpid="+ mpId;
	window.location.href = url;
}
function onclick_mapBook(){
	var url = "../templates/WfrmMapBook.html?gcid="+gcId;
	window.location.href = url;
}
function onclick_order(){
    saveCookie("gcId",gcId);
	var url = "../templates/WfrmOrderSearch.html?gcid="+gcId +"&dinerid="+ dinerId +"&openid="+ openId +"&mpid="+ mpId;
	window.location.href = url;
}
