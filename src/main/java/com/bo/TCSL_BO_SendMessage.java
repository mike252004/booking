package com.bo;

import com.dao.mysql.TCSL_DAO_SendMessage_mysql;
import com.util.TCSL_UTIL_Common;
import com.vo.TCSL_VO_Result;
import com.vo.TCSL_VO_SendMessageContent;
import com.vo.TCSL_VO_WeChatTemplate;
import com.vo.TCSL_VO_WechatTemplateData;
import net.sf.json.JSONObject;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by zhangtuoyu on 2016-10-08.
 */
@Repository
public class TCSL_BO_SendMessage implements ApplicationListener<ContextRefreshedEvent> {
    @Resource
    TCSL_UTIL_Common utilCommon;
    @Resource
    TCSL_DAO_SendMessage_mysql daoSendMessageMysql;

    /**
     * 向指定微信用户发送酒店入住信息
     * @param content
     * @return
     * @throws Exception
     */
    public TCSL_VO_Result sendMessage(TCSL_VO_SendMessageContent content) throws Exception {
        TCSL_VO_Result result = new TCSL_VO_Result();
        String status = content.getStatus();//订单状态
        //模板消息
        TCSL_VO_WeChatTemplate template = new TCSL_VO_WeChatTemplate();
        //获取微信接口token
        String token = TCSL_UTIL_Common.weChat_token;
        if(token.isEmpty()){
            result.setRet(-1);
            result.setContent("TCSL_BO_SendMessage sendWelcome get token error");
            return result;
        }
        String topColor = utilCommon.getPropertyParam("weChat.properties","weChat.topColor");
        template.setTopcolor(topColor);
        if("0".equals(status)){ //用户下单
            String startDate = content.getStartDate(); //预订入住时间
            String openId = content.getOpenId();//用户openId
            String roomTypeName = content.getRoomName(); //房型名称
            String shopName = content.getShopName(); //酒店名称
            String orderPrice = content.getPrice(); //消费金额
            String shopTel = content.getShopTel(); //酒店联系电话
            String orderId = content.getOrderId(); //订单id
            String endDate = content.getEndDate(); //预订离店时间
            String count = content.getCount(); //预订数量
            String address = content.getAddress(); //酒店地址
            template.setTouser(openId);
            String templateId = utilCommon.getPropertyParam("weChat.properties","weChat.templateId.order");
            //模板内容
            Map<String,TCSL_VO_WechatTemplateData> data = template.getData();
            TCSL_VO_WechatTemplateData first = new TCSL_VO_WechatTemplateData("您好，您已预订成功！","#000000");
            data.put("first",first);
            TCSL_VO_WechatTemplateData hotelName = new TCSL_VO_WechatTemplateData(shopName,"#000000");
            data.put("hotelName",hotelName);
            TCSL_VO_WechatTemplateData roomName = new TCSL_VO_WechatTemplateData(roomTypeName,"#000000");
            data.put("roomName",roomName);
            TCSL_VO_WechatTemplateData pay = new TCSL_VO_WechatTemplateData(orderPrice,"#000000");
            data.put("pay",pay);
            startDate = startDate + "\r离店日期："+endDate+"\r订单编号："+orderId+"\r房间数量："+count+"\r酒店地址："+address;
            TCSL_VO_WechatTemplateData date = new TCSL_VO_WechatTemplateData(startDate,"#000000");
            data.put("date",date);
            TCSL_VO_WechatTemplateData remark = new TCSL_VO_WechatTemplateData("如有疑问，请咨询"+shopTel,"#000000");
            data.put("remark",remark);
            template.setData(data);
            template.setTemplate_id(templateId);
        }
        if("1".equals(status)){ //用户入住
            String templateId = utilCommon.getPropertyParam("weChat.properties","weChat.templateId.checkIn");
            String shopName = content.getShopName(); //酒店名称
            String orderId = content.getOrderId(); //订单号
            String openId = daoSendMessageMysql.getOpenIdByOrderId(orderId);
            template.setTouser(openId);
            String startDate = content.getStartDate(); //入住时间
            String endDate = content.getEndDate(); //离店时间
            String shopTel = content.getShopTel(); //酒店联系电话
            //模板内容
            Map<String,TCSL_VO_WechatTemplateData> data = template.getData();
            TCSL_VO_WechatTemplateData first = new TCSL_VO_WechatTemplateData("欢迎入住 "+shopName,"#000000");
            data.put("first",first);
            TCSL_VO_WechatTemplateData orderIdData = new TCSL_VO_WechatTemplateData(orderId,"#000000");
            data.put("OrderID",orderIdData);
            TCSL_VO_WechatTemplateData hotelName = new TCSL_VO_WechatTemplateData(shopName,"#000000");
            data.put("HotelName",hotelName);
            TCSL_VO_WechatTemplateData checkInDate = new TCSL_VO_WechatTemplateData(startDate,"#000000");
            data.put("CheckInDate",checkInDate);
            TCSL_VO_WechatTemplateData checkOutDate = new TCSL_VO_WechatTemplateData(endDate,"#000000");
            data.put("CheckOutDate",checkOutDate);
            TCSL_VO_WechatTemplateData remark = new TCSL_VO_WechatTemplateData("如有疑问，请咨询"+shopTel,"#000000");
            data.put("remark",remark);
            template.setData(data);
            template.setTemplate_id(templateId);
        }
        if("2".equals(status)){ //用户离店
            String orderId = content.getOrderId(); //订单号
            String shopTel = content.getShopTel(); //酒店电话
            String shopName = content.getShopName(); //酒店名称
            String customerName = content.getCustomerName(); //顾客名称
            String openId = daoSendMessageMysql.getOpenIdByOrderId(orderId);
            template.setTouser(openId);
            String templateId = utilCommon.getPropertyParam("weChat.properties","weChat.templateId.checkOut");
            //模板内容
            Map<String,TCSL_VO_WechatTemplateData> data = template.getData();

            TCSL_VO_WechatTemplateData first = new TCSL_VO_WechatTemplateData("您好，您已成功退房，欢迎再次光临！","#000000");
            data.put("first",first);
            TCSL_VO_WechatTemplateData keyword1 = new TCSL_VO_WechatTemplateData(shopName,"#000000");
            data.put("keyword1",keyword1);
            TCSL_VO_WechatTemplateData keyword2 = new TCSL_VO_WechatTemplateData(customerName,"#000000");
            data.put("keyword2",keyword2);
            TCSL_VO_WechatTemplateData remark = new TCSL_VO_WechatTemplateData("如有疑问，请咨询"+shopTel,"#000000");
            data.put("remark",remark);
            template.setData(data);
            template.setTemplate_id(templateId);
        }
        String sendMessageUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token;
        String dataStr = JSONObject.fromObject(template).toString();
        JSONObject jsonobj = utilCommon.httpsRequest(sendMessageUrl, "POST", dataStr);
        String returnMsg = jsonobj.get("errmsg").toString();
        if("OK".equalsIgnoreCase(returnMsg)){
            result.setRet(0);
            result.setContent(jsonobj);
        }
        return result;
    }

    /**
     * 获取微信公众号接口token
     * @param grant_type
     * @param appid
     * @param secret
     * @return
     */
    public String getWeChatToken(String grant_type,String appid,String secret){
        String getTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type="+grant_type +
                "&appid="+appid+"&secret="+secret;
        JSONObject result = utilCommon.httpsRequest(getTokenUrl, "GET", null);
        String token = "";
        if(!result.isEmpty()){
            token = result.get("access_token").toString();
        }
        return token;
    }

    /**
     * 获取微信公众号token
     * token过期时间为7200s，为了防止在7200s时调用接口token失效的问题，定时器7150s更新一次token
     * 该方法在工程启动时执行
     * @param contextRefreshedEvent
     */
    @Override
    public void onApplicationEvent(final ContextRefreshedEvent contextRefreshedEvent) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    final String grantType = "client_credential";
                    final String appId = utilCommon.getPropertyParam("weChat.properties","weChat.appId");//公众号appid
                    final String secret = utilCommon.getPropertyParam("weChat.properties","weChat.secret");//公众号secret
                    TCSL_UTIL_Common.weChat_token = getWeChatToken(grantType,appId,secret);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        },0,7150*1000);//0ms后执行，之后每隔7150s后执行
    }
}
