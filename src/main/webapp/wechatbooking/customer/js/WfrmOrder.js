var mcId;
var gcId;
var dinerId;
var openId;
var mpId;
var content; //后台查询出的酒店列表
$(function(){
    //屏蔽掉初始定位城市查询该城市酒店列表功能
    //initLocation();
    var city = "";
    query(city);
	initSearchEvent();
})
/*
 * 初始化城市选择框,定位所在城市
 */
function initLocation(){
	//初始化城市选择框
	$(".city").CityPicker();
    //根据百度地图api 根据浏览器h5特性定位所在城市
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            currentLat = r.point.lat;   //当前维度
            currentLon = r.point.lng;   //当前经度
            var pt = new BMap.Point(currentLon, currentLat);
            var geoc = new BMap.Geocoder();
            geoc.getLocation(pt, function (rs) {
                var addComp = rs.addressComponents;
                var cityName = addComp.city;
                cityOpration(cityName);
            })
        }else{
            //根据ip自动定位
            map = new BMap.Map("allmap"); //创建地图实例
            var point = new BMap.Point(0,0); //创建坐标点
            map.centerAndZoom(point,12); //初始化地图 设置中心店，显示级别
            function myFun(result){
                cityOpration(result.name);
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        }
    })
	
}
/**
 * 定位城市成功后操作
 * @param cityName 定位所在城市名称
 */
function cityOpration(cityName) {
    $('#selectPosition').val(cityName); //城市选择框初始化
    query(cityName);
}
/**
 * 绑定查询框事件
 */
function initSearchEvent(){
	$('#searchBox').on('input',function(e){
		filterContent();
	});
}
/**
 * 过滤显示列表
 * @param {Object} value
 */
function filterContent(){
	$('#hotel_list').children().remove(); //清空酒店列表
	var value = $('#searchBox').val(); //搜索框内容
	if(value == null || value == "" || value === undefined){ //搜索内容为空，显示全部酒店列表
		for(var i=0;i<content.length;i++){
            var address = content[i].address;
            mcId = content[i].mcid;
            var name = content[i].name;
            var imgName = content[i].hoteImg;
            var orderTel = content[i].ordertel;
            createHotelItem(address,name,imgName,orderTel);
       }
	}else{ //搜索内容不为空，过滤酒店列表
		for(var i=0;i<content.length;i++){
            var address = content[i].address;
            mcId = content[i].mcid;
            var name = content[i].name;
            var imgName = content[i].hoteImg;
            var orderTel = content[i].ordertel;
            var checkName = name.indexOf(value); //判断名称中是否符合过滤条件  -1不符合
            var checkAddress = address.indexOf(value); //判断地址中是否符合过滤条件  -1不符合
            if(checkName != -1 || checkAddress != -1){
            	createHotelItem(address,name,imgName,orderTel);
            }
       }
	}
	$('.am-list-item-hd a').on('click',function(e){
        var hotel = e.target;
        onclick_hotel(hotel);
    });
}
/**
 * 查询显示数据
 */
function query(cityName){
    //获取请求参数
    var params = getRequestParam();
    gcId = params["gcid"];
    dinerId = params["dinerid"];
    openId = params["openid"];
    mpId = params["mpid"];
    var values = [gcId,dinerId,openId,mpId];
    if(!checkEmpty(values)){
        console.error("WfrmOrder gcid/dinerid/openid/mpid is null");
        return;
    }
//  saveCookie("dinerId",dinerId);
//  saveCookie("openId",openId);
//  saveCookie("mpId",mpId);
    var requestPath = getRequestPath();
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelDetail/queryHotelList',
        //是否异步请求
        async:true,
        //传参
        data:{
            gcId:gcId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                content= data.content;
                filterContent();
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 创建酒店
 * @param {Object} address 酒店地址
 * @param {Object} name 酒店名称
 * @param {Object} imgName 酒店图片名称
 * Example:<li  class='am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left'>
 <div class='am-u-sm-4 am-list-thumb'>
 <img src="http://localhost:808/image/123.jpg" />
 </div>
 <div class=' am-u-sm-8 am-list-main'>
 <h3 class='am-list-item-hd'>
 <a>吾享网络测试 传值mcid=1221 dinerid = 订单id</a>
 </h3>
 <div class='am-list-item-text' style='width: 250px; padding: 10px;'>
 天津市南开区
 </div>
 <div class='am-list-item-hd'>
 <p class='am-text-xxl am-text-warning'>

 </p>
 </div>
 </div>
 </li>
 */
function createHotelItem(address,name,imgName,orderTel){
    var ul = document.getElementById("hotel_list");
    var li = document.createElement("li");
    li.className = "am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left";
    var imgDiv = document.createElement("div");
    imgDiv.className = "am-u-sm-4 am-list-thumb";
    //拼接访问路径
    var img =document.createElement("img");
    var requestUrl;
    if(imgName == null || imgName == "" || imgName === undefined){
        requestUrl = "../images/hotelDefault.jpg";
    }else{
        requestUrl = RESOURCE_NGINX_DOMAIN_NAME + "/image/"+name+"/outdoor_scene/"+imgName;
    }
    img.src = requestUrl;
    imgDiv.appendChild(img);
    li.appendChild(imgDiv);
    //酒店主要内容
    var divMain = document.createElement("div");
    divMain.className = "am-u-sm-8 am-list-main";
    //酒店名称
    var h3 = document.createElement("h3");
    h3.className = "am-list-item-hd";
    var a = document.createElement("a");
    a.innerHTML = name;
    a.id = "shopName-zty-"+name+"-zty-"+address+"-zty-"+orderTel;
    a.style = "cursor:pointer";
    h3.appendChild(a);
    divMain.appendChild(h3);
    //酒店地址
    var addressDiv = document.createElement("div");
    addressDiv.className = "am-list-item-text";
    addressDiv.style = "width: 250px; padding: 10px;";
    addressDiv.innerHTML = address;
    divMain.appendChild(addressDiv);
    //提示内容
    var tipDiv = document.createElement("div");
    tipDiv.className = "am-list-item-hd";
    var p = document.createElement("p");
    p.className = "am-text-xxl am-text-warning";
    tipDiv.appendChild(p);
    divMain.appendChild(tipDiv);
    li.appendChild(divMain);
    ul.appendChild(li);
}
function onclick_hotel(hotel){
    var id = hotel.id.split("-zty-");
    var shopName = id[1];
    var address = id[2];
    var orderTel = id[3];
    saveCookie("shopName",shopName);
    saveCookie("address",address);
    saveCookie("orderTel",orderTel);
    var url = "../templates/WfrmHotelDetail.html?mcid="+mcId+"&dinerid="+dinerId+"&openid="+openId+"&mpid="+mpId;
    window.location.href = url;

}
/**
 * 切换城市
 * @param {Object} name
 */
function changeLocalCity(name){
	$('#selectPosition').val(name); //城市选择框赋值
	query(name); //切换城市重新刷新数据
}

