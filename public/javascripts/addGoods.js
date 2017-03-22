/**
 * Created by Administrator on 2017/3/13.
 */
$("#submit").click(function(){
    $.post("./../addGoods",{"foodname":$("#foodname").val(),"foodimg":$("#foodimg").val(),"type":$('#type').val()},function(data){
        console.log(data)
    })
})