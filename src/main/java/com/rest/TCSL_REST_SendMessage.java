package com.rest;

import com.bo.TCSL_BO_SendMessage;
import com.vo.TCSL_VO_Result;
import com.vo.TCSL_VO_SendMessageContent;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-10-08.
 */
@Controller
@RequestMapping("/send")
public class TCSL_REST_SendMessage {
    @Resource
    TCSL_BO_SendMessage boSendMessage;
    /**
     * 公众号向指定用户发送信息
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/sendMessage")
    @ResponseBody
    public TCSL_VO_Result sendMessage(HttpServletRequest request, HttpServletResponse response,TCSL_VO_SendMessageContent content) throws Exception {
        TCSL_VO_Result result = boSendMessage.sendMessage(content);
        return result;
    }
}
