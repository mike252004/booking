package com.rest;

import com.bo.TCSL_BO_MyOrder;
import com.vo.TCSL_VO_Result;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
@Controller
@RequestMapping("/myOrder")
public class TCSL_REST_MyOrder {
    @Resource
    TCSL_BO_MyOrder boMyOrder;

    @RequestMapping("/query")
    @ResponseBody
    public TCSL_VO_Result query(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        String dinerId = request.getParameter("dinerId");
        TCSL_VO_Result result = boMyOrder.query(mcId,dinerId);
        return result;
    }

    @RequestMapping("/cancelOrder")
    @ResponseBody
    public TCSL_VO_Result cancelOrder(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("id");
        String mcId = request.getParameter("mcId");
        String roomTypeId = request.getParameter("roomTypeId");
        String count = request.getParameter("count");
        String endDate = request.getParameter("endDate");
        String startDate = request.getParameter("startDate");
        TCSL_VO_Result result = boMyOrder.cancelOrder(id,mcId,roomTypeId,count,endDate,startDate);
        return result;
    }

    /**
     * 完成订单
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/finishOrder")
    @ResponseBody
    public TCSL_VO_Result finishOrder(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("id");//订单id
        String mcId = request.getParameter("mcId");
        String roomTypeId = request.getParameter("roomTypeId");
        String count = request.getParameter("count");
        String endDate = request.getParameter("endDate");
        String startDate = request.getParameter("startDate");
        TCSL_VO_Result result = boMyOrder.finishOrder(id,mcId,roomTypeId,count,endDate,startDate);
        return result;
    }

    @RequestMapping("/finishPay")
    @ResponseBody
    public TCSL_VO_Result finishPay(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("orderId");//订单id
        TCSL_VO_Result result = boMyOrder.finishPay(id);
        return result;
    }
    @RequestMapping("/checkOrder")
    @ResponseBody
    public TCSL_VO_Result checkOrder(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        String roomTypeId = request.getParameter("roomTypeId");
        String count = request.getParameter("count");
        String endDate = request.getParameter("endDate");
        String startDate = request.getParameter("startDate");
        TCSL_VO_Result result = boMyOrder.checkOrder(mcId,roomTypeId,count,endDate,startDate);
        return result;
    }
    @RequestMapping("/addOrder")
    @ResponseBody
    public TCSL_VO_Result addOrder(HttpServletRequest request, HttpServletResponse response){
        String orderId = request.getParameter("orderId");
        String mcId = request.getParameter("mcId");
        String clinker = request.getParameter("clinker");
        String ilinktel = request.getParameter("ilinktel");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");
        String orderTime = request.getParameter("orderTime");
        String dinerid = request.getParameter("dinerid");
        String idcard = request.getParameter("idcard");
        String roomTypeId = request.getParameter("roomTypeId");
        String count = request.getParameter("count");
        String price = request.getParameter("price");
        String roomName = request.getParameter("roomName");
        String openId = request.getParameter("openId");
        String shopName = request.getParameter("shopName");
        String shopTel = request.getParameter("shopTel");
        String address = request.getParameter("address");
        TCSL_VO_Result result = boMyOrder.addOrder(
                orderId,mcId,clinker,ilinktel,startDate,endDate,orderTime,dinerid,idcard,roomTypeId,count,price,roomName,openId,shopName,shopTel,address);
        return result;
    }
    @RequestMapping("/createPayMd5")
    @ResponseBody
    public TCSL_VO_Result createPayMd5(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        String data = request.getParameter("data");
        TCSL_VO_Result result = boMyOrder.createPayMd5(mcId,data);
        return result;
    }
    @RequestMapping("/queryOpenId")
    @ResponseBody
    public TCSL_VO_Result queryOpenId(HttpServletRequest request, HttpServletResponse response){
        String orderId = request.getParameter("orderId");
        TCSL_VO_Result result = boMyOrder.queryOpenId(orderId);
        return result;
    }
    @RequestMapping("/getParentOpenId")
    @ResponseBody
    public TCSL_VO_Result getParentOpenId(HttpServletRequest request, HttpServletResponse response){
        String code = request.getParameter("code");
        TCSL_VO_Result result = boMyOrder.getParentOpenId(code);
        return result;
    }
    @RequestMapping("/getPayKey")
    @ResponseBody
    public TCSL_VO_Result getPayKey(HttpServletRequest request, HttpServletResponse response){
        String param = request.getParameter("requestParam");
        String head = request.getParameter("headParam");
        JSONObject headJson  = JSONObject.fromObject(head);
        TCSL_VO_Result result = boMyOrder.getPayKey(param,headJson);
        return result;
    }

}
