package com.bo;

import com.dao.mysql.TCSL_DAO_MyOrder;
import com.dao.mysql.TCSL_DAO_SendMessage_mysql;
import com.util.TCSL_UTIL_Common;
import com.vo.TCSL_VO_MyOrder;
import com.vo.TCSL_VO_MyOrderInfo;
import com.vo.TCSL_VO_Result;
import com.vo.TCSL_VO_SendMessageContent;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.security.MessageDigest;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
@Repository
public class TCSL_BO_MyOrder {
    @Resource
    TCSL_DAO_MyOrder daoMyOrder;
    @Resource
    TCSL_BO_SendMessage boSendMessage;
    @Resource
    TCSL_DAO_SendMessage_mysql daoSendMessageMysql;
    @Resource
    TCSL_UTIL_Common tcslUtilCommon;

    public TCSL_VO_Result query(String mcId,String dinerId){
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_MyOrder myorder = new TCSL_VO_MyOrder();
        List<TCSL_VO_MyOrderInfo> noFinishList = daoMyOrder.query(mcId,dinerId,"0","0"); //未入住  未支付
        for (TCSL_VO_MyOrderInfo voMyOrderInfo:noFinishList) {
            //计算住房天数
            SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-DD");
            String startDate = voMyOrderInfo.getDTBEGDATE();
            startDate = startDate + " 00:00:00";
            Timestamp starTime = Timestamp.valueOf(startDate);
            String endDate = voMyOrderInfo.getDTENDDATE();
            endDate = endDate + " 00:00:00";
            Timestamp endTime = Timestamp.valueOf(endDate);
            long time = endTime.getTime() - starTime.getTime();
            long stayDay = (time / (1000 * 60 * 60 * 24));
            voMyOrderInfo.setStayDays(Math.round(stayDay));
        }
        List<TCSL_VO_MyOrderInfo> finishList = daoMyOrder.query(mcId,dinerId,"0","1"); // 未入住 已支付
        for (TCSL_VO_MyOrderInfo voMyOrderInfo:finishList) {
            //计算住房天数
            String startDate = voMyOrderInfo.getDTBEGDATE();
            startDate = startDate + " 00:00:00";
            Timestamp starTime = Timestamp.valueOf(startDate);
            String endDate = voMyOrderInfo.getDTENDDATE();
            endDate = endDate + " 00:00:00";
            Timestamp endTime = Timestamp.valueOf(endDate);
            long time = endTime.getTime() - starTime.getTime();
            long stayDay = (time / (1000 * 60 * 60 * 24));
            voMyOrderInfo.setStayDays(Math.round(stayDay));
        }
        List<TCSL_VO_MyOrderInfo> cancelList = daoMyOrder.query(mcId,dinerId,"3","0"); //取消
        for (TCSL_VO_MyOrderInfo voMyOrderInfo:cancelList) {
            //计算住房天数
            String startDate = voMyOrderInfo.getDTBEGDATE();
            startDate = startDate + " 00:00:00";
            Timestamp starTime = Timestamp.valueOf(startDate);
            String endDate = voMyOrderInfo.getDTENDDATE();
            endDate = endDate + " 00:00:00";
            Timestamp endTime = Timestamp.valueOf(endDate);
            long time = endTime.getTime() - starTime.getTime();
            long stayDay = (time / (1000 * 60 * 60 * 24));
            voMyOrderInfo.setStayDays(Math.round(stayDay));
        }
        myorder.setNoFinishList(noFinishList);
        myorder.setFinishList(finishList);
        myorder.setCancelList(cancelList);
        result.setContent(myorder);
        result.setRet(0);
        return result;
    }
    public TCSL_VO_Result cancelOrder(String id,String mcId,String roomTypeId,String count,String endDate,String startDate){
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.changeOrderStatus(id,"3","0"); //取消订单
        startDate = startDate + " 00:00:00";
        endDate = endDate + " 00:00:00";
        Timestamp startTime = Timestamp.valueOf(startDate);
        Timestamp endTime = Timestamp.valueOf(endDate);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        while (!startTime.equals(endTime)){
            String today = format.format(startTime.getTime());
            daoMyOrder.changeRoomCount(mcId,roomTypeId,count,today); //增加可预订数
            long time = startTime.getTime() + (1000 * 60 * 60 * 24);
            Timestamp tomorrow = new Timestamp(time);
            startTime = tomorrow;
        }
        result.setRet(0);
        return result;
    }
    public TCSL_VO_Result finishOrder(String id,String mcId,String roomTypeId,String count,String endDate,String startDate){
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.changeOrderStatus(id,"0","0"); //未入住 未支付
        startDate = startDate + " 00:00:00";
        endDate = endDate + " 00:00:00";
        Timestamp startTime = Timestamp.valueOf(startDate);
        Timestamp endTime = Timestamp.valueOf(endDate);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        while (!startTime.equals(endTime)){
            String today = format.format(startTime.getTime());
            daoMyOrder.changeRoomCount(mcId,roomTypeId,count,today); //增加可预订数
            long time = startTime.getTime() + (1000 * 60 * 60 * 24);
            Timestamp tomorrow = new Timestamp(time);
            startTime = tomorrow;
        }
        result.setRet(0);
        return result;
    }

