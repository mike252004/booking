window.onload = function(){
	init();
}
function init(){
	var mcId = getCookie("mcId");
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelDetail/queryRoomList',
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
            if(data.ret == 0){
                var roomList = data.content;
                for(var i=0; i<roomList.length; i++){
                	var typeId = roomList[i].croomtypeid;
                	var roonName = roomList[i].cname;
                	createItem(typeId,roonName);
                }
            }           
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 创建房间模块
 * @param {Object} typeId
 * @param {Object} roonName
 */
function createItem(typeId,roomName){
	var tr = document.createElement("tr");
	tr.innerHTML = "<td>" +
		"<span style='color: #23ABF0;'>"+roomName+"</span>" +
		"</td>" +
		"<td>" +
		"<div class='am-btn-toolbar'>" +
		"<div class='am-btn-group am-btn-group-xs'>" +
		"<button onclick=\"onclick_btnUploadPhoto('"+roomName+"')\" class='am-btn am-btn-default am-btn-xs am-text-secondary'>" +
	"<span class='am-icon-upload'></span> 上传图片</button>" +
	"<button onclick=\"onclick_btnLookPhoto('"+roomName+"')\" class='am-btn am-btn-default am-btn-xs " +
	"<span class='am-icon-photo'></span> 查看图片</button>" +
	"</div>" +
	"</div>" +
	"</td>"
	$("#room_list").append(tr);
}
function loadPage(src){
	window.open(src,'displayContent');
}

/**
 * 上传图片
 * @param {Object} roomType
 */
function onclick_btnUploadPhoto(roomName){
	if(roomName == null || roomName == "" || roomName == undefined){
		console.error("WfrmRoomPhoto roomName is null");
	}
	var displatSrc = "../templates/WfrmUploadPhoto.html?";
	saveCookie("roomName",roomName);
	loadPage(displatSrc);
}

/**
 * 查看图片
 * @param {Object} roomType
 */
function onclick_btnLookPhoto(roomName){
	if(roomName == null || roomName == "" || roomName == undefined){
		console.error("WfrmRoomPhoto roonName is null");
	}
	var displatSrc = "../templates/WfrmRoomGallery.html";
	saveCookie("roomName",roomName);
	loadPage(displatSrc);
}
