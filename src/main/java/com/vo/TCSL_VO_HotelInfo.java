package com.vo;

/**
 * Created by zhangtuoyu on 2016/9/19.
 */
public class TCSL_VO_HotelInfo {
    private String hotelName; //酒店名称
    private String phoneNum; //酒店联系电话
    private String address; //酒店地址
    private String description;  //酒店描述信息
    private String cityName; //酒店所在城市名称
    private Double longtitude; //酒店所在位置纬度
    private Double latitude; //酒店所在位置经度


    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
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
