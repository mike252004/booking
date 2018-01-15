var longitude; //经度
var latitude; //维度
var name; //城市名称
var map;
window.onload = function(){
	var $mcId;
	init();
}
/**
 * 初始化地图
 */
function initMap(){
	if((longitude == null && latitude == null) || 
		(longitude == 0 && latitude == 0)){
		//根据ip自动定位
		var point = new BMap.Point(0,0); //创建坐标点
		map.centerAndZoom(point,15); //初始化地图 设置中心点，显示级别
		function myFun(result){
			var cityName = result.name;
			map.setCenter(cityName);
			getCityName(cityName);
		}
		function getCityName(cityName){ //获取根据ip定位城市名称
			name = cityName;
		}
		var myCity = new BMap.LocalCity();
		myCity.get(myFun);
	}
}
/**
 * 初始化页面数据
 */
function init(){
	//初始化选择城市控件
	$('#citySelect').kuCity();
	var requestPath = getRequestPath();
    $mcId = getCookie("mcId");
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelInfo/queryInfo',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:$mcId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            var hotel = data.content;
            var hotelName = hotel.hotelName;
            var phoneNum = hotel.phoneNum;
            var address = hotel.address;
            var desp = hotel.description;
            var city =  hotel.cityName; //酒店所在城市名称
            longitude = hotel.longtitude; //酒店所在纬度
            latitude = hotel.latitude; //酒店所在经度
            document.getElementById("hotel_name").value = hotelName;
            document.getElementById("phone_num").value = phoneNum;
            document.getElementById("hotel_address").value = address;
            document.getElementById("hotel_desp").value = desp;
            document.getElementById("citySelect").value = city;
            //初始化地图
            map = new BMap.Map("allmap"); //创建地图实例
            map.clearOverlays(); //清除地图中所有图层
            var point = new BMap.Point(longitude,latitude); //创建坐标点
            var marker = new BMap.Marker(point);  // 创建标注，为要查询的地址对应的经纬度
			map.addOverlay(marker);
			map.centerAndZoom(point,15); //初始化地图 设置中心点，显示级别
			
			initMap();
			//酒店定位按钮点击事件
			$('#btnLocation').on('click',function(){
				map.clearOverlays(); //清除地图中所有图层
				//根据城市名称进行本地搜索
				var address = document.getElementById("hotel_address").value; //选择地址
				name = document.getElementById("citySelect").value; //选择城市
				var localSearch = new BMap.LocalSearch( 
					name,
					{renderOptions:{
						map:map,
						autoViewport:true //地图可以缩放
					}});
				
				localSearch.setSearchCompleteCallback(function (searchResult) {
					//获取酒店地址定位经纬度
					if(searchResult === undefined || searchResult.getPoi(0) === undefined){
						longitude = 0;
						latitude = 0;
					}else{
						var poi = searchResult.getPoi(0);
						longitude = poi.point.lng;
						latitude = poi.point.lat;
						map.centerAndZoom(poi.point, 15);
					}
		　　		});
				localSearch.search(address);
			});
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
function onclick_btnSave(){
	var hotelName = $("#hotel_name").val();
	var saveIcon = document.getElementById("saveIcon");
	saveIcon.style = "display:''";
	//酒店名称校验
    if(hotelName == null || hotelName == "" || hotelName === undefined){
    	onblur_hotelName();
    	saveIcon.style = "display:none";
    	return;
   	}
    //酒店定位经度校验
    if(longitude == null || longitude == "" || longitude === undefined ||
    	latitude == null || latitude == "" || latitude === undefined){
    	$('#msg').text("酒店定位失败");
    	var modal = $('#my-alert');
        modal.modal('toggle');
    	saveIcon.style = "display:none";
    	return;
    }
	var requestPath = getRequestPath();
    var phoneNum = $("#phone_num").val();
    var address = $("#hotel_address").val();
    var description = $("#hotel_desp").val();
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelInfo/updateInfo',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:$mcId,
            hotelName:hotelName,
            phoneNum:phoneNum,
            address:address,
            description:description,
            cityName:name,
            longtitude:longitude,
            latitude:latitude
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                saveIcon.style = "display:none";
                $('#msg').text("保存成功！");
                var modal = $('#my-alert');
                modal.modal('toggle');
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
	
}
function onblur_hotelName(){
	var hotelName = $("#hotel_name").val();
	if(hotelName == null || hotelName == "" || hotelName === undefined){
    	document.getElementById("hotel_name_box").className = "am-form-group am-form-error am-form-icon am-form-feedback am-u-sm-8 am-u-md-4";
   }else{
		document.getElementById("hotel_name_box").className = "am-form-group am-form-icon am-form-feedback am-u-sm-8 am-u-md-4";
	}
}
