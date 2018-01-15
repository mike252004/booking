package com.vo;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016/9/17.
 */
public class TCSL_VO_BookInfo {
    private Integer finishOrderCount;
    private Integer allOrderCount;
    private Integer cancelOrderCount;
    private List<TCSL_VO_BookHistory> historyList;

    public Integer getFinishOrderCount() {
        return finishOrderCount;
    }

    public void setFinishOrderCount(Integer finishOrderCount) {
        this.finishOrderCount = finishOrderCount;
    }

    public Integer getAllOrderCount() {
        return allOrderCount;
    }

    public void setAllOrderCount(Integer allOrderCount) {
        this.allOrderCount = allOrderCount;
    }

    public Integer getCancelOrderCount() {
        return cancelOrderCount;
    }

    public void setCancelOrderCount(Integer cancelOrderCount) {
        this.cancelOrderCount = cancelOrderCount;
    }

    public List<TCSL_VO_BookHistory> getHistoryList() {
        return historyList;
    }

    public void setHistoryList(List<TCSL_VO_BookHistory> historyList) {
        this.historyList = historyList;
    }
}
