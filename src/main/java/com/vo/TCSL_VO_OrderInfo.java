package com.vo;

import java.math.BigDecimal;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
public class TCSL_VO_OrderInfo {
    private String CNAME; //房型
    private String CLINKER; //客户名称
    private BigDecimal MPRICE; //预定价格
    private String ILINKTEL; //联系电话
    private String  DTORDERDATE; //预订时间
    private int STATEID; //订单状态
    private String DTBEGDATE; //到店时间
    private String DTENDDATE; //离店时间

    public String getCNAME() {
        return CNAME;
    }

    public void setCNAME(String CNAME) {
        this.CNAME = CNAME;
    }

    public String getCLINKER() {
        return CLINKER;
    }

    public void setCLINKER(String CLINKER) {
        this.CLINKER = CLINKER;
    }

    public String getILINKTEL() {
        return ILINKTEL;
    }

    public void setILINKTEL(String ILINKTEL) {
        this.ILINKTEL = ILINKTEL;
    }

    public Integer getSTATEID() {
        return STATEID;
    }

    public void setSTATEID(Integer STATEID) {
        this.STATEID = STATEID;
    }

    public void setSTATEID(int STATEID) {
        this.STATEID = STATEID;
    }

    public BigDecimal getMPRICE() {
        return MPRICE;
    }

    public void setMPRICE(BigDecimal MPRICE) {
        this.MPRICE = MPRICE;
    }

    public String getDTORDERDATE() {
        return DTORDERDATE;
    }

    public void setDTORDERDATE(String DTORDERDATE) {
        this.DTORDERDATE = DTORDERDATE;
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
}
