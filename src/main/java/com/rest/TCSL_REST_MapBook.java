package com.rest;

import com.bo.TCSL_BO_MapBook;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-12-13.
 */
@Controller
@RequestMapping("/mapBook")
public class TCSL_REST_MapBook {
    @Resource
    TCSL_BO_MapBook boMapBook;

    /**
     * 地图预订-查询地图中显示的酒店列表
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/getHotelList")
    @ResponseBody
    public TCSL_VO_Result getHotelList(HttpServletRequest request, HttpServletResponse response){
        String gcId = request.getParameter("gcId");
        String cityName = request.getParameter("cityName");
        TCSL_VO_Result result = boMapBook.getHotelList(gcId,cityName);
        return result;
    }
}
