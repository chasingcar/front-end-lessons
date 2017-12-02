var http=require("http")
var port=1309
var hostname='127.0.0.1'
http.createServer (function(req,res){
    var cont=req.url;
    // if(req.url.indexOf("name=")>-1){
    //   cont=req.url.substring(req.url.indexOf("?")+1)
    // }
     var arr=cont.split("&")
     console.log('arr[0] : ' + arr[0])
     console.log('arr[1] : ' +arr[1])
     var name=arr[0].substring(cont.indexOf("=")+1,cont.indexOf("&"))
     console.log('name:'+name)
     var p = arr[1]
     var password=p.substring(p.indexOf("=")+1 ,p.indexOf("&"))
     console.log('password  '+password)
    console.log(req.url)
    res.statusCode=200
    res.end('Hello ,'+name+"  password:"+password)
}).listen(port,hostname,function() {
    console.log('listen on '+port)
})