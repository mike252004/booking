package com.vo;

/**
 * Created by zhangtuoyu on 2016-09-26.
 */
public class TCSL_VO_OrderFormInfo {
    private String COUNT; //可预订房间数量
    private String CNAME; //房型名称
    private String days; //入住时间
    private String totalPrice; //支付金额
    private String imgName; //图片名称
    private String shopName; //商户名称

    public String getCOUNT() {
        return COUNT;
    }

    public void setCOUNT(String COUNT) {
        this.COUNT = COUNT;
    }

    public String getCNAME() {
        return CNAME;
    }

    public void setCNAME(String CNAME) {
        this.CNAME = CNAME;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
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
}
