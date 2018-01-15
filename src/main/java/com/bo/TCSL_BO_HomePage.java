package com.bo;

import com.dao.mysql.TCSL_DAO_HomePage;
import com.vo.TCSL_VO_BookHistory;
import com.vo.TCSL_VO_BookInfo;
import com.vo.TCSL_VO_OrderInfo;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
@Repository
public class TCSL_BO_HomePage {
    @Resource
    TCSL_DAO_HomePage daoHomePage;

    public TCSL_VO_Result queryHistoryData(String mcId) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_BookInfo voBookInfo = new TCSL_VO_BookInfo();
        List<String> timeList = daoHomePage.queryDataTime(mcId);
        //该商户 入住/未入住/取消  历史数量
        List<TCSL_VO_BookHistory> bookInfoList = new ArrayList<TCSL_VO_BookHistory>();
        for (String time :timeList) {
            TCSL_VO_BookHistory voBookHistory = new TCSL_VO_BookHistory();
            voBookHistory.setDate(time);
            voBookHistory.setArriveCount(daoHomePage.queryRoomTypeCount(mcId,time,2)); //入住
            voBookHistory.setCancelCount(daoHomePage.queryRoomTypeCount(mcId,time,3)); //取消
            voBookHistory.setNotArriveCount(daoHomePage.queryRoomTypeCount(mcId,time,0)); //未入住
            bookInfoList.add(voBookHistory);
        }
        voBookInfo.setHistoryList(bookInfoList);
        voBookInfo.setFinishOrderCount(daoHomePage.queryArriveOrNotArriveCount(mcId,2)); //全部入住数量
        voBookInfo.setCancelOrderCount(daoHomePage.queryArriveOrNotArriveCount(mcId,3)); //全部取消数量
        voBookInfo.setAllOrderCount(daoHomePage.queryAllCount(mcId)); //全部订单数量
        result.setRet(0);
        result.setContent(voBookInfo);
        return result;
    }

    public TCSL_VO_Result queryTodayNotArrive(String mcId) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        SimpleDateFormat df = new SimpleDateFormat("YYYY-MM-dd");
        String now = df.format(new Date());
        List<TCSL_VO_OrderInfo> todayNotArriveList = daoHomePage.queryTodayNotArrive(mcId,0,now);
        result.setContent(todayNotArriveList);
        return result;
    }

    public TCSL_VO_Result queryNewOrder(String mcId) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        SimpleDateFormat df = new SimpleDateFormat("YYYY-MM-dd");
        String now = df.format(new Date());
        List<TCSL_VO_OrderInfo> todayNotArriveList = daoHomePage.queryNewOrder(mcId,now);
        result.setContent(todayNotArriveList);
        return result;
    }
}
