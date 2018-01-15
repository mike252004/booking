package com.rest;

import com.bo.TCSL_BO_HotelDetail;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
@Controller
@RequestMapping("/hotelDetail")
public class TCSL_REST_HotelDetail {
    @Resource
    TCSL_BO_HotelDetail boHotelDetail;
    @RequestMapping("/queryHotelList")
    @ResponseBody
    public TCSL_VO_Result queryHotelList(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String gcId = request.getParameter("gcId");
        String name = request.getParameter("cityName");
        TCSL_VO_Result result = boHotelDetail.queryHotelList(gcId,name);
        return result;
    }
    @RequestMapping("/queryHotelDetail")
    @ResponseBody
    public TCSL_VO_Result queryHotelDetail(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String mcId = request.getParameter("mcId");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");
        if(endDate == null){
            Date today = new Date();
            long time = today.getTime() + 1*24*60*60*1000;
            Date yestoday = new Date(time);
            SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd");
            endDate = fm.format(yestoday);
        }
        TCSL_VO_Result result = boHotelDetail.queryHotelDetail(mcId,startDate,endDate);
        return result;
    }

    /**
     * 查询酒店设施
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/queryFacility")
    @ResponseBody
    public TCSL_VO_Result queryFacility(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String mcId = request.getParameter("mcId");
        TCSL_VO_Result result = boHotelDetail.queryFacility(mcId);
        return result;
    }
    @RequestMapping("/queryRoomList")
    @ResponseBody
    public TCSL_VO_Result queryRoomList(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String mcId = request.getParameter("mcId");
        TCSL_VO_Result result = boHotelDetail.queryRoomList(mcId);
        return result;
    }
}
