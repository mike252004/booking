window.onload = function(){
    init();
}
function init() {
    var requestPath = getRequestPath();
    var mcId = getCookie("mcId");
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'facilityMatain/queryFacility',
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
            var roomList = content.roomList;
            var multipleList = content.multipleList;
            var serverList = content.serverList;
            var toyList = content.toyList;
            //创建客房设施
            for (var i=0 ; i<roomList.length ; i++){
                var itemId = roomList[i].ITEMID;
                var menuTitle = getEnName(roomList[i].ITENCLASS);
                var div = createItem(itemId,menuTitle,true);
                $("#myPanel").append(div);
                document.getElementById("itemTitle" + itemId).value = roomList[i].ITEMNAME;
                document.getElementById("itemDesp" + itemId).value = roomList[i].ITENDESP;
            }
            //创建综合设施
            for (var i=0 ; i<multipleList.length ; i++){
                var itemId = multipleList[i].ITEMID;
                var menuTitle = getEnName(multipleList[i].ITENCLASS);
                var div = createItem(itemId,menuTitle,true);
                $("#myPanel1").append(div);
                document.getElementById("itemTitle" + itemId).value = multipleList[i].ITEMNAME;
                document.getElementById("itemDesp" + itemId).value = multipleList[i].ITENDESP;
            }
            //创建服务项目
            for (var i=0 ; i<serverList.length ; i++){
                var itemId = serverList[i].ITEMID;
                var menuTitle = getEnName(serverList[i].ITENCLASS);
                var div = createItem(itemId,menuTitle,true);
                $("#myPanel2").append(div);
                document.getElementById("itemTitle" + itemId).value = serverList[i].ITEMNAME;
                document.getElementById("itemDesp" + itemId).value = serverList[i].ITENDESP;
            }
            //创建娱乐设施
            for (var i=0 ; i<toyList.length ; i++){
                var itemId = toyList[i].ITEMID;
                var menuTitle = getEnName(toyList[i].ITENCLASS);
                var div = createItem(itemId,menuTitle,true);
                $("#myPanel3").append(div);
                document.getElementById("itemTitle" + itemId).value = toyList[i].ITEMNAME;
                document.getElementById("itemDesp" + itemId).value = toyList[i].ITENDESP;
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
function add(menuTitle){
	if(menuTitle == "room_menu"){
		var menuId = getRandomDigit(9); //获取9位随机数
		var div = createItem(menuId,menuTitle);
		$("#myPanel").append(div);
	}
	if(menuTitle == "multiple_menu"){
		var menuId = getRandomDigit(9); //获取9位随机数
		var div = createItem(menuId,menuTitle);
		$("#myPanel1").append(div);
	}
	if(menuTitle == "server_menu"){
		var menuId = getRandomDigit(9); //获取9位随机数
		var div = createItem(menuId,menuTitle);
		$("#myPanel2").append(div);
	}
	if(menuTitle == "entertainment_menu"){
		var menuId = getRandomDigit(9); //获取9位随机数
		var div = createItem(menuId,menuTitle);
		$("#myPanel3").append(div);
	}
}
function  createItem(menuId,menuTitle,flag) {
    var div;
    if(flag == true){
        div = $(
            " <div id='myDiv" + menuId + "'>" +
            "<div class='am-input-group am-u-sm-8 am-input-group-primary'>" +
            "<span class='am-input-group-label'>" +
            "<i class='am-icon-hotel am-icon-fw'></i>" +
            "</span>" +
            "<div id='titlePanel" + menuId + "'>" +
            "	<input type='text' id='itemTitle" + menuId + "' class='am-form-field' placeholder='项目名称'>" +
            "</div>" +
            "<span class='am-input-group-label'>" +
            "<i class='am-icon-bookmark am-icon-fw'>" +
            "</i>" +
            "</span>" +
            "<div id='despPanel" + menuId + "'>" +
            "<input type='text' id='itemDesp" + menuId + "' class='am-form-field' placeholder='项目备注'>" +
            "</div>" +
            "</div>" +
            "<div class='am-input-group am-u-sm-1 am-input-group-primary'>" +
            "<button type='button' onclick=cancel('" +menuTitle +";"+ menuId + "') id='btnRemove" + menuId + "' class='am-btn am-btn-default'>" +
            "<span class='am-icon-close'></span> 删除</button>" +
            "</div>" +
            "<br/><br/><br/>" +
            "</div>"
        );
    }else {
        div = $(
            " <div id='myDiv" + menuId + "'>" +
            "<div class='am-input-group am-u-sm-8 am-input-group-primary'>" +
            "<span class='am-input-group-label'>" +
            "<i class='am-icon-hotel am-icon-fw'></i>" +
            "</span>" +
            "<div id='titlePanel" + menuId + "'>" +
            "	<input type='text' id='itemTitle" + menuId + "' class='am-form-field' placeholder='项目名称'>" +
            "</div>" +
            "<span class='am-input-group-label'>" +
            "<i class='am-icon-bookmark am-icon-fw'>" +
            "</i>" +
            "</span>" +
            "<div id='despPanel" + menuId + "'>" +
            "<input type='text' id='itemDesp" + menuId + "' class='am-form-field' placeholder='项目备注'>" +
            "</div>" +
            "</div>" +
            "<div class='am-input-group am-u-sm-1 am-input-group-primary'>" +
            "<button type='button' onclick=save('" +menuTitle +";"+ menuId + "') id='btnSave" + menuId + "' class='am-btn am-btn-primaryam-btn am-btn-primary'>" +
            "<span class='am-icon-check'></span> 确认</button>" +
            "</div>" +

            "<div class='am-input-group am-u-sm-1 am-input-group-primary'>" +
            "<button type='button' onclick=cancel('" +menuTitle +";"+ menuId + "') id='btnRemove" + menuId + "' class='am-btn am-btn-default'>" +
            "<span class='am-icon-close'></span> 取消</button>" +
            "</div>" +
            "<br/><br/><br/>" +
            "</div>"
        );
    }
	return div;
}
/**
 * 保存添加设施
 * @param item
 */
function save(item){
    var requestPath = getRequestPath();
    var infos = item.split(";");
    var itemClass = getMantainName(infos[0]);
    var itemId = infos[1];
    var itemName =  $("#itemTitle" + itemId).val();
    var itemDes = $("#itemDesp" + itemId).val();
    var mcId = getCookie("mcId");
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'facilityMatain/addFacility',
        //是否异步请求
        async:true,
        //传参
        data:{
            itemName:itemName,
            itemDes:itemDes,
            itemId:itemId,
            itemClass:itemClass,
            mcId:mcId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            //隐藏确定按钮
            var btnSave = $("#btnSave" + itemId);
            btnSave.hide();
            //将取消按钮修改为删除按钮
            var btnDelete = $("#btnRemove" + itemId);
            btnDelete.html("<span class='am-icon-close'></span> 删除");
        },
        //调用出错执行的函数
//		error:function(){ }
    });

}
/**
 * 取消/删除 设施
 * @param item
 */
function cancel(item){
    var requestPath = getRequestPath();
    var infos = item.split(";");
    var itemClass = getMantainName(infos[0]);
    var itemId = infos[1];
    var itemName =  $("#itemTitle" + itemId).val();
    var mcId = getCookie("mcId");
    var myDiv = $("#myDiv" + itemId);
    if ($("#btnRemove" + itemId).text() == " 取消") {
        myDiv.remove();
    }
    if ($("#btnRemove" + itemId).text() == " 删除"){
        $.ajax({
            //请求方式
            type:"post",
            //请求路径
            url:requestPath+RESOURCE_PROJECT_NAME+'facilityMatain/deleteFacility',
            //是否异步请求
            async:true,
            //传参
            data:{
                itemName:itemName,
                itemId:itemId,
                itemClass:itemClass,
                mcId:mcId
            },
            //发送请求前执行方法
//		beforeSend:function(){ },
            //成功返回后调用函数
            success:function(data){
                myDiv.remove();
            },
            //调用出错执行的函数
//		error:function(){ }
        });
    }
}
