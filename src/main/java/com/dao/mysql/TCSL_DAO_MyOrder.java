package com.dao.mysql;

import com.vo.TCSL_VO_MyOrderInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
public interface TCSL_DAO_MyOrder {
    List<TCSL_VO_MyOrderInfo> query(
        @Param("MCID") String mcId,
        @Param("DINERID") String dinerId,
        @Param("STATEID") String stateId,
        @Param("ICHECKFLG") String payFlag
    );
    void changeOrderStatus(
        @Param("ORDERID") String orderId,
        @Param("STATUS") String status,
        @Param("ICHECKFLG") String payFlag
    );
    void changeRoomCount(
      @Param("MCID") String mcId,
      @Param("ROOMTYPEID") String roomId,
      @Param("ROOMNUM") String roomNum,
      @Param("ENDDATE") String endDate
    );
    Integer checkOrder(
        @Param("MCID") String mcId,
        @Param("ROOMTYPEID") String roomId,
        @Param("COUNT") String count,
        @Param("STARTDATE") String startDate,
        @Param("ENDDATE") String endDate
    );
    void addOrder(
            @Param("ORDERID") String orderId,
            @Param("ORDERNO") String orderNo,
            @Param("MCID") String mcId,
            @Param("CLINKER") String clinker,
            @Param("ILINKTEL") String linkTel,
            @Param("BEGDATE") String startDate,
            @Param("ENDDATE") String endDate,
            @Param("ORDERTIME") String orderTime,
            @Param("STATEID") String stateId,
            @Param("DINERID") String dinerId,
            @Param("IDCARD") String idCard,
            @Param("ICHECKFLG") String payFlag,
            @Param("COPENID") String openId
    );
    void addOrder_room(
            @Param("ORDERID") String orderId,
            @Param("ROOMTYPEID") String roomTypeId,
            @Param("ROOMNAME") String roomName,
            @Param("PRICE") String price,
            @Param("COUNT") String count
    );
}
