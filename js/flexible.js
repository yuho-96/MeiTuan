(function(){
    'use strict';

    // 设置dpr
    // var docEl = document.documentElement,
    //     viewportEl = document.querySelector("meta[name='viewport']"),
    //     maxWidth = 540,
    //     minWidth = 320,
    //     dpr = window.devicePixelRatio || 1;
    
    // dpr = dpr >= 3 ? 3: (dpr >= 2 ? 2:1);
    
    // //设置data-dpr max-width min-width 属性
    // docEl.setAttribute("data-dpr",dpr);
    // docEl.setAttribute("max-width",maxWidth);
    // docEl.setAttribute("min-width",minWidth);

    // var scale = 1 / dpr,
    //     content = "width=device-width, initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no";

    //     if (viewportEl){
    //         viewportEl.setAttribute("content",content);
    //     } else {
    //         viewportEl = document.createElement("meta");
    //         viewportEl.setAttribute("name","viewport");
    //         viewportEl.setAttribute("content",content);
    //         document.head.appendChild(viewportEl);
    //     }

    setRemUnit();

    addEventListener("resize",setRemUnit,true);

    function setRemUnit (){
        var docEl = document.documentElement,
        ratio = 37.5;
        var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;

        //设置最大和最小宽度
        // if (maxWidth&&(viewWidth / dpr > maxWidth)){
        //     viewWidth = maxWidth * dpr;
        // } else if (minWidth&&(viewWidth / dpr < minWidth)){
        //     viewWidth = minWidth * dpr;
        // }
        docEl.style.fontSize = viewWidth / ratio + "px";
    }


})();