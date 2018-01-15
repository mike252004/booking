package com.vo;

import java.math.BigDecimal;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
public class TCSL_VO_MyOrderInfo {
    private String CNAME; //房型
    private String DTBEGDATE; //入住时间
    private String DTENDDATE; //离店时间
    private String ID;//订单号
    private String ILINKTEL; //联系电话
    private String CLINKER; //客户姓名
    private BigDecimal MPRICE; //房间单价
    private Integer ICOUNT; //订房数量
    private String ORDERNO; //订单号
    private int stayDays; //入住天数
    private BigDecimal money; //房费
    private String CROOMTYPEID; //房型id
    private String IDCARD; //身份证号
    public String getCNAME() {
        return CNAME;
    }

    public void setCNAME(String CNAME) {
        this.CNAME = CNAME;
    }

    public String getDTBEGDATE() {
        return DTBEGDATE;
    }

    public void setDTBEGDATE(String DTBEGDATE) {
        this.DTBEGDATE = DTBEGDATE;
    }

    public String getDTENDDATE() {
        return DTENDDATE;
    }

    public void setDTENDDATE(String DTENDDATE) {
        this.DTENDDATE = DTENDDATE;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getILINKTEL() {
        return ILINKTEL;
    }

    public void setILINKTEL(String ILINKTEL) {
        this.ILINKTEL = ILINKTEL;
    }

    public String getCLINKER() {
        return CLINKER;
    }

    public void setCLINKER(String CLINKER) {
        this.CLINKER = CLINKER;
    }

    public BigDecimal getMPRICE() {
        return MPRICE;
    }

    public void setMPRICE(BigDecimal MPRICE) {
        this.MPRICE = MPRICE;
    }

    public Integer getICOUNT() {
        return ICOUNT;
    }

    public void setICOUNT(Integer ICOUNT) {
        this.ICOUNT = ICOUNT;
    }

    public String getORDERNO() {
        return ORDERNO;
    }

    public void setORDERNO(String ORDERNO) {
        this.ORDERNO = ORDERNO;
    }

    public int getStayDays() {
        return stayDays;
    }

    public void setStayDays(int stayDays) {
        this.stayDays = stayDays;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public String getCROOMTYPEID() {
        return CROOMTYPEID;
    }

    public void setCROOMTYPEID(String CROOMTYPEID) {
        this.CROOMTYPEID = CROOMTYPEID;
    }

    public String getIDCARD() {
        return IDCARD;
    }

    public void setIDCARD(String IDCARD) {
        this.IDCARD = IDCARD;
    }
}
