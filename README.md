# Applet-of-WeChat_Searchbook
前端业务逻辑：
一、页面结构
首页    home
搜索页   search
文章介绍 intro
文章详情 read
模版book-item.wxml 图书列表，在search页面中引用

二、首页
wxml：分四部分
1､头像和用户名
2､表单部分：
form
  Input 输入书名 
    Confirm-type = "search" 设置键盘右下角按钮的文字为“search”
    bindconfirm = "confirmEvent" 绑定点击完成按钮时触发事件  
  Button 提交按钮 
    Type = "primary" 按钮的样式类型：绿色
    formType = "submit" 提交表单
3､技术支持
Botton open-type = "contact" 
4､阅读记录
style="display:{{footer_visible}}"
动态控制显/隐
Bindlongtap = “bindlongRemoveRecordtap”
绑定方法：长按以移除阅读记录

三、search 搜索页
wxml分三个部分
1､表单部分 
form 
  input 输入搜索内容
    value="{{s}}"  输入框的初始内容
2､
