/**
 * Created by Administrator on 2017/3/13.
 */

var db=require('./../db/db.js');
var session = require('express-session');
var formidable = require('formidable');


//返回主界面
exports.getIndex=function(req,res,next){
	db.find('allGoods',{"type":"主食"},function(err,docs){
	    if(err){
	        throw err;
	        return;
        }else{
	        var food=docs;
	        db.find('allGoods',{"type":"饮品"},function(err,docs){
	        	if(err){
	        		throw err;
	        		return;
				}else{
	        		if(req.session.userLogin==1){
                        res.render('user/index',{"foods":food,"drinks":docs,"username":req.session.username,"userLogin":true});
					}else{
                        res.render('user/index',{"foods":food,"drinks":docs,"userLogin":false});
					}

				}
			})
        }
    })
}

//返回用户注册页面
exports.renderUserLoginPage=function(req,res,next){
	res.render("user/userRegister");
}

//检测注册信息
exports.checkRegister=function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
    	if(err){
    		throw err;
    		return;
		}else{
    		var username=fields.username;
    		var password=fields.password;
    		var nowDate=new Date();
    		db.find('users',{"username":username},function(err,docs){
    			if(docs.length==0){
    				db.insert('users',{"username":username,"password":password,"date":nowDate},function(err,result){
    					if(err){
    						throw err;
    						return;
						}else{
    						req.session.username=username;
    						req.session.userLogin=1;
                            res.json({"result":1});
						}
					})
				}else{
    				res.json({"result":-1});
				}
			})
		}
	})
}

//注册成功跳转页面
exports.registerOk=function(req,res,next){
	res.render('user/registerOk');
}

//用户个人资料页面
exports.renderUserInfo=function(req,res,next){
	if(req.session.userLogin==1){
		//返回资料页
        var username=req.session.username;
		if(req.query.type=="mine"){
            db.find('users',{"username":username},function(err,docs){
                if(err){
                    throw err;
                    return;
                }else{
                    res.render('user/userInfo',{"info":docs[0],"type":req.query.type});
                }
            })
		}else if(req.query.type=="shopHistory"){
            db.find('orders',{"username":username},function(err,docs){
                if(err){
                    throw err;
                    return;
                }else{
                    res.render('user/userInfo',{"info":docs,"type":req.query.type});
                }
            })
		}
	}else{
		next();
	}
}
//返回用户登录界面
exports.renderUserLogin=function(req,res,next){
	res.render('user/userLogin');
}
//检测登录
exports.checkLogin=function(req,res,next){
	var form=new formidable.IncomingForm();
	form.parse(req,function(err,fields){
		if(err){
			throw err;
			return;
		}else{
			db.find('users',{"username":fields.username.trim()},function(err,docs){
				if(err){
					throw err;
					return;
				}else if(docs.length!=0){
					if(docs[0].password!=fields.password.trim()){
						res.json({"result":-2});
					}else{
						req.session.username=fields.username;
						req.session.userLogin=1;
						res.json({"result":1});
					}
				}else{
					res.json({"result":-1})
				}
			})
		}
	})
}
//退出登录
exports.userlogOff=function(req,res,next){
	req.session.username='';
	req.session.userLogin=-1;
	res.json({"result":"0"});
}

//获取用户购买信息
exports.getPayInfo=function(req,res,next){
	var form=new formidable.IncomingForm();
	form.parse(req,function(err,fields){
		if(err){
			throw err;
			return;
		}else{
			var payInfo=fields.payInfo,
				payTime=fields.dateNow;
			db.insert("orders",{"username":req.session.username,"payInfo":payInfo,"payTime":payTime,"dealWith":false},function(err,docs){
				if(err){
					throw err;
					return;
				}else{
					var formatInfo=JSON.parse(payInfo);
					formatInfo.forEach(function(item){
						db.find("allGoods",{"foodname":item.foodname},function(err,docs){
							if(err)throw err;
							var xiaoliang=docs[0].xiaoliang;
                            db.update("allGoods",{"foodname":item.foodname},{$set:{"xiaoliang":xiaoliang+1}},function(err,docs){
                            	if(err){
                            		throw err;
                            		return;
								}
							})
						})
					})
                    res.json({"result":1});
                }
			})
		}
	})
}

//接收用户修改信息
exports.checkUpdate=function(req,res,next){
	var form=new formidable.IncomingForm();
	form.parse(req,function(err,fields){
		if(err){
			throw err;
			return;
		}else{
			if(fields.username!=null){
				db.find("users",{"username":fields.username},function(err,docs){
					if(err){
						throw err;
						return;
					}else if(docs.length!=0){
						res.json({"result":"-1"});
					}else{
						db.update("users",{"username":req.session.username},{$set:{"username":fields.username}},function(err,docs){
							if(err){
								throw err;
								return;
							}else{
								db.find("orders",{"username":req.session.username},function(err,docs){
									if(err){
										throw err;
										return;
									}else{
										if(docs.length!=0){
											db.update("orders",{"username":req.session.username},{$set:{"username":fields.username}},function(err,docs){
												if(err){
													throw err;
													return;
												}else{
                                                    req.session.username=fields.username;
                                                    req.session.userLogin=1;
                                                    res.json({"result":1});
												}
											})
										}else{
											return;
										}
									}
								})
							}
						})
					}
				})
			}else if(fields.newpd!=null){
				db.find("users",{"username":req.session.username},function(err,docs){
					if(err){
						throw err;
						return;
					}else{
						var oldpassword=docs[0].password;
						if(fields.oldpd!=oldpassword){
							res.json({"result":-1});
						}else{
							db.update("users",{"username":req.session.username},{$set:{"password":fields.newpd}},function(err,docs){
								if(err){
									throw err;
									return;
								}else{
									res.json({"result":1});
								}
							})
						}
					}
				})
			}
		}
	})
}