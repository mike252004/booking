package com.dao.oracle;

import com.po.oracle.PHO_HT_HOTELITEM;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-19.
 */
public interface TCSL_DAO_ServerFacility {
    /**
     * 添加设施
     * @param itemId
     * @param itemName
     * @param itemDes
     * @param itemClass
     * @param mcId
     */
    void addFacilityItem(
        @Param("ITEMID") String itemId,
        @Param("ITEMNAME") String itemName,
        @Param("ITENDESP") String itemDes,
        @Param("ITENCLASS") String itemClass,
        @Param("MCID") String mcId
    );

    /**
     * 删除设施
     * @param itemId
     * @param itemName
     * @param itenClass
     * @param mcId
     */
    void deleteFacilityItem(
        @Param("ITEMID") String itemId,
        @Param("ITEMNAME") String itemName,
        @Param("ITENCLASS") String itenClass,
        @Param("MCID") String mcId
    );

    /**
     * 查询所有客房设施
     * @param mcId
     * @param itenClass
     */
    List<PHO_HT_HOTELITEM> queryRoomItems(
        @Param("MCID") String mcId,
        @Param("ITENCLASS") String itenClass
    );

    /**
     * 查询所有综合设施
     * @param mcId
     * @param itenClass
     */
    List<PHO_HT_HOTELITEM> queryMultipleItems(
        @Param("MCID") String mcId,
        @Param("ITENCLASS") String itenClass
    );

    /**
     * 查询所有服务项目
     * @param mcId
     * @param itenClass
     */
    List<PHO_HT_HOTELITEM> queryServerItems(
        @Param("MCID") String mcId,
        @Param("ITENCLASS") String itenClass
    );

    /**
     * 查询所有娱乐设施
     * @param mcId
     * @param itenClass
     */
    List<PHO_HT_HOTELITEM> queryToyItems(
        @Param("MCID") String mcId,
        @Param("ITENCLASS") String itenClass
    );
}
