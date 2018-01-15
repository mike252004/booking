package com.rest;

import com.bo.TCSL_BO_OrderStatistics;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-09-20.
 */
@Controller
@RequestMapping("/orderStatistics")
public class TCSL_REST_OrderStatistics {
    @Resource
    TCSL_BO_OrderStatistics boOrderStatistics;
    @RequestMapping("/queryInfo")
    @ResponseBody
    public TCSL_VO_Result queryInfo(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        String interval = request.getParameter("interval");
        String stateId = request.getParameter("stateId");
        TCSL_VO_Result result = boOrderStatistics.queryInfo(mcId,interval,stateId);
        return result;
    }
}
