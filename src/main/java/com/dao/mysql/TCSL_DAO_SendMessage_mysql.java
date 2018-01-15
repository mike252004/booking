package com.dao.mysql;

import org.apache.ibatis.annotations.Param;

/**
 * Created by zhangtuoyu on 2016-10-11.
 */
public interface TCSL_DAO_SendMessage_mysql {
    String getOpenIdByOrderId(
        @Param("ORDERID") String orderId
    );
}
