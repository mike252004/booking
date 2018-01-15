window.onload = function(){
	//声明全局变量
	var $confirm;
	var $delImg;
	var $confirmBtn;
	var $cancelBtn;
	//初始化方法
	initConfirm();
	initInfo();
}
/**
 * 初始化确认窗口点击事件
 */
function initConfirm(){
	$confirm = $('#my-confirm');
	$confirmBtn = $confirm.find('[data-am-modal-confirm]');
	$cancelBtn = $confirm.find('[data-am-modal-cancel]');
	$confirmBtn.off('click.confirm.modal.amui').on('click', function() {
		deleteImg($delImg);
	});
	$cancelBtn.off('click.cancel.modal.amui').on('click', function() {
		
	});
}
//获取需要显示图片信息
function initInfo(){
	var requestPath = getRequestPath();
	var type = getCookie("roomName");
	var name = getCookie("shopName");
	$.ajax({
		//请求方式
		type:"post",
		//请求路径
		url:requestPath+RESOURCE_PROJECT_NAME+'uploadPhoto/queryPhoto',
		//是否异步请求
		async:true,
		//传参
		data:{
			shopName:name,
			roomType:type
		},
		//发送请求前执行方法
//		beforeSend:function(){ },
		//成功返回后调用函数
		success:function(data){
			var imgs = data.content;
			for( var i=0; i < imgs.length;i++){
				var imgName = imgs[i];
				createImgTag(name,type,imgName);
			}
			$('img').on('click',function(e){
				var img = e.target;
				detailImg(img);
			});
			$('span').on('click',function(e){
				var delImg = e.target;
				$delImg = delImg;
				$confirm.modal();
			});
		},
		//调用出错执行的函数
//		error:function(){ }
	});
}
/**
 * 创建图片
 * @param {Object} shopName 商户名称
 * @param {Object} roomType 房间类型
 * @param {Object} imgName 图片名称
 */
function createImgTag(shopName,roomType,imgName){
	var ul = $("#imgList");
	var li = document.createElement("li");
	var img = document.createElement("img");
	img.className = 'am-img-thumbnail am-img-bdrs';
	//根据请求路径获取服务器所在ip
	var request = getRequestPath().split(":");
	var ip = request[1].substring(2);
	//拼接访问路径
	var requestUrl = RESOURCE_NGINX_DOMAIN_NAME +
						"/image/"+shopName+"/"+roomType+"/"+imgName;
	img.id = "img-zty-"+shopName + "-zty-" + roomType + "-zty-" + imgName;
	img.src = requestUrl;
	img.style = "cursor:pointer";
	
	var descDiv = document.createElement("div");
	descDiv.className = "gallery-desc";
	descDiv.innerHTML = imgName;
	descDiv.style = "text-align:center";
	li.appendChild(img);
	li.appendChild(descDiv);
	
	var delDiv = document.createElement("div");
	delDiv.className = 'gallery-title';
	var delIcon = document.createElement("span");
	delIcon.style = "cursor:pointer";
	delIcon.id = "btnDel-zty-"+shopName + "-zty-" + roomType + "-zty-" + imgName;
	delIcon.className = "am-icon-trash am-icon-sm";
	delDiv.appendChild(delIcon);
	li.appendChild(delDiv);
	ul.append(li);
	/* Example:
	<li>
		<img class='am-img-thumbnail am-img-bdrs' src='http://127.0.0.1:808/image/testZTY/standard_room/14541223424598127.jpg' onclick="detailImg()"/>
		<div class='gallery-desc'>
			
		</div>
 		<div style='cursor:pointer' class='gallery-title' id='btndel' onclick="deleteImg()">
 			<span class='am-icon-trash am-icon-sm'></span>
 		</div>
 	</li>*/
}
/**
 * 图片详情
 */
function detailImg(detailImg){
	var id = detailImg.id;
	var imgInfo = id.split("-zty-");
	var imgName = imgInfo[3];
	saveCookie("detailImg",imgName);
	var src = "../templates/WfrmPhotoDetail.html";
	window.open(src,'displayContent');
}
/**
 * 删除图片
 * @param {Object} delImg 删除图片Dom对象
 */
function deleteImg(delImg){
	var id = delImg.id;
	var imgInfo = id.split("-zty-");
	var imgName = imgInfo[3];
	var requestPath = getRequestPath();
	var roomType = getCookie("roomName");
	var shopName = getCookie("shopName");
	var params = [];
	params.push(shopName);
	params.push(roomType);
	params.push(imgName);
	var result = checkEmpty(params);
	if(!result){
		console.error("deleteImg params is null");
		return;
	}
	$.ajax({
		//请求方式
		type:"post",
		//请求路径
		url:requestPath+RESOURCE_PROJECT_NAME+'uploadPhoto/deletePhoto',
		//是否异步请求
		async:true,
		//传参
		data:{
			shopName:shopName,
			roomType:roomType,
			imgName:imgName
		},
		//发送请求前执行方法
//		beforeSend:function(){ },
		//成功返回后调用函数
		success:function(data){
			//刷新页面
			location.reload();
		},
		//调用出错执行的函数
//		error:function(){ }
	});
}

