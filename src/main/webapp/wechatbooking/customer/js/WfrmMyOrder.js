var mcId;
var itemId;
var itemMcId;
var itemRoomTypeId;
var itemCount;
var itemEndDate;
var itemStartDate;
var clinker;
var phoneNum;
var idNum;
var price;
var dinerId;
var code;
window.onload = function(){
	var params = getRequestParam();
	code = params["code"];
	dinerId = getCookie("dinerId");
	mcId = getCookie("customer-mcId");
	initConfirm();
	init(dinerId);
}
/**
 * 初始化确认窗口点击事件
 */
function initConfirm(){
	$confirm = $('#my-confirm');
	$confirmBtn = $confirm.find('[data-am-modal-confirm]');
	$cancelBtn = $confirm.find('[data-am-modal-cancel]');
	$confirmBtn.off('click.confirm.modal.amui').on('click', function() {
		onclick_cancel(itemId,itemMcId,itemRoomTypeId,itemCount,itemEndDate,itemStartDate);
	});
	$cancelBtn.off('click.cancel.modal.amui').on('click', function() {
		
	});
}
function init(dinerId){
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/query',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            dinerId:dinerId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var finishList = data.content.finishList;
                var noFinishList = data.content.noFinishList;
                var cancelList = data.content.cancelList;
                for(var i=0 ; i< noFinishList.length ; i++){
                	var roomName = noFinishList[i].cname;
                	var startDate = noFinishList[i].dtbegdate;
                	var endDate = noFinishList[i].dtenddate;
                	var stayDays = noFinishList[i].stayDays;
                	var id = noFinishList[i].id;
                	var phone = noFinishList[i].ilinktel;
                	var userName = noFinishList[i].clinker;
                	var money = noFinishList[i].mprice;
                	var count = noFinishList[i].icount;
                	var roomTypeId = noFinishList[i].croomtypeid;
                	var type = "noFinish";
                	var idCard = noFinishList[i].idcard;
					var div = createItem(roomName,startDate,endDate,stayDays,id,phone,userName,money,type,count,roomTypeId,idCard);
					var tab1 = document.getElementById("tab2-1");
					tab1.appendChild(div);
                }
                for(var i=0 ; i< finishList.length ; i++){
                	var roomName = finishList[i].cname;
                	var startDate = finishList[i].dtbegdate;
                	var endDate = finishList[i].dtenddate;
                	var stayDays = finishList[i].stayDays;
                	var id = finishList[i].id;
                	var phone = finishList[i].ilinktel;
                	var userName = finishList[i].clinker;
                	var money = finishList[i].mprice;
                	var count = finishList[i].icount;
                	var roomTypeId = finishList[i].croomtypeid;
                	var type = "finish";
                	var idCard = finishList[i].idcard;
					var div = createItem(roomName,startDate,endDate,stayDays,id,phone,userName,money,type,count,roomTypeId,idCard);
					var tab1 = document.getElementById("tab2-2");
					tab1.appendChild(div);
                }
                for(var i=0 ; i< cancelList.length ; i++){
                	var roomName = cancelList[i].cname;
                	var startDate = cancelList[i].dtbegdate;
                	var endDate = cancelList[i].dtenddate;
                	var stayDays = cancelList[i].stayDays;
                	var id = cancelList[i].id;
                	var phone = cancelList[i].ilinktel;
                	var userName = cancelList[i].clinker;
                	var money = cancelList[i].mprice;
                	var count = cancelList[i].icount;
                	var roomTypeId = cancelList[i].croomtypeid;
                	var type = "cancel";
                	var idCard = cancelList[i].idcard;
					var div = createItem(roomName,startDate,endDate,stayDays,id,phone,userName,money,type,count,roomTypeId,idCard);
					var tab1 = document.getElementById("tab2-3");
					tab1.appendChild(div);
                }
            }
            $('button').on('click',function(e){
				var btnId = e.target.id;
				var params = btnId.split("-zty-");
				if(params[0] == "cancelBtn"){
					itemId = params[1];
					itemMcId = params[2];
					itemRoomTypeId = params[3];
					itemCount = params[4];
					itemEndDate = params[5];
					itemStartDate = params[6];
					$confirm.modal();
				}
				if(params[0] == "payBtn"){
					itemId = params[1];
					itemMcId = params[2];
					itemRoomTypeId = params[3];
					itemCount = params[4];
					itemEndDate = params[5];
					itemStartDate = params[6];
					clinker = params[7];
					phoneNum = params[8];
					idNum = params[9];
					price = params[10];
				}
			});
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}

