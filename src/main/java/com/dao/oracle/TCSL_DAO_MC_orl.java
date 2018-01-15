package com.dao.oracle;

import com.po.oracle.PHO_MC_O2O;
import org.apache.ibatis.annotations.Param;

/**
 * Created by Administrator on 2016-09-24.
 */
public interface TCSL_DAO_MC_orl {
    PHO_MC_O2O queryByMcId(
        @Param("MCID") String mcId
    );
}
