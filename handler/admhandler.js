/**
 * Created by Administrator on 2017/3/13.
 */
var db=require('./../db/db.js');
var session = require('express-session');
var formidable = require('formidable');



//返回管理员登录界面
exports.renderAdminLoginPage=function(req,res){
    res.render('adminlogin');
}


//检查登录系统
exports.logincheck=(req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req,(err,fields)=>{
        if(err){
            throw err;
            return;
        }else{
            db.find('admins',{"username":fields.username},(err,doc)=>{
                if(err){
                    res.json({"result":0});
                    return;
                }else{
                    if(doc.length==0){
                        res.json({"result":-1});
                        return;
                    }else{
                        if(fields.password==doc[0].password){
                            req.session.admin=fields.username;
                            req.session.adminLogin=1;
                            res.json({"result":1});
                        }else{
                            res.json({"result":-2});
                        }
                    }
                }
            })
        }
    })
}

//返回管理员主页面
exports.renderAdminMainPage=function(req,res,next){
        if(req.session.adminLogin==1){
            var type=req.query.type;
            if(type=="newOrders"){
                res.render('manage',{"admin":req.session.admin,type:type});
            }else if(type=="oldOrders"){
                res.render('manage',{"admin":req.session.admin,type:type});
            }else if(type=="allGoods"){
                db.find("allGoods",{},function(err,docs){
                    if(err){
                        throw err;
                        return;
                    }else{
                        res.render('manage',{"admin":req.session.admin,type:type,"foods":docs});
                    }
                })
            }else if(type=="addGoods"){
                res.render('manage',{"admin":req.session.admin,type:type});
            }else{
                next();
            }
        }else{
            res.redirect('/admin');
        }
}

//处理添加商品信息
exports.addGoods=function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        if(err){
            throw err;
            return;
        }else{
            db.insert("allGoods",{"foodname":fields.foodname,"foodimg":fields.foodimg,xiaoliang:0,"type":fields.type},function(err,result){
                if(err){
                    throw err;
                    return;
                }else{
                    res.json({"result":"ok"});
                }
            })
        }
    })
}

//下架商品
exports.xiajia=function(req,res,next){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        if(err){
            throw err;
        }else{
            var foodname=fields.foodname;
            db.delete("allGoods",{"foodname":foodname},function(err,docs){
                if(err){
                    throw err;
                }else{
                    res.json({"result":1});
                }
            })
        }
    })
}