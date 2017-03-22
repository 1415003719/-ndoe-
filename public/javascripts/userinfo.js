//显示修改密码区域
$('.showpd').click(function(){
    $('.updatepd').css({"opacity":1});
});
//让修改用户名输入框为可编辑状态
$(".editname").click(function(){
    $("#updatename").attr("disabled",false);
})

//提交修改用户名信息
$('.suerEditname').click(function(){
    var newname=$("#updatename").val();
    if(newname==''){
        alert("用户名不能为空！");
    }else{
        $.post('checkUpdate',{"username":newname},function(data){
            if(data.result==1){
                window.location.reload();
            }else if(data.result==-1){
                alert("用户名已存在！");
            }

        })
    }
})

//提交修改密码信息
$(".submitpd").click(function(){
    var oldpd=$('#oldpd').val();
    var newpd=$('#newpd').val();
    if(oldpd==''){
        alert("原密码不能为空！");
    }else if(newpd==''){
        alert("新密码不能为空！");
    }else{
        console.log(oldpd+"+"+newpd)
        $.post("checkUpdate",{"oldpd":oldpd,"newpd":newpd},function(data){
            if(data.result==1){
                alert("密码修改成功！");
                window.location.reload();
            }else if(data.result==-1){
                alert("原密码错误，请重新输入！");
                $('.oldpd').val('');
            }
        })
    }
})

