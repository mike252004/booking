package com.bo;

import com.dao.mysql.TCSL_DAO_OrderStatistics;
import com.vo.TCSL_VO_OrderStatistics;
import com.vo.TCSL_VO_OrderStatisticsItem;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
@Repository
public class TCSL_BO_OrderStatistics {
    @Resource
    TCSL_DAO_OrderStatistics daoOrderStatistics;

    /**
     * 查询订单分析结果
     * @param mcId
     * @param interval
     * @param stateId
     * @return
     */
    public TCSL_VO_Result queryInfo(String mcId,String interval,String stateId){
        SimpleDateFormat df = new SimpleDateFormat("YYYY-MM-dd");
        String now = df.format(new Date());
        String startTime = now + " 00:00:00";
        String endTime = now + " 23:59:59";
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_OrderStatistics orderStatistics = new TCSL_VO_OrderStatistics();
        //订单数据列表
        List<TCSL_VO_OrderStatisticsItem> statisticsItems = daoOrderStatistics.queryInfos(mcId,startTime,endTime,interval,stateId);
        orderStatistics.setStatisticsItems(statisticsItems);
        //累计订单
        Integer allCount = daoOrderStatistics.queryAllCount(mcId);
        //取消订单
        Integer cancelCount = daoOrderStatistics.queryCancelCount(mcId,"3",startTime,endTime);
        //新增订单
        Integer newOrderCount = daoOrderStatistics.queryNewCount(mcId,startTime,endTime);
        orderStatistics.setAllOrderCount(allCount);
        orderStatistics.setCancelOrderCount(cancelCount);
        orderStatistics.setNewOrderCount(newOrderCount);
        result.setContent(orderStatistics);
        return result;
    }
}
