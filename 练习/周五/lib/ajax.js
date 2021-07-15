
window.ajax = function(reqData){
    //检查url 合法性
    let url = reqData.url.trim()//防止用户敲空格
    if(!reqData.url){
        throw 'url 为空'
        return
    }
    //检查请求方式 合法性
    let method = reqData.method.trim()
    method = method.toLowerCase()
    if(!method){
        method = 'get'  //判断method是否为空，为空默认get
    }
    if(!(-1 < 'get'.indexOf(method) || -1 < 'post'.indexOf(method))){
        throw 'method 错误'  //判断method是否为get/post
        return 
    }

    let fd = null
    let data = reqData.data
    if(data){
        if('get' == method){
            url += '?'
            for(const key in data){
                url += `${key}=${data[key]}&`
            }
        }else{
            fd = new FormData()
            for(const key in data){
                fd.append(key,data[key])
            }
        }
    }
    // console.log(url)
    // console.log( fd.keys())
    // for(const key of fd.keys()){
    //     console.log(key)
    // }

    //实例化请求对象
    let xhr = new XMLHttpRequest()
    //设置请求参数
    xhr.open(method, url, true)
    // 发送请求
    xhr.send(fd)
    //监听响应信息
    xhr.onreadystatechange = function(){
        if(4 == this.readyState && 200 == this.status){
            console.log(this.responseText)
            reqData.www(this.responseText)
        }

    }
}