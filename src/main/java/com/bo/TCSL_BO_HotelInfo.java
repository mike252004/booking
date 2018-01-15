package com.bo;

import com.dao.mysql.TCSL_DAO_Hotel_mysql;
import com.dao.oracle.TCSL_DAO_Login;
import com.po.oracle.PHO_MC_O2O;
import com.vo.TCSL_VO_Hotel;
import com.vo.TCSL_VO_HotelInfo;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by zhangtuoyu on 2016/9/19.
 */
@Repository
public class TCSL_BO_HotelInfo {
    @Resource
    TCSL_DAO_Login daoLogin;
    @Resource
    TCSL_DAO_Hotel_mysql daoHotelMysql;
    /**
     * 查询酒店信息
     * @param mcId
     * @return
     */
    public TCSL_VO_HotelInfo queryInfo(String mcId){
        TCSL_VO_HotelInfo voHotelInfo = new TCSL_VO_HotelInfo();
        PHO_MC_O2O mcInfo = daoLogin.queryByMcid(mcId);
        if(mcInfo == null){
            return voHotelInfo;
        }
        voHotelInfo.setHotelName(mcInfo.getNAME());
        voHotelInfo.setAddress(mcInfo.getADDRESS());
        voHotelInfo.setDescription(mcInfo.getDESP());
        voHotelInfo.setPhoneNum(mcInfo.getORDERTEL());
        TCSL_VO_Hotel hotel = daoHotelMysql.queryHotelInfo(Integer.parseInt(mcId));
        if(hotel != null){
            voHotelInfo.setCityName(hotel.getcCITY());
            voHotelInfo.setLongtitude(hotel.getdLONGTITUDE());
            voHotelInfo.setLatitude(hotel.getdLATITUDE());
        }
        return voHotelInfo;
    }

    /**
     * 更新酒店信息
     * @param mcId
     * @param hotelName
     * @param phoneNum
     * @param address
     * @param desp
     */
    public void saveInfo(String mcId, String hotelName, String phoneNum, String address, String desp,
                         String cityName,String longtitude,String latitude) {
//        daoLogin.updateMc(hotelName,phoneNum,address,desp,mcId);
        //获取酒店gcId
        PHO_MC_O2O pho_mc_o2O = daoLogin.queryByMcid(mcId);
        String gcId = pho_mc_o2O.getGCID();
        TCSL_VO_Hotel hotel = daoHotelMysql.queryHotelInfo(Integer.parseInt(mcId));
        if(hotel == null){
            daoHotelMysql.addHotelInfo(Integer.parseInt(mcId), cityName,
                    Double.parseDouble(longtitude),Double.parseDouble(latitude),Integer.parseInt(gcId));
        }else{
            daoHotelMysql.updateHotelInfo(
                    Integer.parseInt(mcId), cityName,
                    Double.parseDouble(longtitude),Double.parseDouble(latitude),Integer.parseInt(gcId));
        }
    }
}
