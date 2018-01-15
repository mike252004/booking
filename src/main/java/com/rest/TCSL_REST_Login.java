package com.rest;

import com.bo.TCSL_BO_Login;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016/9/15.
 */
@Controller
public class TCSL_REST_Login {
    @Resource
    TCSL_BO_Login boLogin;

    @RequestMapping("/login")
    @ResponseBody
    public TCSL_VO_Result login(HttpServletRequest request, HttpServletResponse response){
        String shopId = request.getParameter("shopId"); //商户名称
        String password = request.getParameter("pwd"); //密码
        TCSL_VO_Result result = boLogin.login(shopId,password);
        return result;
    }
}
