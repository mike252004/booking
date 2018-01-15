package com.vo;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
public class TCSL_VO_OrderStatistics {
    private Integer newOrderCount;
    private Integer cancelOrderCount;
    private Integer allOrderCount;
    private List<TCSL_VO_OrderStatisticsItem> statisticsItems;

    public Integer getNewOrderCount() {
        return newOrderCount;
    }

    public void setNewOrderCount(Integer newOrderCount) {
        this.newOrderCount = newOrderCount;
    }

    public Integer getCancelOrderCount() {
        return cancelOrderCount;
    }

    public void setCancelOrderCount(Integer cancelOrderCount) {
        this.cancelOrderCount = cancelOrderCount;
    }

    public Integer getAllOrderCount() {
        return allOrderCount;
    }

    public void setAllOrderCount(Integer allOrderCount) {
        this.allOrderCount = allOrderCount;
    }

    public List<TCSL_VO_OrderStatisticsItem> getStatisticsItems() {
        return statisticsItems;
    }

    public void setStatisticsItems(List<TCSL_VO_OrderStatisticsItem> statisticsItems) {
        this.statisticsItems = statisticsItems;
    }
}
