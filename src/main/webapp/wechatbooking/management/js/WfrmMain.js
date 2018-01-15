window.onload=function(){
	init();
}
function init(){
	var shopName = getCookie("shopName");
	$("#shopTitle").html(shopName);
	$("#announcement").html(RESOURCE_PUBLIC_ANNOUNCEMENT);
	onclick_topPage();
}
/**
 * 加载指定页面到 displayContent
 * @param src
 */
function loadPage(src){
	window.open(src,'displayContent');
}
/**
 * 首页 点击事件
 */
function onclick_topPage() {
	var displatSrc = "../templates/WfrmHomePage.html";
	loadPage(displatSrc);
}
/**
 * 酒店信息维护 点击事件
 */
function onclick_hotelInfoMaintain(){
	var displatSrc = "../templates/WfrmHotelInfo.html";
	loadPage(displatSrc);
}
/**
 * 房型图片管理 点击事件
 */
function onclick_roomCaptureManage(){
	var displatSrc = "../templates/WfrmRoomPhoto.html";
	loadPage(displatSrc);
}
/**
 * 酒店外景图管理 点击事件
 */
function onclick_hotelOutCaptureManage(){
	var displatSrc = "../templates/WfrmOutdoorPhoto.html";
	loadPage(displatSrc);
}
/**
 * 酒店服务设施维护 点击事件
 */
function onclick_hotelServiceMatain(){
	var displatSrc = "../templates/WfrmServerFacilityMatain.html";
	loadPage(displatSrc);
}
/**
 * 订单统计
 */
function onClick_orderCount(){
	var displatSrc = "../templates/WfrmOrderStatistics.html";
	loadPage(displatSrc);
}
/**
 * 订单详情
 */
function onclick_orderDetail(){
	var displatSrc = "../templates/WfrmOrderDetail.html";
	loadPage(displatSrc);
}
function logout() {
	window.location.href='WfrmLogin.html';
}

          