package com.vo;

/**
 * 酒店ths_bsc_hotel表映射类
 * Created by zhangtuoyu on 2016-12-07.
 */
public class TCSL_VO_Hotel {
    private Integer iMCID; //酒店id
    private String cCITY; //酒店所在城市
    private Double dLONGTITUDE; //酒店所在纬度
    private Double dLATITUDE;// 酒店所在经度
    private Integer iGCID; //酒店集群id

    public Integer getiMCID() {
        return iMCID;
    }

    public void setiMCID(Integer iMCID) {
        this.iMCID = iMCID;
    }

    public String getcCITY() {
        return cCITY;
    }

    public void setcCITY(String cCITY) {
        this.cCITY = cCITY;
    }

    public Double getdLONGTITUDE() {
        return dLONGTITUDE;
    }

    public void setdLONGTITUDE(Double dLONGTITUDE) {
        this.dLONGTITUDE = dLONGTITUDE;
    }

    public Double getdLATITUDE() {
        return dLATITUDE;
    }

    public void setdLATITUDE(Double dLATITUDE) {
        this.dLATITUDE = dLATITUDE;
    }

    public Integer getiGCID() {
        return iGCID;
    }

    public void setiGCID(Integer iGCID) {
        this.iGCID = iGCID;
    }
}
