$('.xiajia').click(function(){
    var foodname=$(this).attr("data-food");
    $.post("./../xiajia",{"foodname":foodname},function(data){
        if(data.result==1){
            alert("下架成功！");
            window.location.reload();
        }
    })
})