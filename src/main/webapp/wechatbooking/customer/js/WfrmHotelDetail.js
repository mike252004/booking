var mcId;
var dinerId;
var openId;
var mpId;
/**
 * 初始化时间按钮
 */
$(function() {
	var params = getRequestParam();
	mcId = params["mcid"];
	dinerId = params["dinerid"];
	openId = params["openid"];
	mpId = params["mpid"];
	var startDate = currentTime();
	var endDate = currentTime(1);
    var $alert = $('#my-alert');
    $('#my-start').datepicker().on('changeDate.datepicker.amui', function(event) {
        $alert.hide();
        startDate = event.date.Format("yyyy-MM-dd");
        $('#my-start').attr('value',startDate);
        $(this).datepicker('close');
  	});

    $('#my-end').datepicker().on('changeDate.datepicker.amui', function(event) {
    	var eventTime = event.date.valueOf();
    	var startTime = new Date(startDate).valueOf();
        if (eventTime <= startTime) {
          $alert.find('p').text('结束日期应大于开始日期！').end().show();
        } else {
            $alert.hide();
            endDate = event.date.Format("yyyy-MM-dd");
            $('#my-end').attr('value',endDate);
            $("#myRoomList").empty();
          	init(startDate,endDate);
        }
        $(this).datepicker('close');
  	});
  	$('#my-start').attr('value',startDate);
  	$('#my-end').attr('value',endDate);
  	var nextDay;
  	init(startDate,nextDay);
});

function init(startDate,endDate){
	var requestPath = getRequestPath();
	//test
	//TODO
    // startDate = '2016-12-19';
    // endDate = '2016-12-20';
    //test end
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelDetail/queryHotelDetail',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            startDate:startDate,
            endDate:endDate
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var content = data.content;
                var name = content.name; //商户名称
                $("#hotel_name").html(name);
                var address = content.address; //商户地址
                $("#hotel_address").html(address);
                var phone = content.phone; //商户电话
                $("#hotel_phone").html(phone);
                var roomList = content.roomInfoList; //房间列表
                //创建酒店外景图片
                if($("#hotel_img").find("img").length == 0){
                	var hotelImg = content.hoteImg; //酒店外景图片名称
	                var img = document.createElement("img");
					//拼接访问路径
					var requestUrl = RESOURCE_NGINX_DOMAIN_NAME + "/image/"+name+"/outdoor_scene/"+hotelImg;
	            	img.src = requestUrl;
	            	img.className = "am-img-responsive";
	            	img.style = "margin:auto";
	            	$("#hotel_img").append(img);
                }
                for(var i=0; i<roomList.length; i++){
                	var roomTypeId = roomList[i].croomtypeid;
                	var price = roomList[i].mprice;
                	var roomName = roomList[i].cname;
                	var imgName = roomList[i].imgName;
                	createItem(roomTypeId,price,roomName,imgName,name);
                } 
            }
            $('p').on('click',function(e){
				var orderRoom = e.target;
				var roomTypeId = orderRoom.id;
				if(roomTypeId != null && roomTypeId != "" && roomTypeId !== undefined){
					onclick_order(roomTypeId);
				}
			});
        },
        //调用出错执行的函数
//		error:function(){ }
   });
   
}/**
  * 创建房间模块
  * @param {Object} roomTypeId
  * @param {Object} price
  * @param {Object} roomName
  * @param {Object} imgName
  * @param {Object} shopName
  * Example:
  * <li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">
	    <div class="am-u-sm-4 am-list-thumb">
	        <img src="../images/hotelDefault.jpg"/>
	    </div>
	    <p class="am-badge am-badge-warning am-text-lg">预订</span>
	    <span class="am-badge am-badge-warning am-text-lg">￥200</span> 
	    <strong>商务大床房</strong>
	</li>
  */
function createItem(roomTypeId,price,roomName,imgName,shopName){
	var li = document.createElement("li");
	li.className = "am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left";
	//房间图片
	var imgDiv = document.createElement("div");
	imgDiv.className = "am-u-sm-4 am-list-thumb";
	var img = document.createElement("img");
	var requestUrl = RESOURCE_NGINX_DOMAIN_NAME + "/image/"+shopName+"/"+roomName+"/"+imgName;
	img.src = requestUrl;
	img.onerror = function(){
		img.src = "../images/roomDefault.jpg";
	};
	imgDiv.appendChild(img);
	li.appendChild(imgDiv);
	//预定按钮
	var pOrder = document.createElement("p");
	pOrder.clsName = "am-badge am-badge-warning am-text-lg";
	pOrder.innerHTML = "预定";
	pOrder.id = roomTypeId;
	pOrder.style = "cursor:pointer";
	pOrder.className = "am-badge am-badge-warning am-text-lg";
	li.appendChild(pOrder);
	//价格
	var pPrice = document.createElement("p");
	pPrice.innerHTML = "￥"+price;
	pPrice.className = "am-badge am-badge-warning am-text-lg";
	li.appendChild(pPrice);
	//房间名称
	var strong = document.createElement("strong");
	strong.innerHTML = roomName;
	li.appendChild(strong);
	$("#myRoomList").append(li);
}
function onclick_order(roomTypeId){
	var begDate = $('#my-start').attr('value').trim();
	var endDate = $('#my-end').attr('value').trim();
	var errStatus = $('#my-alert').css('display');  //错误提示信息 none 隐藏   block 显示
    // TODO
    // begDate = '2016-12-19';
    // endDate = '2016-12-20';
	if(errStatus == "none"){
		var url = "../templates/WfrmBookDetail.html?mcId="+mcId
		+"&roomTypeId="+roomTypeId+"&begDate="+begDate+"&endDate="+endDate;
		window.location.href = url;
	}
}
/*
 * 显示酒店设施页面
 */
function onclick_hotel(){
	var url = "../templates/WfrmHotelFacility.html?mcid="+mcId;
	window.location.href = url;
}
