package com.vo;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
public class TCSL_VO_MyOrder {
    private List<TCSL_VO_MyOrderInfo> finishList;
    private List<TCSL_VO_MyOrderInfo> noFinishList;
    private List<TCSL_VO_MyOrderInfo> cancelList;

    public List<TCSL_VO_MyOrderInfo> getFinishList() {
        return finishList;
    }

    public void setFinishList(List<TCSL_VO_MyOrderInfo> finishList) {
        this.finishList = finishList;
    }

    public List<TCSL_VO_MyOrderInfo> getNoFinishList() {
        return noFinishList;
    }

    public void setNoFinishList(List<TCSL_VO_MyOrderInfo> noFinishList) {
        this.noFinishList = noFinishList;
    }

    public List<TCSL_VO_MyOrderInfo> getCancelList() {
        return cancelList;
    }

    public void setCancelList(List<TCSL_VO_MyOrderInfo> cancelList) {
        this.cancelList = cancelList;
    }
}
