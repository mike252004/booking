package com.dao.mysql;

import com.vo.TCSL_VO_OrderStatisticsItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
public interface TCSL_DAO_OrderStatistics {
    List<TCSL_VO_OrderStatisticsItem> queryInfos(
        @Param("MCID") String mcId,
        @Param("START_TIME") String startTime,
        @Param("END_TIME") String endTime,
        @Param("INTERVAL") String interval,
        @Param("STATEID") String stateId
    );

    /**
     * 查询累计订单
     * @param mcId
     * @return
     */
    Integer queryAllCount(
        @Param("MCID") String mcId
    );

    /**
     * 查询取消订单
     * @param mcId
     * @param stateId
     * @param startTime
     * @param endTime
     * @return
     */
    Integer queryCancelCount(
        @Param("MCID") String mcId,
        @Param("STATEID") String stateId,
        @Param("START_TIME") String startTime,
        @Param("END_TIME") String endTime
    );

    /**
     * 查询新增订单
     * @param mcId
     * @param startTime
     * @param endTime
     * @return
     */
    Integer queryNewCount(
        @Param("MCID") String mcId,
        @Param("START_TIME") String startTime,
        @Param("END_TIME") String endTime
    );
}
