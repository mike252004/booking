package com.dao;

import com.bo.TCSL_BO_SendMessage;
import com.dao.mysql.HTO_UPDATE_ACCOUNT_DAO;
import com.po.mysql.HTO_UPDATE_ACCOUNT;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Random;

/**
 * Created by zhangtuoyu on 2016-09-08.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class HTO_UPDATE_ACCOUNT_DAO_Test {
    @Resource
    private HTO_UPDATE_ACCOUNT_DAO hto_update_account_dao;
    @Resource
    private TCSL_BO_SendMessage boSendMessage;

    @Test
    public void queryAll() {
        List<HTO_UPDATE_ACCOUNT> books = hto_update_account_dao.queryAll();
        for (HTO_UPDATE_ACCOUNT book : books) {
            System.out.println(book.getCGUESTNAME());
        }
    }
    @Test
    public void testStream() throws Exception {
        File sf = new File("C:\\Users\\Administrator\\Desktop\\yilianmengbi\\yilianmenbi\\123.jpg");
        File df = new File("C:\\Users\\Administrator\\Desktop\\yilianmengbi\\yilianmenbi\\test.jpg");
        byte[] buf = new byte[1024];
        int len = 0;
        FileInputStream in = new FileInputStream(sf);
        FileOutputStream out = new FileOutputStream(df,true);
        while( (len = in.read(buf)) != -1 ){
            out.write(buf,0,len);
        }
        out.close();
    }
    @Test
    public void testQueryFile(){
        String file_path = "D:\\java\\uploadImg\\testZTY\\standard_room";
        File file = new File(file_path);
        if(!file.exists()){
            System.out.println("路径不存在");
        }else{
            File[] files = file.listFiles();
            int i = files.length;
            System.out.println("文件个数"+i);
            for (File f : files) {
                System.out.println(f.getName());
            }
        }
    }
    @Test
    public void testRandom(){
        Random r = new Random();
        System.out.println(r.nextInt(10)+1);
    }
}
