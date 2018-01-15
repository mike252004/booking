package com.dao.oracle;

import com.po.oracle.PHO_MC_O2O;
import org.apache.ibatis.annotations.Param;

/**
 * Created by zhangtuoyu on 2016-09-19.
 */
public interface TCSL_DAO_Login {
    PHO_MC_O2O queryNameByMcid(
        @Param("MCID") String mcId,
        @Param("MCPWD") String mcPwd
    );
    void updateMc(
        @Param("NAME") String name,
        @Param("ORDERTEL") String phone,
        @Param("ADDRESS") String address,
        @Param("DESP") String desp,
        @Param("MCID") String mcId
    );
    PHO_MC_O2O queryByMcid(
        @Param("MCID") String mcId
    );

}
