package com.vo;

/**
 * Created by zhangtuoyu on 2016-10-09.
 */
public class TCSL_VO_WechatTemplateData {
    private String value;
    private String color;

    public TCSL_VO_WechatTemplateData() { }

    public TCSL_VO_WechatTemplateData(String value, String color) {
        this.value = value;
        this.color = color;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
