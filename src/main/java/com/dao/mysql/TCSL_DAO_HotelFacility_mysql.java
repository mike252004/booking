package com.dao.mysql;

import com.po.oracle.PHO_HT_HOTELITEM;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016/9/25.
 */
public interface TCSL_DAO_HotelFacility_mysql {
    List<PHO_HT_HOTELITEM> queryRoomFacility(
        @Param("MCID") String mcId,
        @Param("CLASS") String itemClass
    );
}
