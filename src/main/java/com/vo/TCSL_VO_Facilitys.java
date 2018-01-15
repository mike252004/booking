package com.vo;

import com.po.oracle.PHO_HT_HOTELITEM;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-19.
 */
public class TCSL_VO_Facilitys {
    private List<PHO_HT_HOTELITEM> roomList; //客房设施列表
    private List<PHO_HT_HOTELITEM> multipleList; //综合设施列表
    private List<PHO_HT_HOTELITEM> serverList; //服务项目列表
    private List<PHO_HT_HOTELITEM> toyList; //娱乐设施列表

    public List<PHO_HT_HOTELITEM> getRoomList() {
        return roomList;
    }

    public void setRoomList(List<PHO_HT_HOTELITEM> roomList) {
        this.roomList = roomList;
    }

    public List<PHO_HT_HOTELITEM> getMultipleList() {
        return multipleList;
    }

    public void setMultipleList(List<PHO_HT_HOTELITEM> multipleList) {
        this.multipleList = multipleList;
    }

    public List<PHO_HT_HOTELITEM> getServerList() {
        return serverList;
    }

    public void setServerList(List<PHO_HT_HOTELITEM> serverList) {
        this.serverList = serverList;
    }

    public List<PHO_HT_HOTELITEM> getToyList() {
        return toyList;
    }

    public void setToyList(List<PHO_HT_HOTELITEM> toyList) {
        this.toyList = toyList;
    }
}
