    /*
        method:'get/post'
        url:''
        data:{}
        timeout: 0 ms
        */

       function ajax(reqData) {
        return   new Promise((resolve, reject) => {
             let method = reqData.method
             method = method.trim()
             method = method.toUpperCase()
             if (!method) {
                 method = 'GET'
             }
             let url = reqData.url
             url = url.trim()
             if (!url) {
                 reject({'statesText':'url不能为空'})
                 return
             }
             let fd = null
             if('GET' == method && reqData.data){
                 url += '?'
                 for (const key in reqData.data) {
                     url += `${key}=${reqData.data[key]}&`
                 }
             }else if('POST' == method && reqData.data){
                 fd = new FormData()
                 for (const key in reqData.data) {
                    fd.append(key, reqData.data[key])
                 }
             }

             let xhr = new XMLHttpRequest()
             xhr.open(method, url)
             
             if(reqData.timeout){
                 xhr.timeout = reqData.timeout
             }

             xhr.send(fd)
             xhr.onreadystatechange = function(){
                 if(4 == this.readyState && 200  == this.status){
                     try {
                         resolve( JSON.parse(this.responseText) )
                     } catch (error) {
                         resolve( this.responseText )
                     }
                 }
             }


         })


     }