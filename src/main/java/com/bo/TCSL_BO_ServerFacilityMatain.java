package com.bo;

import com.dao.oracle.TCSL_DAO_ServerFacility;
import com.vo.TCSL_VO_Facilitys;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by zhangtuoyu on 2016-09-19.
 */
@Repository
public class TCSL_BO_ServerFacilityMatain {
    @Resource
    private TCSL_DAO_ServerFacility daoServerFacility;
    /**
     * 添加设施
     * @param itemName 设施名称
     * @param itemDes 设施描述
     * @param itemClass 设施类别
     * @param itemId 设施id
     */
    public void addFacility(
            String itemName,String itemDes,String itemClass,String itemId,String mcId){
        daoServerFacility.addFacilityItem(itemId,itemName,itemDes,itemClass,mcId);
    }

    /**
     * 删除设施
     * @param itemClass 设施类别
     * @param itemId 设施id
     */
    public void deleteFacility(String itemName,String itemClass,String itemId,String mcId) {
        daoServerFacility.deleteFacilityItem(itemId,itemName,itemClass,mcId);
    }

    /**
     * 查询设施
     * @param mcId
     * @return
     */
    public TCSL_VO_Facilitys queryFacility(String mcId) {
        TCSL_VO_Facilitys facilities = new TCSL_VO_Facilitys();
        facilities.setRoomList(daoServerFacility.queryRoomItems(mcId,"客房设施"));
        facilities.setMultipleList(daoServerFacility.queryMultipleItems(mcId,"综合设施"));
        facilities.setServerList(daoServerFacility.queryServerItems(mcId,"服务项目"));
        facilities.setToyList(daoServerFacility.queryToyItems(mcId,"娱乐设施"));
        return facilities;
    }

}
