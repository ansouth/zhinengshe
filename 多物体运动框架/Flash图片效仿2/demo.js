window.onload = function () {
    var oDiv = document.getElementById('div1');
    //getByClass 返回的是数组
    var oBtnPrev = getByClass(oDiv, 'prev')[0];
    var oBtnNext = getByClass(oDiv, 'next')[0];

    oBtnOnMouse();
    oBtnOnClick();

    //点击小图大图拉下切换效果  层级z-index
    var oDivSmall = getByClass(oDiv,'small_pic')[0];
    var aLiSmall = oDivSmall.getElementsByTagName('li');
    var oDivBig = getByClass(oDiv,'big_pic')[0];
    var aLiBig = oDivBig.getElementsByTagName('li');

    //初始化一个变量控制图层显示优先级
    var nowZIndex = 1;
    var now = 0;
    for(var i = 0; i < aLiSmall.length; i++) {
        aLiSmall[i].index = i;
        aLiSmall[i].onclick = function () {
            //如果显示的是当前这张,返回flase 这个函数终止
            if(this.index == now) return;
            //如果显示不是当前这张,那么使得当前小图等于当前大图
            now = this.index;
            tab();
        };
        aLiSmall[i].onmouseover = function () {
            starMove(this, 'opacity', 100);
        };
        aLiSmall[i].onmouseout = function () {
            //如果显示的是当前这张,返回flase 这个函数终止
            if(this.index == now) return;
            starMove(this, 'opacity', 50);
        };
    }

    //oBtnOnMouse---左右按钮显示效果部分
    function oBtnOnMouse() {
        var oMarkLeft = getByClass(oDiv, 'mark_left')[0];
        var oMarkRight = getByClass(oDiv, 'mark_right')[0];
        oBtnPrev.onmouseover = oMarkLeft.onmouseover = function () {

            starMove(oBtnPrev, 'opacity', 100)
        };
        oBtnPrev.onmouseout = oMarkLeft.onmouseout = function () {

            starMove(oBtnPrev, 'opacity', 0)
        };
        oBtnNext.onmouseover = oMarkRight.onmouseover = function () {

            starMove(oBtnNext, 'opacity', 100)
        };
        oBtnNext.onmouseout = oMarkRight.onmouseout = function () {

            starMove(oBtnNext, 'opacity', 0)
        };
    }

    //封装--当前小图关联大图运动函数
    function tab() {
        var oUlSmall = oDivSmall.getElementsByTagName('ul')[0];
        //每激活次函数zIndex累加使得now是优先级显示
        aLiBig[now].style.zIndex = nowZIndex++;

        //所有小图透明度为50%
        for(var i = 0; i < aLiSmall.length; i++) {
            starMove(aLiSmall[i], 'opacity', 50);
        }
        //this.index当前小图透明度为100
        starMove(aLiSmall[now], 'opacity', 100);

        //下拉效果,当前图片的Li高度 初始化为零,
        aLiBig[now].style.height = 0;
        //运动效果
        starMove(aLiBig[now], 'height', 300);

        //小图区域ul移动框架
        //第1张图---不移动
        if(now == 0) {
            starMove(oUlSmall, 'left', 0);
        }
        //倒数第二张图 --- 不移动
        else if(now == aLiSmall.length-2) {
            starMove(oUlSmall, 'left', -(now-2)*aLiSmall[0].offsetWidth)
        }
        //最后一张图 --- 不移动
        else if(now == aLiSmall.length-1) {
            starMove(oUlSmall, 'left', -(now-3)*aLiSmall[0].offsetWidth)
        }
        else {
            starMove(oUlSmall, 'left', -(now-1)*aLiSmall[0].offsetWidth)
        }
    }

    //点击导航大图切换
    function oBtnOnClick() {
        oBtnPrev.onclick = function () {
            now--;
            if(now == -1) {
                now = aLiSmall.length-1;
            }
            tab();
        };
        oBtnNext.onclick = function () {
            now++;
            if(now == aLiSmall.length) {
                now = 0;
            }
            tab();
        };
    }

    // 自动播放 即自动点击oBtnPrev.onclick加入定时器循环.
    var timer = setInterval(oBtnPrev.onclick, 2000);

    oDiv.onmouseover = function () {
        clearInterval(timer)
    };
    oDiv.onmouseout = function () {
        timer = setInterval(oBtnPrev.onclick, 2000)
    }
};

//获取className 返回的是数组 注意按数组处理
function getByClass(oParent, sClass) {
    //取得所有函数
    var aEle = oParent.getElementsByTagName('*');
    //创建个数组容器
    var aResult = [];

    for(var i = 0; i < aEle.length; i++) {
        if(aEle[i].className == sClass) {
            //符合条件的class加入数组
            aResult.push(aEle[i]);
        }
    }
    //返回一个数组出去
    return aResult;
}