function getStyle(obj,name) {
    if(obj.currentStyle){
        return obj.currentStyle[name];//重点记忆
    }else {
        return getComputedStyle(obj,false)[name];
    }
}
function startMove(obj,attr,iTarget) {//要变宽在这添加一个参数
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur = 0;
        if(attr == 'opacity'){
            //解决IE7的bug问题用Math.round四舍五入
            cur = Math.random(parseFloat(getStyle(obj,attr))*100);
        }else {
            cur = parseInt(getStyle(obj,attr));
        }
        var speed = (iTarget - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (cur == iTarget) {
            clearInterval(obj.timer);
        } else {
            // obj.style['height'] = parseInt(getStyle(obj,'height')) + speed + 'px';
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity:'+(cur + speed)+')';
                obj.style.opacity = (cur + speed)/100;

                document.getElementById('text1').value = obj.style.opacity ;
            }else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30);
}