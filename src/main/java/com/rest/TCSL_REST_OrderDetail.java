package com.rest;

import com.bo.TCSL_BO_OrderDetail;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-09-21.
 */
@Controller
@RequestMapping("/orderDetail")
public class TCSL_REST_OrderDetail {
    @Resource
    TCSL_BO_OrderDetail boOrderDetail;

    @RequestMapping("/query")
    @ResponseBody
    public TCSL_VO_Result query(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        TCSL_VO_Result result = boOrderDetail.query(mcId);
        return result;
    }
}
