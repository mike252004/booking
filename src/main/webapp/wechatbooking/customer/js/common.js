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
 * 重写格式化时间方法
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
 * 获得指定变化值后的时间
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
	time = time + 1000*60*60*24;
	time = new Date(time);
	var month = time.getMonth()+1;
	if(month < 10){
		month = "0" + month;
	}
	var day = time.getDate() - 0;
	if(day < 10){
		day = "0" + day;
	}
	return time.getFullYear() + "-" + month + "-" + day;
}
/**
  * 获取当前时间 YYYY-MM-DD
  * Example:var now = currentTime();  返回值 "2016-09-24"
  */
function currentTime(num) {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day;
    if(num == null || num == "" || num === undefined){
    	num = 0;
    }
    day = now.getDate() + num;
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