    public TCSL_VO_Result finishPay(String id){
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.changeOrderStatus(id,"0","1"); //未入住 已支付
        result.setRet(0);
        return result;
    }

    /**
     * 获取用户在父公众号的openId
     * @param code
     * @return
     */
    public TCSL_VO_Result getParentOpenId(String code){
        System.out.println("bo_MyOrder----code---"+code);
        TCSL_VO_Result result = new TCSL_VO_Result();
        try {
            //获取parentOpenId
            String parentAppId = tcslUtilCommon.getPropertyParam("weChat.properties","weChat.praentAppId");
            System.out.println("bo_MyOrder----parentAppId---"+parentAppId);
            String parentSecret = tcslUtilCommon.getPropertyParam("weChat.properties","weChat.parentSecret");
            System.out.println("bo_MyOrder----parentSecret---"+parentSecret);
            String url = "https://api.weixin.qq.com/sns/oauth2/access_token?" +
                    "appid="+parentAppId +
                    "&secret="+parentSecret +
                    "&code="+code +
                    "&grant_type=authorization_code";
            JSONObject requestResult = tcslUtilCommon.httpsRequest(url,"GET",null);
            System.out.println("bo_MyOrder----requestResult---"+requestResult);
            String openId = (String)requestResult.get("openid");
            System.out.println("bo_MyOrder----openId---"+openId);
            result.setRet(0);
            result.setContent(openId);
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            return result;
        }
    }

