




/*
1. getLeft()获取元素离左侧的距离
2. getTop()获取元素离顶部的距离
3. bindEvent() 绑定事件
4. delEvent() 解除绑定
5. firstNode() 获取第一个子元素
6. lastNode() 获取最后一个子元素
7. nextNode() 获取下一个兄弟元素
8. prevNode() 获取上一个兄弟元素
9. cookie 
    cookie.add() 添加cookie
    cookie.update() 更新cookie
    cookie.delByName() 删除指定cookie
    cookie.clearAll() 删除所有cookie
    cookie.getAll()获取所有cookie
    cookie.get 获取指定名称的cookie

*/


var cookie = {}

/**
* 设置cookie
* @param {String} name  cookie名称
* @param {String} value cookie值
* @param {Number} time 过期时间 分钟
*/
cookie.add = function (name, value, minute) {
    var va = escape(value)
    var data = new Date()
    if (minute) {
        data.setTime(data.getTime() + 1000 * 60 * minute)
        document.cookie = `${name}=${va};expires=${data.toUTCString()}`
    } else {
        document.cookie = `${name}=${va}` //当前会话关闭就超时
    }
}
/**
* 更新cookie
* @param {String} name  cookie名称
* @param {String} value cookie值
* @param {Number} time 过期时间 分钟
*/
cookie.update = function(name, value, minute){
    this.add(name, value, minute)
}

cookie.clearAll = function(){
    var cs =  this.getAll()
    for (const key in cs) {
        if (cs.hasOwnProperty(key)) {
            this.delByName(key)
        }
    }
}

/**
 * 删除指定cookie
 * @param {String} name 要删除的cookie名称
 */
cookie.delByName = function (name) {
    this.add(name, '', -1)
}


/**
 * 获取所有cookie
 * return 包含当前cookie值的对象 
 */
cookie.getAll = function () {
    var coo = document.cookie
    if (coo == '') {
        return null
    }
    //清除空格
    coo = coo.replace(/\s+/g, '')
    var cArr = coo.split(';')
    var cookies = {}
    cArr.forEach((coo) => {
        var c = coo.split('=')
        cookies[c[0]] = unescape(c[1])
    })
    return cookies
}

/**
 * 获取指定名称的cookie
 * 参数name: cookie名称
 * return :如果有返回cookie值，否则返回为null
 */
cookie.get = function (name) {
    var cs = this.getAll()

    if (cs.hasOwnProperty(name)) {
        return cs[name]
    } else {
        return null
    }
}



/**
 * @description: 获取元素离左侧的距离
 * @return {number} 元素离左侧的距离 
 */
Element.prototype.getLeft = function () {
    var result = 0; //记录距离
    var el = this
    while (el) {
        result += el.offsetLeft;
        result += el.clientLeft //边框
        el = el.offsetParent;
    }
    return result;
}

/**
 * @description:  获取元素离顶部的距离
 * @return {number} 元素离顶部的距离 
 */
Element.prototype.getTop = function () {
    var result = 0;
    var el = this
    while (el) {
        result += el.offsetTop;
        result += el.clientTop
        el = el.offsetParent;
    }

    return result;
}


/**
 * @description: 绑定事件
 * @param {string} 事件类型
 * @param {string} 要绑定的事件回调
 */
Element.prototype.bindEvent = function (eventName, callback) {
    if (this.addEventListener) {
        this.addEventListener(eventName, callback, false);
    } else {
        this.attachEvent("on" + eventName, callback);
    }
}

/**
 * @description: 删除指定的绑定事件
 * @param {String} eventName 事件类型
 * @param {Function} callback 事件回调
 */
Element.prototype.delEvent = function (eventName, callback) {
    if (obj.removeEventListener) {
        obj.removeEventListener(eventName, callback, false);
    } else {
        obj.detachEvent('on' + eventName, callback);
    }
}

/**
 * @description:  获取第一个子元素
 * @return {Element} 获取不到返回 NULL
 */
Element.prototype.firstNode = function () {
    return this.firstElementChild || this.firstChild;
}
/**
 * @description:  获取最后一个子元素
 * @return {Element} 获取不到返回 NULL
 */
Element.prototype.lastNode = function () {
    return this.lastElementChild || this.lastChild;
}
/**
 * @description:  获取下一个兄弟元素
 * @return {Element} 获取不到返回 NULL
 */
Element.prototype.nextNode = function () {
    return this.nextElementSibling || this.nextSibling;
}
/**
 * @description:  获取上一个兄弟元素
 * @return {Element} 获取不到返回 NULL
 */
Element.prototype.prevNode = function () {
    return this.previousElementSibling || this.previousSibling;
}

