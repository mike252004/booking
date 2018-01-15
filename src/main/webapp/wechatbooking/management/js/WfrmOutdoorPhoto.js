window.onload = function(){
    //声明全局变量
    var $confirm;
    var $delImg;
    var $confirmBtn;
    var $cancelBtn;
	initInfo();
    initConfirm();
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
/**
 * 查询显示图片列表内容
 */
function initInfo(){
	var requestPath = getRequestPath();
	var shopName = getCookie("shopName");
	$.ajax({
		//请求方式
		type:"post",
		//请求路径
		url:requestPath+RESOURCE_PROJECT_NAME+'uploadPhoto/queryOutdoorPhoto',
		//是否异步请求
		async:true,
		//传参
		data:{
			shopName:shopName
		},
		//发送请求前执行方法
//		beforeSend:function(){ },
		//成功返回后调用函数
		success:function(data){
			var imgs = data.content;
			for( var i=0; i < imgs.length;i++){
				var imgName = imgs[i];
				createImg(shopName,imgName);//创建轮播图片
			}
			//给图片内容绑定点击事件
			 $('#fileList img').on('click',function(e){
			 	var img = e.target;
			 	detailImg(img);
			 });
			 $('#fileList span').on('click',function(e){
			 	var delImg = e.target;
                $delImg = delImg;
			 	$confirm.modal();
			 });
            $('.am-slider').flexslider();
		},
		//调用出错执行的函数
//		error:function(){ }
	});
}
/**
 * 创建轮播图片
 * @param {Object} shopName
 * @param {Object} imgName
 */
function createImg(shopName,imgName){
    var ul = document.getElementById("viewList");
    var li = document.createElement("li");
	var img = document.createElement("img");
	img.className = "am-img-responsive";
	var requestUrl = RESOURCE_NGINX_DOMAIN_NAME +
		"/image/"+shopName+"/"+"outdoor_scene"+"/"+imgName;
	img.src = requestUrl;
	li.appendChild(img);
	ul.appendChild(li);
	createThumb(shopName,imgName,requestUrl);
	/**
	 * Example:
	 * 	<li>
			<img class='am-img-responsive'  src='http://localhost:808/image/testZTY/outdoor_scene/123.jpg'>
		</li>
	 */
}
/**
 * 创建缩略图
 * @param {Object} shopName
 * @param {Object} imgName
 * @param {Object} requestUrl
 */
function createThumb(shopName,imgName,requestUrl){
	var ul = document.getElementById("fileList");
	var li = document.createElement("li");
	var img = document.createElement("img");
	img.className = "am-img-thumbnail am-img-bdrs";
	img.src = requestUrl;
    img.id = "btnDel-zty-"+shopName + "-zty-outdoor_scene-zty-" + imgName;
    img.style = "cursor:pointer";
	var desDiv = document.createElement("div");
	desDiv.className = "gallery-desc";
	var delDiv = document.createElement("div");
	delDiv.className = "gallery-title";
	delDiv.style = "cursor:pointer";
	var span = document.createElement("span");
	span.className = "am-icon-trash am-icon-sm";
    span.id = "btnDel-zty-"+shopName + "-zty-outdoor_scene-zty-" + imgName;
	delDiv.appendChild(span);
	li.appendChild(img);
	li.appendChild(desDiv);
	li.appendChild(delDiv);
	ul.appendChild(li);
	/**
	 * Example:
	 * 	<li>
			<img class='am-img-thumbnail am-img-bdrs' src='http://localhost:808/image/testZTY/standard_room/123.jpg' onclick="detailImg()"/>
			<div class='gallery-desc'>
				图片名称
			</div>
			<div style='cursor:pointer' class='gallery-title' onclick="deleteImg()">
				<span class='am-icon-trash am-icon-sm'>
					
				</span>
			</div>
		</li>
	 */
}

jQuery(function(){
	var $ = jQuery,
    $list = $('#fileList'),
    // 优化retina, 在retina下这个值是2
    ratio = window.devicePixelRatio || 1,
    // 缩略图大小
    thumbnailWidth = 100 * ratio,
    thumbnailHeight = 100 * ratio,

    uploader;
    var requestPath = getRequestPath(); //获取请求路径
    //初始化Web Uploader
    uploader = WebUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: '../api/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: requestPath+RESOURCE_PROJECT_NAME+'uploadPhoto/addOutdoorPhoto',

        // 选择文件的按钮
        pick: '#filePicker',
        
        formData:{
        	shopName:""
        },
		
        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    //设置上传图片携带参数
    uploader.on( 'uploadBeforeSend', function( block, data ) {
	    var name = getCookie("shopName");
	    // block为分块数据。  
	    // file为分块对应的file对象。  
	    var file = block.file;
	    // 修改data可以控制发送哪些携带数据。  
	    data.shopName = name;
	});  

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        location.reload();
    });
});
function detailImg(detailImg){
    var id = detailImg.id;
    var imgInfo = id.split("-zty-");
    var imgName = imgInfo[3];
    saveCookie("detailImg",imgName);
    var src = "../templates/WfrmPhotoDetail.html";
    saveCookie("roomName","outdoor_scene");
    window.open(src,'displayContent');
}
function deleteImg(delImg){
    var id = delImg.id;
    var imgInfo = id.split("-zty-");
    var imgName = imgInfo[3];
    var requestPath = getRequestPath();
    var shopName = getCookie("shopName");
    var params = [];
    params.push(shopName);
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
        url:requestPath+RESOURCE_PROJECT_NAME+'uploadPhoto/deleteOutdoorPhoto',
        //是否异步请求
        async:true,
        //传参
        data:{
            shopName:shopName,
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
