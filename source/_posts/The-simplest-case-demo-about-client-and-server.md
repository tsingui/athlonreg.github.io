---
title: The simplest case demo about client and server
copyright: true
date: 2017-09-07
categories: Study
description: 最简单的客户机与服务器案例演示
tags:
- Java
- 网络编程
- 客户机与服务器
---

最简单的客户机与服务器案例演示
<!--more-->

# EchoClient.java

```
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
package athlonreg.top;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

/**
 *
 * @author athlonreg
 
 */
 
public class EchoCilent {

    /**
     * @param args the command line arguments
     */
      
    public static void main(String[] args) {
        // TODO code application logic here
        Socket clientSocket = null;
        BufferedReader in = null;
        BufferedWriter out = null;
        
        try {
        
            //1.创建客户机套接字
            clientSocket = new Socket();
            SocketAddress remoteAddr=new InetSocketAddress("localhost",5000);  
            System.out.println("1.创建客户机套接字成功！");
            
            //2.连接服务器
            clientSocket.connect(remoteAddr);
            System.out.println("2.客户机连接服务器localhost端口5000成功！");
            System.out.println("客户机使用的地址和端口："+clientSocket.getLocalSocketAddress());
            
            //与服务器会话            
            in = new BufferedReader(
                 new InputStreamReader(
                 clientSocket.getInputStream()));         
            out = new BufferedWriter(
                  new OutputStreamWriter(         
                  clientSocket.getOutputStream()));
            String sendStr="有朋自远方来";
            out.write(sendStr);  //向服务器发送字符串
            out.newLine();
            out.flush();
            System.out.println("3.1向服务器发送字符串成功!"+sendStr);
            String recvStr=in.readLine();  //从服务器接收字符串   
            System.out.println("3.2从服务器接收回送字符串成功！"+recvStr);    
        } catch (IOException ex) {
            System.out.println("异常信息："+ex.getMessage());
        }
        
        //关闭套接字和流
        try {
            if (in != null) 
                in.close();
            if (out != null)  
                out.close(); 
            if (clientSocket != null)   
                clientSocket.close(); 
            System.out.println("4.关闭套接字和流成功！"); 
        } catch (IOException ex) {
             System.out.println("异常信息："+ex.getMessage());
        } 
    } 
}
```



# EchoServer.java

```
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
package athlonreg.top;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;

/**
 *
 * @author athlonreg
 
 */
 
public class EchoServer {

    /**
     * @param args the command line arguments
     * @throws java.io.IOException
     
     */
     
    public static void main(String[] args) throws IOException {
        // TODO code application logic here
   
        //1.启动服务器
        ServerSocket listenSocket = null; 
        Socket clientSocket = null; 
        BufferedReader in = null;
        BufferedWriter out = null;

        try {
            listenSocket = new ServerSocket();
            SocketAddress serverAddr=new InetSocketAddress("localhost",5000);
            listenSocket.bind(serverAddr); 
            System.out.println("1.服务器启动成功！开始在localhost的5000端口侦听连接..."); 
            
            //2.处理连接                      
            clientSocket = listenSocket.accept();
            System.out.println("2.客户机连接成功！客户机地址和端口："+clientSocket.getRemoteSocketAddress());
              
            //3.与客户机会话    
            in = new BufferedReader(
                 new InputStreamReader(
                 clientSocket.getInputStream()));       
            out = new BufferedWriter(
                  new OutputStreamWriter(            
                  clientSocket.getOutputStream()));    
            String recvStr=in.readLine();  //从客户机接收字符串
            System.out.println("3.1 服务器收到字符串："+recvStr);
            out.write(recvStr);  //向客户机回送字符串       
            out.newLine();  
            out.flush(); 
            System.out.println("3.2 服务器回送字符串成功："+recvStr); 
        } catch (IOException ex) {
            System.out.println("异常信息："+ex.getMessage());
        }
        
        //4.关闭套接字和流
        try {  
            if (in != null)
                in.close();
            if (out != null)  
                out.close();
            if (listenSocket != null)   
                listenSocket.close();
            if (clientSocket != null)   
                clientSocket.close(); 
            System.out.println("4.关闭套接字和流成功！");    
        } catch (IOException ex) {
            System.out.println("异常信息"+ex.getMessage()); 
        }     
    }  
}
```


