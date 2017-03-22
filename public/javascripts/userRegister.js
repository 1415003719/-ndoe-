

$('#usernameWarnText').text('用户名不能为空').hide();
$('#passwordWarnText').text('密码不能为空').hide();
$('#rpasswordWarnText').text('密码不能为空').hide();

$('#login').click(function(){
    var username=$('#username').val();
    var password=$('#password').val();
    var rpassword=$('#rpassword').val();
    if(username.length==0){
        $('#usernameWarnText').text('用户名不能为空').show();
    }else{
        if(password.length==0){
            $('#passwordWarnText').text('密码不能为空').show();
        }else{
            if(rpassword.length==0){
                $('#rpasswordWarnText').text('密码不能为空').show();
            }else if(password!==rpassword){
                $('#rpasswordWarnText').text('两次密码不一致').show();
            }else{
                $.post('checkRegister',{"username":username,"password":password},function(data){
                    if(data.result==1){
                        window.location="./registerOk";
                    }else if(data.result==-1){
                        alert("用户名已存在！");
                        window.location.reload();
                    }
                })
            }
        }
    }

});
$('#username').blur(function(){
    var this_text=$(this).val();
    if(this_text.length!=0){
        $('#usernameWarnText').text('用户名不能为空').hide();
    }
})
$('#password').blur(function(){
    var this_text=$(this).val();
    if(this_text.length!=0){
        $('#passwordWarnText').text('密码不能为空').hide();
    }
})
$('#rpassword').blur(function(){
    var this_text=$(this).val();
    if(this_text.length!=0){
        if($('#password').val()!=this_text){
            $('#rpasswordWarnText').text('两次密码不一致').show();
        }else{
            $('#rpasswordWarnText').text('密码不能为空').hide();
        }
    }else{
        $('#rpasswordWarnText').text('密码不能为空').show();
    }
})