package com.po.oracle;

/**
 * Created by zhangtuoyu on 2016-09-19.
 */
public class PHO_HT_HOTELITEM {
    private Integer ITEMID;
    private String ITEMNAME;
    private String ITENDESP;
    private String ITENCLASS;
    private String MCID;

    public Integer getITEMID() {
        return ITEMID;
    }

    public void setITEMID(Integer ITEMID) {
        this.ITEMID = ITEMID;
    }

    public String getITEMNAME() {
        return ITEMNAME;
    }

    public void setITEMNAME(String ITEMNAME) {
        this.ITEMNAME = ITEMNAME;
    }

    public String getITENDESP() {
        return ITENDESP;
    }

    public void setITENDESP(String ITENDESP) {
        this.ITENDESP = ITENDESP;
    }

    public String getITENCLASS() {
        return ITENCLASS;
    }

    public void setITENCLASS(String ITENCLASS) {
        this.ITENCLASS = ITENCLASS;
    }

    public String getMCID() {
        return MCID;
    }

    public void setMCID(String MCID) {
        this.MCID = MCID;
    }
}
