package com.vo;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016/9/17.
 */
public class TCSL_VO_BookHistory {
    private String date;
    private Integer notArriveCount;
    private Integer arriveCount;
    private Integer cancelCount;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getNotArriveCount() {
        return notArriveCount;
    }

    public void setNotArriveCount(Integer notArriveCount) {
        this.notArriveCount = notArriveCount;
    }

    public Integer getArriveCount() {
        return arriveCount;
    }

    public void setArriveCount(Integer arriveCount) {
        this.arriveCount = arriveCount;
    }

    public Integer getCancelCount() {
        return cancelCount;
    }

    public void setCancelCount(Integer cancelCount) {
        this.cancelCount = cancelCount;
    }
}
