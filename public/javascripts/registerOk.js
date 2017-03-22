$(function(){
    var clock=$('.clock');
    var flag=3;
    var timeout=setInterval(function(){
        flag--;
        clock.text(flag);
        if(flag==0){
            clearInterval(timeout);
            window.location='/users';
        }
    },1000)
})