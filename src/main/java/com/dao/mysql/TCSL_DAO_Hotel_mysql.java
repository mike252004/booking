package com.dao.mysql;

import com.vo.TCSL_VO_Hotel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-12-07.
 */
public interface TCSL_DAO_Hotel_mysql {
    void updateHotelInfo(
            @Param("MCID") int mcId,
            @Param("CCITY") String city,
            @Param("dLONGTITUDE") double longtitude,
            @Param("dLATITUDE") double latitude,
            @Param("GCID") int gcId
    );
    void addHotelInfo(
            @Param("MCID") int mcId,
            @Param("CCITY") String city,
            @Param("dLONGTITUDE") double longtitude,
            @Param("dLATITUDE") double latitude,
            @Param("GCID") int gcId
    );
    TCSL_VO_Hotel queryHotelInfo(
            @Param("MCID") int mcId
    );
    List<TCSL_VO_Hotel> queryAll( );
}
