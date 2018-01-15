package com.dao.mysql;

import com.vo.TCSL_VO_OrderDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-21.
 */
public interface TCSL_DAO_OrderDetail {
    List<TCSL_VO_OrderDetail> query(
        @Param("MCID") String mcId
    );

}
