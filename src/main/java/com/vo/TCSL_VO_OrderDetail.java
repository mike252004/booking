package com.vo;

/**
 * Created by zhangtuoyu on 2016-09-21.
 */
public class TCSL_VO_OrderDetail {
    private String ID; //订单号
    private String IDCARD; //身份证号
    private String DTORDERDATE; //预订时间
    private String CLINKER; //客户姓名
    private String CNAME; //预订房型
    private String MPRICE; //预订价格
    private String ICOUNT; //预订数量
    private String ILINKTEL; //联系电话
    private String DTBEGDATE;//到店时间
    private String DTENDDATE; //离店时间
    private String STATEID; //订单状态
    private String ICHECKFLG; //支付状态 0 未支付  1已支付

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getIDCARD() {
        return IDCARD;
    }

    public void setIDCARD(String IDCARD) {
        this.IDCARD = IDCARD;
    }

    public String getDTORDERDATE() {
        return DTORDERDATE;
    }

    public void setDTORDERDATE(String DTORDERDATE) {
        this.DTORDERDATE = DTORDERDATE;
    }

    public String getCLINKER() {
        return CLINKER;
    }

    public void setCLINKER(String CLINKER) {
        this.CLINKER = CLINKER;
    }

    public String getCNAME() {
        return CNAME;
    }

    public void setCNAME(String CNAME) {
        this.CNAME = CNAME;
    }

    public String getMPRICE() {
        return MPRICE;
    }

    public void setMPRICE(String MPRICE) {
        this.MPRICE = MPRICE;
    }

    public String getICOUNT() {
        return ICOUNT;
    }

    public void setICOUNT(String ICOUNT) {
        this.ICOUNT = ICOUNT;
    }

    public String getILINKTEL() {
        return ILINKTEL;
    }

    public void setILINKTEL(String ILINKTEL) {
        this.ILINKTEL = ILINKTEL;
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

    public String getSTATEID() {
        return STATEID;
    }

    public void setSTATEID(String STATEID) {
        this.STATEID = STATEID;
    }

    public String getICHECKFLG() {
        return ICHECKFLG;
    }

    public void setICHECKFLG(String ICHECKFLG) {
        this.ICHECKFLG = ICHECKFLG;
    }
}
