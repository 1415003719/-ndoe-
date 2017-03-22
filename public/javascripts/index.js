$(function(){
    var userlogin=$('.myCar').attr('data-login');
    if(userlogin){
        var foodcar=[];

        //添加商品事件
        $('.addToCar').click(function(){
            var foodname=$(this).attr("food-name");
            var foodimg=$(this).attr("food-img");
            foodcar.push({foodname:foodname,foodimg:foodimg});
            var str = JSON.stringify(foodcar);
            var getFoodFormls=JSON.parse(localStorage.getItem("foods"));
            if(getFoodFormls==null){
                localStorage.setItem("foods",str);
            }else{
                var getFoodForml=getFoodFormls.concat(foodcar);
                localStorage.setItem("foods",JSON.stringify(getFoodForml));
            }
            $('.addNode').empty();
            foodcar=[];
        });

        //重绘购物车
        $('.myCar').click(function(){
            $('.addNode').empty();
            foodcar=[];
            addfoodToCar();
        })
        //给购物车元素添加节点
        function addfoodToCar(){
            var getFoodFormls=JSON.parse(localStorage.getItem("foods"));
            if(getFoodFormls==null){
                $('.addNode').append("<p>购物车空空如也</p>")
            }else{
                getFoodFormls.forEach(function(item,index){
                    $('.addNode').append(
                        `
                  <div class="col-sm-6 col-md-4" id="`+index+`">
                    <div class="thumbnail">
                      <img src="/images/`+item.foodimg+`" alt="...">
                      <div class="caption">
                        <h3>`+item.foodname+`</h3>
                        <p><a id="deletG" class="btn btn-default" role="button" data-index="`+index+`">删除</a></p>
                      </div>
                    </div>
                  </div>`
                    );
                })
            }
        }

        //删除购物车中商品
        $('body').on('click','#deletG',function(){
            var index=$(this).attr('data-index');
            $('#'+index).remove();
            var getFoodFormls=JSON.parse(localStorage.getItem("foods"));
            getFoodFormls.splice(index,index+1);
            localStorage.setItem("foods",JSON.stringify(getFoodFormls));
        })

        //退出登录
        $('.logoff').click(function(){
            $.get("users/logoff",function(data){
                window.location.reload();
            })
        })

        //结算商品
        $('.pay').click(function(){
            var goodsNum=$('.addNode').children().length;
            if(goodsNum==0){
                alert("请先添加商品!");
            }else{
                var getFoodFormls=JSON.parse(localStorage.getItem("foods"));
                getFoodFormls.forEach(function(item,index){
                   delete item.foodimg;
                });
                var str=JSON.stringify(getFoodFormls);
                var dateNow=new Date();
                var formatdate=dateNow.getFullYear()+"/"+(dateNow.getMonth()+1)+"/"+dateNow.getDate()+" "+dateNow.getHours()+":"+dateNow.getMinutes();
                $.post('users/getPayInfo',{"payInfo":str,"dateNow":formatdate},function(data){
                    if(data.result==1){
                        alert("您的订单已提交！");
                        localStorage.clear();
                        window.location.reload();
                    }else{
                        return;
                    }
                })
            }
        })

    }else{
        return;
    }
})
