package com.dao.mysql;

import com.vo.TCSL_VO_OrderInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
public interface TCSL_DAO_HomePage {
    List<String> queryDataTime(
            @Param("MCID") String mcId
    );

    /**
     * 查询入住/未入住/取消 数量
     * @param mcId
     * @param dtOrderDate
     * @param stateId
     * @return
     */
    Integer queryRoomTypeCount(
            @Param("MCID") String mcId,
            @Param("DTORDERDATE") String dtOrderDate,
            @Param("STATEID") Integer stateId
    );

    /**
     * 查询入住/未入住数量
     * @param mcId
     * @param stateId
     * @return
     */
    Integer queryArriveOrNotArriveCount(
            @Param("MCID") String mcId,
            @Param("STATEID") Integer stateId
    );

    /**
     * 查询全部订单数量
     * @param mcId
     * @return
     */
    Integer queryAllCount(
            @Param("MCID") String mcId
    );

    /**
     * 查询当天抵客
     * @param mcId
     * @param stateId
     * @param dtBegDate
     * @return
     */
    List<TCSL_VO_OrderInfo> queryTodayNotArrive(
            @Param("MCID") String mcId,
            @Param("STATEID") Integer stateId,
            @Param("DTBEGDATE") String dtBegDate
    );

    /**
     * 查询新增订单
     * @param mcId
     * @param dtBegDate
     * @return
     */
    List<TCSL_VO_OrderInfo> queryNewOrder(
            @Param("MCID") String mcId,
            @Param("DTBEGDATE") String dtBegDate
    );



}
