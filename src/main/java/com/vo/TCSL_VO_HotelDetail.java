package com.vo;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
public class TCSL_VO_HotelDetail extends TCSL_VO_Facilitys{
    private String MCID;
    private String NAME;
    private String ADDRESS;
    private String DESP;
    private String hoteImg;
    private String phone;
    private String ORDERTEL;
    private List<TCSL_VO_RoomInfo> roomInfoList;
    private String city; //酒店所在城市
    private Double longtitude; //酒店所在经度
    private Double latitude; //酒店所在纬度

    public String getMCID() {
        return MCID;
    }

    public void setMCID(String MCID) {
        this.MCID = MCID;
    }

    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public String getADDRESS() {
        return ADDRESS;
    }

    public void setADDRESS(String ADDRESS) {
        this.ADDRESS = ADDRESS;
    }

    public String getHoteImg() {
        return hoteImg;
    }

    public void setHoteImg(String hoteImg) {
        this.hoteImg = hoteImg;
    }

    public List<TCSL_VO_RoomInfo> getRoomInfoList() {
        return roomInfoList;
    }

    public void setRoomInfoList(List<TCSL_VO_RoomInfo> roomInfoList) {
        this.roomInfoList = roomInfoList;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDESP() {
        return DESP;
    }

    public void setDESP(String DESP) {
        this.DESP = DESP;
    }

    public String getORDERTEL() {
        return ORDERTEL;
    }

    public void setORDERTEL(String ORDERTEL) {
        this.ORDERTEL = ORDERTEL;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getLongtitude() {
        return longtitude;
    }

    public void setLongtitude(Double longtitude) {
        this.longtitude = longtitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
}
