package com.po.mysql;

import java.sql.Timestamp;
import java.util.Date;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
public class PHO_HT_ORDER {
    private String ORDERID;
    private String ORDERNO;
    private Integer MCID;
    private String CLINKER;
    private String ILINKTEL;
    private Date DTBEGDATE;
    private Date DTENDDATE;
    private Timestamp DTORDERDATE;
    private Integer STATEID;
    private Integer DINERID;
    private String IDCARD;

    public String getORDERID() {
        return ORDERID;
    }

    public void setORDERID(String ORDERID) {
        this.ORDERID = ORDERID;
    }

    public String getORDERNO() {
        return ORDERNO;
    }

    public void setORDERNO(String ORDERNO) {
        this.ORDERNO = ORDERNO;
    }

    public Integer getMCID() {
        return MCID;
    }

    public void setMCID(Integer MCID) {
        this.MCID = MCID;
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

    public Date getDTBEGDATE() {
        return DTBEGDATE;
    }

    public void setDTBEGDATE(Date DTBEGDATE) {
        this.DTBEGDATE = DTBEGDATE;
    }

    public Date getDTENDDATE() {
        return DTENDDATE;
    }

    public void setDTENDDATE(Date DTENDDATE) {
        this.DTENDDATE = DTENDDATE;
    }

    public Timestamp getDTORDERDATE() {
        return DTORDERDATE;
    }

    public void setDTORDERDATE(Timestamp DTORDERDATE) {
        this.DTORDERDATE = DTORDERDATE;
    }

    public Integer getSTATEID() {
        return STATEID;
    }

    public void setSTATEID(Integer STATEID) {
        this.STATEID = STATEID;
    }

    public Integer getDINERID() {
        return DINERID;
    }

    public void setDINERID(Integer DINERID) {
        this.DINERID = DINERID;
    }

    public String getIDCARD() {
        return IDCARD;
    }

    public void setIDCARD(String IDCARD) {
        this.IDCARD = IDCARD;
    }
}
