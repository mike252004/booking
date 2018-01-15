package com.rest;

import com.bo.TCSL_BO_Book;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-09-26.
 */
@Controller
@RequestMapping("book")
public class TCSL_REST_Book {
    @Resource
    TCSL_BO_Book boBook;
    /**
     * 初始化订单信息
     * @param request
     * @param response
     */
    @RequestMapping("/queryInfo")
    @ResponseBody
    public TCSL_VO_Result queryInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String mcId = request.getParameter("mcId"); //商户id
        String startDate = request.getParameter("startDate"); //入住时间
        String endDate = request.getParameter("endDate"); //离店时间
        String roomTypeId = request.getParameter("roomTypeId"); //房型id
        TCSL_VO_Result result = boBook.queryInfo(mcId,startDate,endDate,roomTypeId);
        return  result;
    }
}
