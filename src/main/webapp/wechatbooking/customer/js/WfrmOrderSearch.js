var mcId;
var gcId;
var dinerId;
var openId;
var mpId;
window.onload = function(){
	query();
}
/**
 * 查询显示数据
 */
function query(){
	//获取请求参数
	var params = getRequestParam();
	gcId = params["gcid"];
	dinerId = params["dinerid"];
	openId = params["openid"];
	mpId = params["mpid"];
	var values = [gcId,dinerId,openId,mpId];
	if(!checkEmpty(values)){
		return;
	}
//  saveCookie("dinerId",dinerId);
//	saveCookie("openId",openId);
//	saveCookie("mpId",mpId);
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
                var content = data.content;
                var name;
                var address;
                var orderTel;
                for(var i=0;i<content.length;i++){
                	address = content[i].address;
                	mcId = content[i].mcid;
                	name = content[i].name;
                	var imgName = content[i].hoteImg;
                    orderTel = content[i].ordertel;
                	createHotelItem(address,name,imgName,orderTel);
                }
                var size = content.length - 0;
                if(size == 1){
                	var hotel = {id:"shopName-zty-"+name+"-zty-"+address+"-zty-"+orderTel};
                	onclick_hotel(hotel);
                }
                $('a').on('click',function(e){
					var hotel = e.target;
					onclick_hotel(hotel);
				});
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
	saveCookie("customer-mcId",mcId);
	// window.location.href = "../templates/WfrmMyOrder.html";

    var requestPath = getRequestPath();
    var redirect_uri = requestPath+RESOURCE_PROJECT_NAME+"wechatbooking/customer/templates/WfrmMyOrder.html";
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
