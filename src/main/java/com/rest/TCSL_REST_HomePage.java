package com.rest;

import com.bo.TCSL_BO_HomePage;
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
@RequestMapping("/homePage")
public class TCSL_REST_HomePage {
    @Resource
    TCSL_BO_HomePage boHomePage;

    /**
     * 查询历史订单数据
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryHistoryData")
    @ResponseBody
    public TCSL_VO_Result queryHistoryData(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        TCSL_VO_Result result = boHomePage.queryHistoryData(mcId);
        return  result;
    }

    /**
     * 查询今日抵店数据
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryTodayNotArrive")
    @ResponseBody
    public TCSL_VO_Result queryTodayNotArrive(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        TCSL_VO_Result result = boHomePage.queryTodayNotArrive(mcId);
        return  result;
    }

    /**
     * 查询今日新增订单
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/queryNewOrder")
    @ResponseBody
    public TCSL_VO_Result queryNewOrder(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        TCSL_VO_Result result = boHomePage.queryNewOrder(mcId);
        return  result;
    }
}
