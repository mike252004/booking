package com.rest;

import com.bo.TCSL_BO_ServerFacilityMatain;
import com.vo.TCSL_VO_Facilitys;
import com.vo.TCSL_VO_Result;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-09-19.
 */
@Controller
@RequestMapping("/facilityMatain")
public class TCSL_REST_ServerFacilityMatain {
    @Resource
    TCSL_BO_ServerFacilityMatain boFacilityMatain;

    @RequestMapping("/addFacility")
    @ResponseBody
    public void addFacility(HttpServletRequest request, HttpServletResponse response){
        String itemName = request.getParameter("itemName"); //设施名称
        String itemDes = request.getParameter("itemDes"); //设施描述
        String itemClass = request.getParameter("itemClass"); //设施类别
        String itemId = request.getParameter("itemId"); //设施id
        String mcId = request.getParameter("mcId"); //商户id
        boFacilityMatain.addFacility(itemName,itemDes,itemClass,itemId,mcId);
    }
    @RequestMapping("/deleteFacility")
    @ResponseBody
    public void deleteFacility(HttpServletRequest request, HttpServletResponse response){
        String itemName = request.getParameter("itemName"); //设施名称
        String itemClass = request.getParameter("itemClass"); //设施类别
        String itemId = request.getParameter("itemId"); //设施id
        String mcId = request.getParameter("mcId"); //商户id
        boFacilityMatain.deleteFacility(itemName,itemClass,itemId,mcId);
    }
    @RequestMapping("/queryFacility")
    @ResponseBody
    public JSONObject queryFacility(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId"); //设施id
        TCSL_VO_Facilitys  facilitys = boFacilityMatain.queryFacility(mcId);
        TCSL_VO_Result result = new TCSL_VO_Result();
        result.setContent(facilitys);
        result.setRet(0);
        return JSONObject.fromObject(result);
    }

}
