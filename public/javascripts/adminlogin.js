/**
 * Created by 左华新 on 2017/3/7.
 */

//发送登录数据，验证
$('#usernameWarnText').hide();
$('#passwordWarnText').hide();
//验证输入框是否为空
$('#username').blur(function(){
	var this_text=$(this).val();
	if(this_text.length!=0){
		$('#usernameWarnText').hide();
	}
})
$('#password').blur(function(){
	var this_text=$(this).val();
	if(this_text.length!=0){
		$('#passwordWarnText').hide();
	}
})
$('#login').click(function(){
	var username=$('#username').val();
	var password=$('#password').val();
  if(username==''||password==''){
  	if(username==''){
  		$('#usernameWarnText').show();
  	}else{
  		$('#passwordWarnText').show();
  	}
  	return;
  }else{
  	$.post('/admin/logincheck',{"username":username,"password":password},function(data){
  		if(data.result==1){
        window.location="/admin/manage/?type=newOrders"
      }else if(data.result== -1){
        $('#usernameWarnText').text("用户不存在").show();
      }else if(data.result== -2){
        $('#passwordWarnText').text("密码错误").show();
      }else{
        alert("服务器繁忙，请稍后再试！");
        window.location.reload();
      }
  	})
  }
})
