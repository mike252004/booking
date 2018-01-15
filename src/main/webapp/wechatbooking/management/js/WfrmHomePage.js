window.onload =function(){
	init();
}
function init(){
    var timeArray = [];
    var arriveArray = [];
    var cancelArray = [];
    var notArriveArray = [];
    var requestPath = getRequestPath();
    var mcId = getCookie("mcId");
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'homePage/queryHistoryData',
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
                var content = data.content;
                var  finishCount = content.finishOrderCount;
                var cancelCount = content.cancelOrderCount;
                var allCount = content.allOrderCount;
                document.getElementById('finishOrderCount').innerHTML = finishCount;
                document.getElementById('allOrderCount').innerHTML = allCount;
                document.getElementById('cancelOrderCount').innerHTML = cancelCount;
                var historyList = content.historyList;
                for (var i=0; i< historyList.length; i++){
                    timeArray.push(historyList[i].date);
                    arriveArray.push(historyList[i].arriveCount);
                    cancelArray.push(historyList[i].cancelCount);
                    notArriveArray.push(historyList[i].notArriveCount);
                }
            }
            initEchart(timeArray,arriveArray,cancelArray,notArriveArray);
            initTodayInfo(requestPath,mcId);
            initNewOrderInfo(requestPath,mcId);
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/*
 * Description:初始化历史数据图表
 */
function initEchart(timeArray,arriveArray,cancelArray,notArriveArray){
	require.config({
        paths: {
            echarts: '../api/Echart/dist'
        }
    });
    require(
            [
				'echarts',
                'echarts/chart/pie',
                'echarts/chart/line',
                'echarts/chart/bar',// 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('historyInfo'));
//              var idx = 1;
 
                var option = {
                    tooltip: {
                    	trigger: 'axis',
						axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
						data: ['未到店', '已入住', '取消']
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        y: 'center',
                        feature: {
                            mark: { show: false },
                            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: timeArray
                        }
                    ],
                    yAxis: [
						{
				            type: 'value',
				            splitArea: { show: true }
				        }
                    ],
                    series: [
                        {
                        	"name":"未到店",
                        	"type":"bar",
                        	"stack":"总量",
                        	"data":notArriveArray
                        },
                        {
                        	"name":"已入住",
                        	"type":"bar",
                        	"stack":"总量",
                        	"data":arriveArray
                        },
                        {
                        	"name":"取消",
                        	"type":"bar",
                        	"stack":"总量",
                        	"data":cancelArray
                        }
                    ]
                };
 
                // 为echarts对象加载数据 
                myChart.setOption(option);
            }
        );
}
function initTodayInfo(requestPath,mcId) {
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'homePage/queryTodayNotArrive',
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
                var content = data.content;
                for (var i=0 ; i<content.length ; i++){
                    var roomName = content[i].cname; //房型
                    var customer = content[i].clinker; //客户名称
                    var price = content[i].mprice; //预订价格
                    var phone = content[i].ilinktel; //联系电话
                    var status = getStatusName(content[i].stateid); //订单状态
                    var orderTime = content[i].dtorderdate; //预定时间
                    var inTime = content[i].dtbegdate; //到店时间
                    var outTime = content[i].dtenddate; //离店时间
                    var tr = createTabItem(roomName,customer,price,phone,status,orderTime,inTime,outTime);
                    $("#todayOrderList").append(tr);
                }
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
function  initNewOrderInfo(requestPath,mcId) {
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'homePage/queryNewOrder',
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
                var content = data.content;
                for (var i=0 ; i<content.length ; i++){
                    var roomName = content[i].cname; //房型
                    var customer = content[i].clinker; //客户名称
                    var price = content[i].mprice; //预订价格
                    var phone = content[i].ilinktel; //联系电话
                    var status = getStatusName(content[i].stateid); //订单状态
                    var orderTime = content[i].dtorderdate; //预定时间
                    var inTime = content[i].dtbegdate; //到店时间
                    var outTime = content[i].dtenddate; //离店时间
                    var tr = createTabItem(roomName,customer,price,phone,status,orderTime,inTime,outTime);
                    $("#newOrderList").append(tr);
                }
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
function createTabItem(roomName,customer,price,phone,status,orderTime,inTime,outTime) {
    var tr = document.createElement("tr");
    var tdRoom = document.createElement("td");
    tdRoom.innerHTML = roomName;
    tr.appendChild(tdRoom);
    var tdCustomer = document.createElement("td");
    tdCustomer.innerHTML = customer;
    tr.appendChild(tdCustomer);
    var tdPrice = document.createElement("td");
    tdPrice.innerHTML = price;
    tr.appendChild(tdPrice);
    var tdPhone = document.createElement("td");
    var spanPhone = document.createElement("sapn");
    spanPhone.className = "am-badge am-badge-success";
    spanPhone.innerHTML = phone;
    tdPhone.appendChild(spanPhone);
    tr.appendChild(tdPhone);
    var tdStatus = document.createElement("td");
    var aStatus = document.createElement("a");
    aStatus.innerHTML = status;
    tdStatus.appendChild(aStatus);
    tr.appendChild(tdStatus);
    var tdOrderTime = document.createElement("td");
    var aOrderTime = document.createElement("a");
    aOrderTime.innerHTML = orderTime;
    tdOrderTime.appendChild(aOrderTime);
    tr.appendChild(tdOrderTime);
    var tdInOutTime = document.createElement("td");
    var aInOutTime = document.createElement("a");
    var time = inTime +"/" +outTime;
    aInOutTime.innerHTML = time;
    tdInOutTime.appendChild(aInOutTime);
    tr.appendChild(tdInOutTime);
    /** Example:
    "<tr>" +
        "<td>" +
            roomName +
        "</td>" +
        "<td>" +
            customer +
        "</td>" +
        "<td>" +
            "<a >"+price+"</a>" +
        "</td>" +
        "<td>" +
            "<span class='am-badge am-badge-success'>+phone+</span>" +
        "</td>" +
        "<td>" +
            "<a>"+status+"</a>" +
        "</td><td>" +
            "<a >"+orderTime+"</a>" +
        "</td>" +
        "<td>" +
            "<a >"+inTime+"/"+outTime+"</a>" +
        "</td>" +
    "</tr>"
     */
    return tr;
}
function getStatusName(status) {
    switch (status){
        case 0:
            return "<span class='am-badge am-badge-primary'>未到店</span>";
        case 1:
            return "未已入住";
        case 2:
            return "<span class='am-badge am-badge-success'>已入住</span>";
        case 3:
            return "<span class='am-badge am-badge-danger'>取消</span>";
        default:
            return "";
    }
}