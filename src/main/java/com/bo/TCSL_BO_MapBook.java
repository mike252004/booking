package com.bo;

import com.dao.mysql.TCSL_DAO_HotelDetail_mysql;
import com.dao.mysql.TCSL_DAO_Hotel_mysql;
import com.dao.oracle.TCSL_DAO_HotelDetail;
import com.vo.TCSL_VO_Hotel;
import com.vo.TCSL_VO_HotelDetail;
import com.vo.TCSL_VO_Result;
import com.vo.TCSL_VO_RoomInfo;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zhangtuoyu on 2016-12-13.
 */
@Repository
public class TCSL_BO_MapBook {
    @Resource
    TCSL_DAO_HotelDetail daoHotelDetail;
    @Resource
    TCSL_DAO_Hotel_mysql daoHotelMysql;
    @Resource
    TCSL_DAO_HotelDetail_mysql daoHotelDetailMysql;

    public TCSL_VO_Result getHotelList(String gcId,String name){
        TCSL_VO_Result result = new TCSL_VO_Result();
        List<TCSL_VO_HotelDetail> resultList = new ArrayList<TCSL_VO_HotelDetail>(); //最终返回结果酒店列表
        List<TCSL_VO_HotelDetail> hotelList= daoHotelDetail.queryHotelList(gcId); //根据集群号gcId查询酒店列表
        List<TCSL_VO_Hotel> hotelInfoList = daoHotelMysql.queryAll(); //查询酒店位置信息
        Map<Integer,TCSL_VO_Hotel> hotelInfoMap = new HashMap<Integer,TCSL_VO_Hotel>();
        for (TCSL_VO_Hotel hotel:hotelInfoList) {
            Integer hotel_mcId = hotel.getiMCID();
            hotelInfoMap.put(hotel_mcId,hotel);
        }
        for (TCSL_VO_HotelDetail voHotelDetail: hotelList) { //遍历酒店列表
            //添加酒店房型相关信息
            Date today = new Date(); //查询房型开始时间，结束时间
            long time = today.getTime() + 1*24*60*60*1000;
            Date yestoday = new Date(time);
            SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd");
            String endTime = fm.format(yestoday);
            String startTime = fm.format(today);
            String mcId = voHotelDetail.getMCID(); //获取酒店id
            List<TCSL_VO_RoomInfo> roomList =
                    daoHotelDetailMysql.queryRoomListByTime(mcId,startTime,endTime);//该酒店的房型列表
            voHotelDetail.setRoomInfoList(roomList);
            //添加酒店定位相关信息
            TCSL_VO_Hotel hotel = hotelInfoMap.get(Integer.parseInt(voHotelDetail.getMCID()));
            if(hotel == null){
                continue;
            }
            voHotelDetail.setLongtitude(hotel.getdLONGTITUDE());
            voHotelDetail.setLatitude(hotel.getdLATITUDE());
            String cityName = hotel.getcCITY();
            if(name != null){ //城市过滤条件不为空
                if(cityName != null){ //酒店所在城市不为空
                    //存在name为天津市，cityName为天津的情况
                    //判断城市名称(条件)是否包含城市名称(酒店所在城市)或是否相同
                    if(name.indexOf(cityName) != -1 || name.equals(cityName)){
                        //符合城市名称，添加到resultList中
                        voHotelDetail.setCity(cityName);
                        resultList.add(voHotelDetail);
                    }
                }
            }else{ //城市过滤条件为空，不进行过滤
                voHotelDetail.setCity(cityName);
                resultList.add(voHotelDetail);
            }
        }
        result.setRet(0);
        result.setContent(resultList);
        return result;
    }
}
