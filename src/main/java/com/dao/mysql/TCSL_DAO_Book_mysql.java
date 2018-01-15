package com.dao.mysql;

import com.vo.TCSL_VO_OrderFormInfo;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-26.
 */
public interface TCSL_DAO_Book_mysql {
    List<TCSL_VO_OrderFormInfo> queryRoomCount(
        @Param("ROOMTYPEID") String roomTypeId,
        @Param("MCID") String mcId,
        @Param("STARTDATE") String startDate,
        @Param("ENDDATE") String endDate
    );
    List<BigDecimal> queryPrice(
        @Param("ROOMTYPEID") String roomTypeId,
        @Param("MCID") String mcId,
        @Param("STARTDATE") String startDate,
        @Param("ENDDATE") String endDate
    );
}
