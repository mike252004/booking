/**
 * 保存cookie
 * @param name
 * @param value
 * @returns {boolean}
 */
function  saveCookie(name,value) {
    document.cookie = name + '=' +encodeURIComponent(value);
    return true;
}
/**
 * 获取cookie中指定参数
 * @param cookieName
 * @returns value
 */
function getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return decodeURIComponent(arr[1]);
        }
    }
    return "";
}
/**
 * 获取房间名称
 * @param {Object} roomType 房间类型
 */
function getRoomName(roomType){
	switch(roomType){
		case "standard_room":
			return "标准间";
		case "single_suite":
			return "单人套房";
		case "deluxe_single_room":
			return "豪华单间";
		case "double_suite":
			return "双人套房";
		case "deluxe_commerce_room":
			return "豪华商务单人间";
		case "outdoor_scene":
			return "酒店外景";
		default:
			return "";
	}
}
/**
 * 获取后台接口请求路径
 */
function getRequestPath(){
	var localPaths = (window.document.location.href).split("/",3);
    var requestPath;
    for(var i = 0; i < localPaths.length; i++){
    	if(i == 2){
    		requestPath = "http://"+localPaths[i]+"/";
    	}
    }
    return requestPath;
}
/**
 * 参数非空判断
 * @param params 待检查参数
 */
function checkEmpty(params){
	if(params == null || params === undefined){
		return false;
	}
	for(var i=0; i<params.length; i++){
		if(params[i] == null || params[i] == "" || params[i] === undefined){
			return false;
		}
	}
	return true;
}
/**
 * 创建指定位数随机整数
 * @param num 指定位数
 */
function  getRandomDigit(num) {
	var rnd="";
	for(var i=0;i<num;i++)
		rnd+=Math.floor(Math.random()*10);
	return rnd;
}
/**
 * 获取设施类别名称
 * @param name
 */
function getMantainName(name) {
	switch(name){
		case "room_menu":
			return "客房设施";
		case "multiple_menu":
			return "综合设施";
		case "server_menu":
			return "服务项目";
		case "entertainment_menu":
			return "娱乐设施";
		default:
			return "";
	}
}
/**
 * 获取设施类别代号
 * @param name
 * @returns {*}
 */
function getEnName(name) {
    switch(name){
        case "客房设施":
            return "room_menu";
        case "综合设施":
            return "multiple_menu";
        case "服务项目":
            return "server_menu";
        case "娱乐设施":
            return "entertainment_menu";
        default:
            return "";
    }
}
/**
 * Description:重写格式化时间方法
 * Example:
 * 		var now = new Date();
 * 		var nowFmt = now.Format("yyyy-MM-dd hh:mm:ss");
 * 		console.info("格式化当前时间",nowFmt);
 */
Date.prototype.Format = function (fmt) {
    //author: meizz
    var o =
    {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + 						o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * Description:获得指定变化值后的时间
 * @param {Object} day变化的时间长度
 * Example:
 * 		var date = getDay(-30);
 * 		console.info("相对当前倒退30天后时间",date);
 */
function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码    
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}
function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
    	m = "0" + month;
    }
    return m;
}
/**
 * 获取请求页面中的参数
 * Example:http://requestPath/WfrmMain.html?参数一=123&参数二=456
 * 方法返回参数数组,console结果为:[参数一:"123",参数二:"456"]
 */
function getRequestParam(){
	var url = location.search;
	var paramArray = [];
	var params = url.substring(1).split("&");
	for(var i=0;i<params.length;i++){
		var key = params[i].split("=")[0];
		var value = params[i].split("=")[1];
		paramArray[key] = value;
	}
	return paramArray;
}
/**
 * 获取指定时间后一天时间
 * @param {Object} now 指定时间的年月日字符串格式
 * Example: var time = yestoday('2016-09-24')  返回值为 '2016-09-25'
 */
function yestodayTime(now) {
	var time = new Date(now);
	time = +time + 1000*60*60*24;
	time = new Date(time);
	var month = time.getMonth();
	if(month < 10){
		month = "0" + (month+1);
	}
	var day = time.getDate();
	if(day < 10){
		day = "0" + day;
	}
	return time.getFullYear() + "-" + month + "-" + day;
}/**
  * 获取当前时间 YYYY-MM-DD
  * Example:var now = currentTime();  返回值 "2016-09-24"
  */
function currentTime() {
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

    return (clock);
}
