package com.rest;

import com.bo.TCSL_BO_HotelInfo;
import com.vo.TCSL_VO_HotelInfo;
import com.vo.TCSL_VO_Result;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016/9/19.
 */
@Controller
@RequestMapping("/hotelInfo")
public class TCSL_REST_HotelInfo {
    @Resource
    TCSL_BO_HotelInfo boHotelInfo;

    /**
     * 查询酒店信息维护内容
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryInfo")
    @ResponseBody
    public JSONObject queryInfo(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        TCSL_VO_HotelInfo voHotelInfo = boHotelInfo.queryInfo(mcId);
        TCSL_VO_Result result = new TCSL_VO_Result();
        result.setContent(voHotelInfo);
        return JSONObject.fromObject(result);
    }

    /**
     * 更新酒店信息维护内容
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updateInfo")
    @ResponseBody
    public TCSL_VO_Result saveInfo(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        String hotelName = request.getParameter("hotelName");
        String phoneNum = request.getParameter("phoneNum");
        String address = request.getParameter("address");
        String description = request.getParameter("description");
        String cityName = request.getParameter("cityName");
        String longtitude = request.getParameter("longtitude");
        String latitude = request.getParameter("latitude");
        boHotelInfo.saveInfo(mcId,hotelName,phoneNum,address,description,cityName,longtitude,latitude);
        TCSL_VO_Result result = new TCSL_VO_Result();
        result.setRet(0);
        return result;
    }
}
