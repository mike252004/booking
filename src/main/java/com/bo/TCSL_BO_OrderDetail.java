package com.bo;

import com.dao.mysql.TCSL_DAO_OrderDetail;
import com.vo.TCSL_VO_OrderDetail;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-21.
 */
@Repository
public class TCSL_BO_OrderDetail {
    @Resource
    TCSL_DAO_OrderDetail daoOrderDetail;

    /**
     * 查询订单详情
     * @param mcId
     * @return
     */
    public TCSL_VO_Result query(String mcId){
        TCSL_VO_Result result = new TCSL_VO_Result();
        List<TCSL_VO_OrderDetail> detailList = daoOrderDetail.query(mcId);
        result.setContent(detailList);
        result.setRet(0);
        return result;
    }

}
