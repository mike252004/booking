package com.util;

import com.sun.org.apache.xpath.internal.WhitespaceStrippingElementMatcher;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Repository;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import java.io.*;
import java.net.URL;
import java.util.Iterator;
import java.util.Properties;

/**
 * 通用工具类
 * Created by Zhangtuoyu on 2016-09-14.
 */
@Repository
public class TCSL_UTIL_Common {
    public static String weChat_token = "";
    /**
     * 获取配置文件中参数
     * @param propertyName 配置文件路径及名称
     * @param paramName 参数名称
     * @return
     * @throws Exception
     */
    public String getPropertyParam(String propertyName,String paramName) throws Exception {
        Properties prop = new Properties();
        String path = TCSL_UTIL_Common.class.getResource("/").getPath()+propertyName;
        InputStream ins = new BufferedInputStream(new FileInputStream(path));
        prop.load(ins);
        String result = prop.getProperty(paramName).trim();
        return result;
    }
    /**
     * 发送https请求并获得返回值
     * @param requestUrl 请求路径
     * @param requestMethod 请求方式(GET/POST)
     * @param outputStr 提交的数据
     * @return
     */
    public JSONObject httpsRequest(String requestUrl,String requestMethod,String outputStr){
        JSONObject jsonObject = null;
        StringBuffer buffer = new StringBuffer();
        try {
            // 创建SSLContext对象，并使用指定的信任管理器MyX509TrustManager初始化
            TrustManager[] tm = {new MyX509TrustManager()};
            SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
            sslContext.init(null, tm, new java.security.SecureRandom());
            // 得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            //配置HttpsURLConnection
            URL url = new URL(requestUrl);
            HttpsURLConnection httpUrlConn  = (HttpsURLConnection)url.openConnection();
            httpUrlConn.setSSLSocketFactory(ssf);
            httpUrlConn.setDoOutput(true);
            httpUrlConn.setDoInput(true);
            httpUrlConn.setUseCaches(false);
            //设置请求方式(GET/POST)
            if("GET".equalsIgnoreCase(requestMethod)) //忽略大小写比较字符串
                httpUrlConn.connect();
            //当有数据需要提交时,设置编码格式，发送数据
            if(null != outputStr){
                OutputStream outputStream = httpUrlConn.getOutputStream();
                //设置编码格式，防止中文乱码
                outputStream.write(outputStr.getBytes("UTF-8"));
                outputStream.close();
            }
            //将返回的输入流转换成字符串
            InputStream inputStream = httpUrlConn.getInputStream();
            InputStreamReader inputStreamReader =
                    new InputStreamReader(inputStream,"utf-8");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            String str = null;
            while ((str = bufferedReader.readLine()) != null){
                buffer.append(str);
            }
            bufferedReader.close();
            inputStreamReader.close();
            //释放资源
            inputStream.close();
            inputStream = null;
            httpUrlConn.disconnect();
            jsonObject = JSONObject.fromObject(buffer.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
    /**
     * 发送https请求并获得返回值
     * @param requestUrl 请求路径
     * @param requestMethod 请求方式(GET/POST)
     * @param outputStr 提交的数据
     * @param header 提交的头信息
     * @return
     */
    public JSONObject httpsRequest(String requestUrl,String requestMethod,String outputStr,JSONObject header){
        JSONObject jsonObject = null;
        StringBuffer buffer = new StringBuffer();
        try {
            // 创建SSLContext对象，并使用指定的信任管理器MyX509TrustManager初始化
            TrustManager[] tm = {new MyX509TrustManager()};
            SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
            sslContext.init(null, tm, new java.security.SecureRandom());
            // 得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            //配置HttpsURLConnection
            URL url = new URL(requestUrl);
            HttpsURLConnection httpUrlConn  = (HttpsURLConnection)url.openConnection();
            httpUrlConn.setSSLSocketFactory(ssf);
            httpUrlConn.setDoOutput(true);
            httpUrlConn.setDoInput(true);
            httpUrlConn.setUseCaches(false);
            if(header != null && header.keySet().size() != 0){
             Iterator<String> ite = header.keys();
                while (ite.hasNext()){
                    String key = ite.next();
                    String value = header.getString(key);
                    httpUrlConn.setRequestProperty(key,value);
                }
            }
            //设置请求方式(GET/POST)
            if("GET".equalsIgnoreCase(requestMethod)) //忽略大小写比较字符串
                httpUrlConn.connect();
            //当有数据需要提交时,设置编码格式，发送数据
            if(null != outputStr){
                OutputStream outputStream = httpUrlConn.getOutputStream();
                //设置编码格式，防止中文乱码
                outputStream.write(outputStr.getBytes("UTF-8"));
                outputStream.close();
            }
            //将返回的输入流转换成字符串
            InputStream inputStream = httpUrlConn.getInputStream();
            InputStreamReader inputStreamReader =
                    new InputStreamReader(inputStream,"utf-8");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            String str = null;
            while ((str = bufferedReader.readLine()) != null){
                buffer.append(str);
            }
            bufferedReader.close();
            inputStreamReader.close();
            //释放资源
            inputStream.close();
            inputStream = null;
            httpUrlConn.disconnect();
            jsonObject = JSONObject.fromObject(buffer.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}

