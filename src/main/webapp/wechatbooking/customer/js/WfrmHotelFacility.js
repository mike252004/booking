window.onload = function(){
	init();
}
function init(){
	var params = getRequestParam();
	var mcId = params["mcid"];
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelDetail/queryFacility',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            var content = data.content;
            //酒店名称
            var hotelName = content.name;
            $("#hotel_name").html(hotelName);
            //酒店描述
            var hotelDesp = content.desp;
            $("#hotel_desp").html(hotelDesp);
            //客房设施
            var roomList = content.roomList;
            for (var i=0;i<roomList.length;i++){
                var itemName = roomList[i].itemname;
                var itemDesp = roomList[i].itendesp;
                var li = createItem(itemName,itemDesp);
                $("#room_menu").append(li);
            }
            //综合设施
            var multipleList = content.multipleList;
            for (var i=0;i<multipleList.length;i++){
                var itemName = multipleList[i].itemname;
                var itemDesp = multipleList[i].itendesp;
                var li = createItem(itemName,itemDesp);
                $("#multiple_menu").append(li);
            }
            //服务项目
            var serverList = content.serverList;
            for (var i=0;i<serverList.length;i++){
                var itemName = serverList[i].itemname;
                var itemDesp = serverList[i].itendesp;
                var li = createItem(itemName,itemDesp);
                $("#server_menu").append(li);
            }
            //娱乐设施
            var toyList = content.toyList;
            for (var i=0;i<toyList.length;i++){
                var itemName = toyList[i].itemname;
                var itemDesp = toyList[i].itendesp;
                var li = createItem(itemName,itemDesp);
                $("#entertainment_menu").append(li);
            }
        },
        //调用出错执行的函数
//		error:function(){ }
   });
}
/**
 * 创建设施模块
 * @param {Object} itemName 设施名称
 * @param {Object} itemDesp 设施描述
 */
function createItem(itemName,itemDesp){
	var li = document.createElement("li");
	li.innerHTML =  "<fieldset class='ui-grid-a'>" +
                        "<div class='ui-block-a'>"+itemName+"</div>" +
                        "<div class='ui-block-a'>" +
                            "<pre>"+itemDesp+"</pre>" +
                        "</div>" +
                    "</fieldset>";
    return li;
}