    /**
     * 获取通用支付key
     * @param param 参数
     * @return
     */
    public TCSL_VO_Result getPayKey(String param,JSONObject headJson){
        TCSL_VO_Result result = new TCSL_VO_Result();
        String url = null;
        try {
            String payKeyUrl = tcslUtilCommon.getPropertyParam("weChat.properties","weChat.getPayKeyUrl");
//            url = payKeyUrl + "?" +param;
            url = payKeyUrl;
        } catch (Exception e) {
            e.printStackTrace();
        }
//        JSONObject requestResult = tcslUtilCommon.httpsRequest(url,"GET",null,headJson);
        JSONObject requestResult = tcslUtilCommon.httpsRequest(url,"POST",param,headJson);
        if(requestResult.getString("returnCode").equals("-1")){
            result.setContent(requestResult.getString("errorText"));
            result.setRet(-1);
        }else {
            String key = requestResult.getString("key");
            result.setContent(key);
            result.setRet(0);
        }


        return result;
    }
    /**
     * 检查该房间是否可预订
     * @param mcId 商户id
     * @param roomTypeId 房型id
     * @param count 订房数量
     * @param endDate 离店时间
     * @param startDate 入住时间
     * @return
     */
    public TCSL_VO_Result checkOrder(String mcId, String roomTypeId, String count, String endDate, String startDate) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        Integer num = daoMyOrder.checkOrder(mcId,roomTypeId,count,startDate,endDate);
        if(num == null){
            result.setRet(-1);
            return result;
        }
        Integer iCount = Integer.valueOf(count);
        if(num >= iCount){
            result.setRet(0);
        }else{
            result.setRet(-1);
        }
        //生成订单号
        SimpleDateFormat format = new SimpleDateFormat("YYYYMMddHHmmss");
        String strNow = format.format(new Date());
        Random r = new Random();
        String strRandom = String.valueOf(r.nextInt(1000)+1);
        String orderId = "WX-" + strNow + "-" + strRandom;
        result.setContent(orderId);
        return result;

    }

    /**
     * 添加订单记录
     * @param orderId
     * @param mcId
     * @param clinker
     * @param ilinktel
     * @param startDate
     * @param endDate
     * @param orderTime
     * @param dinerid
     * @param idcard
     * @param roomTypeId
     * @param count
     * @return
     */
    public TCSL_VO_Result addOrder(String orderId, String mcId, String clinker,
           String ilinktel, String startDate, String endDate, String orderTime, String dinerid, String idcard,
                                   String roomTypeId,String count,String price,String roomName,String openId,String shopName,String shopTel,String address) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.addOrder(orderId,orderId,mcId,
                clinker,ilinktel,startDate,endDate,orderTime,"0",dinerid,idcard,"0",openId); //未入住  未支付
        daoMyOrder.addOrder_room(orderId,roomTypeId,roomName,price,count); //向关联表中添加订单信息
        //减少该房间可预订房间数
        String startDateTime = startDate + " 00:00:00";
        String endDateTime = endDate + " 00:00:00";
        Timestamp startTime = Timestamp.valueOf(startDateTime);
        Timestamp endTime = Timestamp.valueOf(endDateTime);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String num  = "-"+count;
        while (!startTime.equals(endTime)){
            String today = format.format(startTime.getTime());
            daoMyOrder.changeRoomCount(mcId,roomTypeId,num,today); //减少可预订数
            long time = startTime.getTime() + (1000 * 60 * 60 * 24);
            Timestamp tomorrow = new Timestamp(time);
            startTime = tomorrow;
        }
        //给用户发送订房成功消息
        try {
            TCSL_VO_SendMessageContent sendContent = new TCSL_VO_SendMessageContent();
            sendContent.setStatus("0");
            sendContent.setStartDate(startDate);
            sendContent.setOpenId(openId);
            sendContent.setRoomName(roomName);
            sendContent.setShopName(shopName);
            sendContent.setPrice(price);
            sendContent.setShopTel(shopTel);
            sendContent.setOrderId(orderId);
            sendContent.setEndDate(endDate);
            sendContent.setCount(count);
            sendContent.setAddress(address);
            result = boSendMessage.sendMessage(sendContent);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  result;
    }

    public TCSL_VO_Result createPayMd5(String mcId, String data) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        String param = md5(mcId,"MD5");
        param = "data="+data + param;
        String strResult = md5(param,"MD5");
        result.setRet(0);
        result.setContent(strResult);
        return  result;
    }
    private final char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd','e', 'f' };

    public String md5(String string, String chareset) {
        try {
            byte[] bytes = string.getBytes("UTF-8");
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.update(bytes);
            byte[] updateBytes = messageDigest.digest();
            int len = updateBytes.length;
            char myChar[] = new char[len * 2];
            int k = 0;
            for (int i = 0; i < len; i++) {
                byte byte0 = updateBytes[i];
                myChar[k++] = hexDigits[byte0 >>> 4 & 0x0f];
                myChar[k++] = hexDigits[byte0 & 0x0f];
            }
            return new String(myChar);
        } catch (Exception e) {

        }
        return "";
    }

    public TCSL_VO_Result queryOpenId(String orderId) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        String openId = daoSendMessageMysql.getOpenIdByOrderId(orderId);
        result.setRet(0);
        result.setContent(openId);
        return result;
    }
}
