package com.rest;

import com.bo.TCSL_BO_UploadPhoto;
import com.vo.TCSL_VO_Result;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-12.
 */
@Controller
@RequestMapping("/uploadPhoto")
public class TCSL_REST_UploadPhoto {
    @Resource
    TCSL_BO_UploadPhoto boUploadPhoto;

    @RequestMapping("/addPhoto")
    @ResponseBody
    public void addPhoto(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //解析上传的图片参数
        MultipartResolver resolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        MultipartHttpServletRequest re = resolver.resolveMultipart(request);
        MultipartFile fileM = re.getFile("file");
        String shopName = re.getParameter("shopName"); //商户名称
        String roomType = re.getParameter("roomType"); //房型名称
        String fileName = re.getParameter("name"); //图片名称
        boUploadPhoto.addPhoto(shopName,roomType,fileName,fileM);
    }
    @RequestMapping("/queryPhoto")
    @ResponseBody
    public JSONObject queryPhoto(HttpServletRequest request,HttpServletResponse response) throws Exception {
        TCSL_VO_Result result = new TCSL_VO_Result();
        String shopName = request.getParameter("shopName"); //商户名称
        String roomType = request.getParameter("roomType"); //房型名称
        List<String> fileNames = boUploadPhoto.queryPhoto(shopName,roomType);
        result.setContent(fileNames);
        JSONObject json = JSONObject.fromObject(result);
        return json;
    }
    @RequestMapping("/deletePhoto")
    @ResponseBody
    public void deletePhoto(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String shopName = request.getParameter("shopName"); //商户名称
        String roomType = request.getParameter("roomType"); //房型名称
        String fileName = request.getParameter("imgName"); //图片名称
        boUploadPhoto.deletePhoto(shopName,roomType,fileName);
    }
    @RequestMapping("/addOutdoorPhoto")
    @ResponseBody
    public void addOutdoorPhoto(HttpServletRequest request,HttpServletResponse response) throws Exception {
        //解析上传的图片参数
        MultipartResolver resolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        MultipartHttpServletRequest re = resolver.resolveMultipart(request);
        MultipartFile fileM = re.getFile("file");
        String shopName = re.getParameter("shopName"); //商户名称
        String fileName = re.getParameter("name"); //图片名称
        boUploadPhoto.addOutdoorPhoto(shopName,fileName,fileM);
    }
    @RequestMapping("/queryOutdoorPhoto")
    @ResponseBody
    public JSONObject queryOutdoorPhoto(HttpServletRequest request,HttpServletResponse response) throws Exception {
        TCSL_VO_Result result = new TCSL_VO_Result();
        String shopName = request.getParameter("shopName"); //商户名称
        List<String> fileNames = boUploadPhoto.queryOutdoorPhoto(shopName);
        result.setContent(fileNames);
        JSONObject json = JSONObject.fromObject(result);
        return json;
    }
    @RequestMapping("/deleteOutdoorPhoto")
    @ResponseBody
    public void deleteOutdoorPhoto(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String shopName = request.getParameter("shopName"); //商户名称
        String fileName = request.getParameter("imgName"); //图片名称
        boUploadPhoto.deleteOutdoorPhoto(shopName,fileName);
    }
}
