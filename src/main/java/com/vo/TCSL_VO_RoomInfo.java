package com.vo;

/**
 * Created by zhangtuoyu on 2016-09-23.
 */
public class TCSL_VO_RoomInfo {
    private String CNAME; //房型名称
    private String CROOMTYPEID; //房型id
    private String MPRICE; //房型价格
    private String imgName; //房型图片名称
    private String shopName; //商户名称
    private String ROOMSTATUS; //房型数量状态   1 可定数大于等于1；2 可定数小于等于0

    public String getCNAME() {
        return CNAME;
    }

    public void setCNAME(String CNAME) {
        this.CNAME = CNAME;
    }

    public String getCROOMTYPEID() {
        return CROOMTYPEID;
    }

    public void setCROOMTYPEID(String CROOMTYPEID) {
        this.CROOMTYPEID = CROOMTYPEID;
    }

    public String getMPRICE() {
        return MPRICE;
    }

    public void setMPRICE(String MPRICE) {
        this.MPRICE = MPRICE;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getROOMSTATUS() {
        return ROOMSTATUS;
    }

    public void setROOMSTATUS(String ROOMSTATUS) {
        this.ROOMSTATUS = ROOMSTATUS;
    }
}
