package com.dao.oracle;

import com.vo.TCSL_VO_HotelDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
public interface TCSL_DAO_HotelDetail {
    List<TCSL_VO_HotelDetail> queryHotelList(
        @Param("GCID") String gcId
    );
}