/**
 * 创建订单模块
 * @param {Object} roomName  房型
 * @param {Object} startDate 入住时间
 *  @param {Object} endDate 离店时间
 * @param {Object} stayDays 入住天数
 * @param {Object} id 订单id
 * @param {Object} phone 联系电话
 * @param {Object} userName 用户姓名
 * @param {Object} money 支付金额
 * @param {Object} type 菜单类别  finish noFinish cancel
 * @param {Object} count 订房个数
 * @param {Object} roomTypeId 房间类型id
 * @param {Object} idCard 身份证号
 * Example:
 *    <div class='am-panel am-panel-default'>
                    <div class='am-panel-bd'>
                        <strong>{0}</strong>
                        <br />
                        <p>
                            入住 <strong>{4}</strong> (住{6}晚) </p>
                        <p>
                            <i class='am-icon-info am-icon-sm'></i>&nbsp;&nbsp;{8}<br />
                        </p>
                        <p>
                            <i class='am-icon-phone am-icon-sm'></i>&nbsp;&nbsp;{3}<br />
                         <p>
                            <i class='am-icon-user am-icon-sm'></i>&nbsp;&nbsp;{2}<br /></p>
                        <hr />
                        <p>
                            订单状态：到店支付 ￥{1}</p>
                        <button type='button' class='am-btn am-btn-warning am-btn-xl am-btn-block'
                        	onclick="onclick_pay()">
                            立即支付
                        </button>
                        <button type='button' class='am-btn am-btn-warning am-btn-xl am-btn-block' 							onclick="onclick_cancel()">
                            取消订单
                        </button>
                    </div>
                </div>
 */
