package com.bo;

import com.dao.oracle.TCSL_DAO_Login;
import com.po.oracle.PHO_MC_O2O;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by zhangtuoyu on 2016/9/15.
 */
@Repository
public class TCSL_BO_Login {
    @Resource
    TCSL_DAO_Login dao_login;

    public TCSL_VO_Result login(String shopId, String password){
        TCSL_VO_Result result = new TCSL_VO_Result();
        PHO_MC_O2O shopInfo = dao_login.queryNameByMcid(shopId,password);
        if(shopInfo == null){
            result.setRet(-1);
            return result;
        }
        String name = shopInfo.getNAME();
        result.setRet(0); //正确返回0 否则返回-1
        result.setContent(name);
        return result;
    }
}
