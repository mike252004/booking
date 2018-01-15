package com.rest;

import com.dao.mysql.HTO_UPDATE_ACCOUNT_DAO;
import com.dao.oracle.PHO_HT_HOTELITEM_DAO;
import com.po.mysql.HTO_UPDATE_ACCOUNT;
import com.vo.TCSL_VO_Result;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-08.
 */
@Controller
@RequestMapping("/test")
public class HelloWorld {
    @RequestMapping("/helloworld")
    @ResponseBody
    public String testHelloWorld(){
        return "testHelloWorld";
    }

    @Resource
    private HTO_UPDATE_ACCOUNT_DAO hto_update_account_dao;
    @Resource
    private PHO_HT_HOTELITEM_DAO pho_ht_hotelitem_dao;

    @RequestMapping("/queryAll")
    @ResponseBody
    public JSONObject queryAll() {
        List<HTO_UPDATE_ACCOUNT> accounts = hto_update_account_dao.queryAll();
        TCSL_VO_Result result = new TCSL_VO_Result();
        result.setRet(0);
        result.setContent(accounts);
        JSONObject object = JSONObject.fromObject(result);
        return object;
    }
//    @RequestMapping("/queryAll2")
//    @ResponseBody
//    public JSONObject queryAll2() {
//        List<PHO_HT_HOTELITEM> accounts = pho_ht_hotelitem_dao.queryAll();
//        TCSL_VO_Result result = new TCSL_VO_Result();
//        result.setRet(0);
//        result.setContent(accounts);
//        JSONObject object = JSONObject.fromObject(result);
//        return object;
//    }
}