function createItem(roomName,startDate,endDate,stayDays,id,phone,userName,money,type,count,roomTypeId,idCard){
	var div = document.createElement("div");
	div.className = "am-panel am-panel-default";
	var panelDiv = document.createElement("div");
	panelDiv.className = "am-panel-bd";
	//房型名称
	var strongRoom = document.createElement("strong");
	strongRoom.innerHTML = roomName;
	panelDiv.appendChild(strongRoom);
	//入住时间
	var inP = document.createElement("p");
	inP.innerHTML = "入住 <strong>"+startDate+"</strong> (住"+stayDays+"晚) ";
	panelDiv.appendChild(inP);
	//订单号
	var idDiv = document.createElement("div");
	idDiv.innerHTML = "<i class='am-icon-info am-icon-sm' style='margin:0px 20px 20px 3px'></i>"+id;
	panelDiv.appendChild(idDiv);
	//联系电话
	var phoneDiv = document.createElement("div");
	phoneDiv.innerHTML = "<i class='am-icon-phone am-icon-sm' style='margin:0px 13px 20px 0px'></i>"+phone;
	panelDiv.appendChild(phoneDiv);
	//用户名称
	var userDiv= document.createElement("div");
	userDiv.innerHTML = "<i class='am-icon-user am-icon-sm' style='margin:0px 15px 0px 0px'></i>"+userName;
	panelDiv.appendChild(userDiv);
	if(type == "noFinish"){
		//支付金额
		var moneyP = document.createElement("p");
		moneyP.innerHTML = "</br>订单状态：到店支付 ￥"+money;
		panelDiv.appendChild(moneyP);
		var payBtn = document.createElement("button");
		payBtn.type = "button";
		payBtn.className = "am-btn am-btn-warning am-btn-xl am-btn-block";
		payBtn.id = "payBtn-zty-"+ id +"-zty-" + mcId + "-zty-" + roomTypeId + "-zty-" + count + "-zty-"+endDate +"-zty-"+startDate+"-zty-"+userName+"-zty-"+phone+"-zty-"+idCard +"-zty-"+money;
		payBtn.setAttribute("data-am-modal","{target: '#my-actions'}");
		payBtn.innerHTML = "立即支付";
		panelDiv.appendChild(payBtn);
		var cancelBtn = document.createElement("button");
		cancelBtn.type = "button";
		cancelBtn.className = "am-btn am-btn-warning am-btn-xl am-btn-block";
		cancelBtn.id = "cancelBtn-zty-"+ id +"-zty-" + mcId + "-zty-" + roomTypeId + "-zty-" + count + "-zty-"+endDate + "-zty-"+startDate;
		cancelBtn.innerHTML = "取消订单";
		panelDiv.appendChild(cancelBtn);
	}
	if(type == "finish"){
		var statusDiv = document.createElement("div");
		statusDiv.innerHTML = "订单状态:<a class='am-badge am-badge-success  am-text-lg' style='margin:15px 0px 0px 5px'>已完成</a>";
		panelDiv.appendChild(statusDiv);
	}
	if(type == "cancel"){
		var cancelDiv = document.createElement("div");
		cancelDiv.innerHTML = "订单状态:<a class='am-badge am-badge-danger  am-text-lg' style='margin:15px 0px 0px 5px'>已取消</a>";
		panelDiv.appendChild(cancelDiv);
	}
	div.appendChild(panelDiv);
	return div;
	
}
function onclick_pay(type){

	if(type == "crm_pay"){ //crm支付 paytypeid:3
        var payTypeId = 3;
        queryOpenId(payTypeId);
	}
	if(type == "wechat_pay"){ //微信支付 paytypeid:6
        var payTypeId = 6;
        queryOpenId(payTypeId);
	}
}
function onclick_cancel(id,mcId,roomTypeId,count,endDate,begDate){
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/cancelOrder',
        //是否异步请求
        async:true,
        //传参
        data:{
        	id:id,
            mcId:mcId,
            roomTypeId:roomTypeId,
            count:count,
            endDate:endDate,
			startDate:begDate
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            window.location.reload();
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
function queryOpenId(payTypeId) {
    var requestPath = getRequestPath();
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/queryOpenId',
        //是否异步请求
        async:true,
        //传参
        data:{
            orderId:itemId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                debugger;
                openId =  data.content;
                getParentOpenId(code,payTypeId);
                //getPaySign(payTypeId);
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 获取用户对父公众号(商龙)的openId
 * @param code
 */
function getParentOpenId(code,payTypeId){
    var requestPath = getRequestPath();
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/getParentOpenId',
        //是否异步请求
        async:true,
        //传参
        data:{
            code:code
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var parentOpenId = data.content;
                getPayKey(parentOpenId,payTypeId);
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 获取用于通用支付接口的支付key,跳转通用支付页
 * @param parentOpenId
 */
function getPayKey(parentOpenId,payTypeId) {
    var openId = getCookie("openId");
    var mpid = getCookie("mpId");
    var appid = getCookie("appid");
    var requestPath = getRequestPath();
    var finishPath = requestPath+RESOURCE_PROJECT_NAME+"wechatbooking/customer/templates/WfrmBookStatus.html?frontPay=2";
    var param = {
        "body": "订单描述",
        "storeid": mcId,
        "unionid": "",
        "paySerialNo": "",
        "goods": [

        ],
        "appid": appid,
        "turnUrl": finishPath,
        "payBusinNo": "M20170704456412C",
        "kind": "10325",
        "paytypeid": payTypeId,
        "udStateUrl": "http://o2oapi.wuuxiang.com/tcsl/CommonAddMoneyCommitAction.htm",
        "ishdfk": 0,
        "payMoney": price,
        "cardinfo": [

        ],
        "busiScopeNo": "rechargeCard",
        "money": price,
        "openid": openId,
        "orderid": itemId,
        "mpid": mpid,
        "trueMoney": price,
        "payFrom": 3,
        "items": [
            {
                "itemcount": 1,
                "itemid": "582",
                "itemname": "原始紫菜包饭",
                "price": 10.05,
                "skuinfo": "",
                "remark": "",
                "code": "111"
            }
        ],
        "parentOpenid": parentOpenId
    };
    param = JSON.stringify(param);
    param = "data="+param;
    //绕过安全检测的头信息
    var head = {'isrsa':0};
    head = JSON.stringify(head);
    $.ajax({
        //请求方式
        type:"post",
        dataType:"json",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/getPayKey',
        //是否异步请求
        async:true,
        //传参
        data:{
            requestParam:param,
            headParam:head
        },
        //发送请求前执行方法
        // beforeSend:function(xhr){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var key = data.content;
                var envType = RESOURCE_PAY_TYPE; // 1 测试 2预发布 3正式
                var path =  RESOURCE_PAY_PAGE + "?" +"key="+key+"&envType=" + envType;
                window.location.href = path;
            }
        },
        error: function (XMLHttpReuqest, textStautus, errothrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpReuqest.readyState);
            console.log(XMLHttpRequest.responseText);
            console.log(textStautus);
            console.log(errothrown);
        }
    });
}
// function getPaySign(payTypeId){
//     debugger;
//     var requestPath = getRequestPath();
//     if(openId == null || openId == "" || openId === undefined){
//         return ;
//     }
//     var mpid = getCookie("mpId");
//     var finishPath = requestPath+RESOURCE_PROJECT_NAME+"myOrder/finishPay?orderId="+orderId;
//     var param = "{'body':'订单描述','openid':'"+openId+"','mpid':'"+mpid+"','udStateUrl':'"+finishPath+"','money':'"+price
//         +"','trueMoney':'"+price+"','kind':'10325'"+",'storeid':'"+mcId+"','paytypeid':'"+payTypeId+"'"+",'orderId':'"+itemId
//         +"','payFrom':3"+",'payMoney':'"+price+"','ishdfk':'0','goods':[{'goodsName':'手机','price':'99'" +
//         ",'quantity':'1'},{'goodsName':'电视','price':'2','quantity':'2'}]}";
// 	var requestPath = getRequestPath();
// 	//判断房间数量是否足够
// 	$.ajax({
//         //请求方式
//         type:"post",
//         //请求路径
//         url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/createPayMd5',
//         //是否异步请求
//         async:true,
//         //传参
//         data:{
//             mcId:mcId,
//             data:param
//         },
//         //发送请求前执行方法
// //		beforeSend:function(){ },
//         //成功返回后调用函数
//         success:function(data){
//         	if(data.ret == 0){
//         		param = param +"&sign="+ data.content;
//         		var path = RESOURCE_PAY_COMMON_IP_PORT+"tcsl/CommPayPage.htm?data="+param;
//         		saveCookie("pay_orderId",itemId);
// 				saveCookie("pay_price",price);
//         		window.location.href = path;
//         	}
//         },
//         //调用出错执行的函数
// //		error:function(){ }
//   });
// }