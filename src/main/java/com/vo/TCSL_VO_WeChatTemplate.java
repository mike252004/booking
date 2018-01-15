package com.vo;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangtuoyu on 2016-10-09.
 */
public class TCSL_VO_WeChatTemplate {
    private String touser; //用户openId
    private String template_id; //微信消息模板id
    private String url = ""; //URL置空，则在发送后，点击模板消息会进入一个空白页面（ios），或无法点击（android）
    private String topcolor; //标题颜色
    private Map<String,TCSL_VO_WechatTemplateData> data = new HashMap<String,TCSL_VO_WechatTemplateData>(); //模板消息内容

    public String getTouser() {
        return touser;
    }

    public void setTouser(String touser) {
        this.touser = touser;
    }

    public String getTemplate_id() {
        return template_id;
    }

    public void setTemplate_id(String template_id) {
        this.template_id = template_id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTopcolor() {
        return topcolor;
    }

    public void setTopcolor(String topcolor) {
        this.topcolor = topcolor;
    }

    public Map<String, TCSL_VO_WechatTemplateData> getData() {
        return data;
    }

    public void setData(Map<String, TCSL_VO_WechatTemplateData> data) {
        this.data = data;
    }
}
