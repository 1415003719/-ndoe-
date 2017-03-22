let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://127.0.0.1:27017/sysdatas';

//连接数据库
function connect(callback){
	MongoClient.connect(url, (err, db)=>{
		callback(err,db);
	  	db.close();
	});
}

//添加数据
exports.insert=function(collection,docs,cb){
	connect((err,db)=>{
		if(err){
			cb(err,null);
			return;
		}else{
			db.collection(collection).insert(docs,function(err,result){
				if(err){
					cb(err,null);
					return;
				}else{
					cb(null,result);
				}
			})
		}
	})
}

//查找数据
exports.find=function(collection,filters,cb){
	connect((err,db)=>{
		if(err){
			throw err;
			return;
		}else{
			db.collection(collection).find(filters).toArray(function(err,doc){
				if(err){
					cb(err,null);
					return;
				}else{
					cb(null,doc);
				}
			})
		}
	})
}

//更新数据
exports.update=function(collection,filter,update,cb){
    connect((err,db)=>{
        if(err){
        	cb(err,null);
        	return;
		}else{
            db.collection(collection).updateMany(filter,update,function(err,result){
                if(err){
                    cb(err,null);
                    return;
                };
                cb(null,result);
            })
		}
    })
}

//删除数据
exports.delete=function(collection,filter,cb){
    connect((err,db)=>{
        if(err){
            cb(err,null);
            return;
        }else{
            db.collection(collection).deleteOne(filter,function(err,result){
                if(err){
                    cb(err,null);
                    return;
                };
                cb(null,result);
            })
        }
    })
}