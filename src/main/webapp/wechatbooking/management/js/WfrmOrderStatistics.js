var interval;
var type = 2;
window.onload = function(){	
	initDate(7);
	queryInfo();
}
/**
 * 查询显示数据
 * @param {Object} $interval 查询时间段长度
 * @param {Object} $type  0 未入住 2入住  3取消  1 未完成
 */
function queryInfo(){
	var queryValue = [];
	var queryDate = [];
	var requestPath = getRequestPath();
	var mcId = getCookie("mcId"); 
	$.ajax({
		//请求方式
		type:"post",
		//请求路径
		url:requestPath+RESOURCE_PROJECT_NAME+'orderStatistics/queryInfo',
		//是否异步请求
		async:true,
		//传参
		data:{
			mcId:mcId,
			interval:interval,
			stateId:type
		},
		//发送请求前执行方法
//		beforeSend:function(){ },
		//成功返回后调用函数
		success:function(data){
			if(data.ret == 0){
				var content = data.content;
				var newOrderCount = content.newOrderCount;
				var cancelCount = content.cancelOrderCount;
				var allCount = content.allOrderCount;
				document.getElementById('newOrderCount').innerHTML = newOrderCount;
				document.getElementById('cancelOrderCount').innerHTML = cancelCount;
				document.getElementById('allOrderCount').innerHTML = allCount;
				var statisticsList = content.statisticsItems;
				for (var i=0; i< statisticsList.length; i++){
					queryValue.push(statisticsList[i].count);
					queryDate.push(statisticsList[i].dtorderdate);
                }
			}
			if(queryValue.length != 0 && queryDate.length != 0){
                initEchart(queryValue,queryDate);
            }
		},
		//调用出错执行的函数
//		error:function(){ }
	});
}
/**
 * 计算时间段显示内容
 * @param {Object} intervalDay  显示数据时间段长度
 */
function initDate(intervalDay){
	interval = intervalDay;
	var now = (new Date()).Format("yyyy-MM-dd");
	document.getElementById('my-endDate').innerHTML = now;
	var backDate = getDay(-intervalDay);
	document.getElementById('my-strDate').innerHTML = backDate;
}
function initEchart(queryValue,queryDate){
	var typeName = getTypeName(type);
	require.config({
                paths: {
                    echarts: '../api/Echart/dist'
                }
           });
    require(
            [
                'echarts',
                'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
            ],
            function(ec){
            	// 基于准备好的dom，初始化echarts图表
	            var myChart = ec.init(document.getElementById('main'));
	            var option = {
	                tooltip: {
	                    trigger: 'axis'
	                },
	                legend: {
	                    data: [typeName]
	                },
	                toolbox: {
	                    show: false,
	                    feature: {
	                        mark: { show: false },
	                        dataView: { show: true, readOnly: false },
	                        magicType: { show: true, type: ['line', 'bar'] },
	                        restore: { show: true },
	                        saveAsImage: { show: true }
	                    }
	                },
	                calculable: true,
	                xAxis: [
						{
				            type: 'category',
				            boundaryGap: false,
				            data: queryDate
						}
					],
	                yAxis: [
				        {
				            type: 'value',
				            axisLabel: {
				                formatter: 0
				            }
				        }
					],
	                series: [
				        {
				            name: typeName,
				            type: 'line',
				            data: queryValue,
				            markPoint: {
				                data: [
				                    { type: 'max', name: '最大值' },
				                    { type: 'min', name: '最小值' }
				                ]
				            },
				            markLine: {
				                data: [
				                    { type: 'average', name: '平均值' }
				                ]
				            }
				        },
					]
	            };
	            // 为echarts对象加载数据 
	            myChart.setOption(option);
            }
           	
    );
}
function onclick_btnDate_7(){
	interval = 7;
	initDate(7);
	queryInfo();
}
function onclick_btnDate_14(){
	interval = 14;
	initDate(14);
	queryInfo();
}
function onclick_btnDate_30(){
	interval = 30;
	initDate(30);
	queryInfo();
}
/**
 * 显示已入住数据
 */
function onclick_btnArrive(){
	type = 2;
	queryInfo(2);
}
/**
 * 显示取消数据
 */
function onclick_btnCancel(){
	type = 3;
	queryInfo(3);
}
/**
 * 显示未入住数量
 */
function onclick_btnNoArrive(){
	type = 0;
	queryInfo(0);
}
function getTypeName(type){
	switch(type){
		case 0:
			return "未到店订单";
		case 1:
			return "未完成订单";
		case 2:
			return "已入住订单";
		case 3:
			return "取消订单";
		default:
			return "";
	}
}
