// build time:Mon Apr 01 2019 20:07:15 GMT+0800 (中国标准时间)
const live2d_path="/live2d-widget/";$("<link>").attr({href:live2d_path+"waifu.css",rel:"stylesheet",type:"text/css"}).appendTo("head");$.ajax({url:live2d_path+"live2d.min.js",dataType:"script",cache:true,async:false});$.ajax({url:live2d_path+"waifu-tips.js",dataType:"script",cache:true,async:false});$(window).on("load",function(){initWidget(live2d_path+"waifu-tips.json","https://live2d.fghrsh.net/api")});
//rebuild by neat 