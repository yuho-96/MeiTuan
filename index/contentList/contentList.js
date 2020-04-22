(function(){
    //类目的模板字符串
    var itemTmpl = '<div class="r-item-content">'+
                        '<img class="item-img" src="$pic_url" />'+
                        '$brand'+
                        '<div class="item-info-content">'+
                            '<p class="item-title">$name</p>'+
                            '<div class="item-desc clearfix">'+
                                '<div class="item-score">$wm_poi_score</div>'+
                                '<div class="item-count">月售$monthNum</div>'+
                                '<div class="item-distance">&nbsp;$distance</div>'+
                                '<div class="item-time">$mt_delivery_time&nbsp;|</div>'+
                            '</div>'+
                            '<div class="item-price">'+
                                '<div class="item-pre-price">$min_price_tip</div>'+
                            '</div>'+
                            '<div class="item-others">'+
                                '$others'+
                            '</div>'+
                        '</div>'+
                    '</div>';




    var page = 0;
    var isLoading = false;                        

    // 获取商家列表
    function getList(){
        page++;
        isLoading=true;
        $.get('../json/homelist.json',function(data){
            var list = data.data.poilist ||[];

            initContentList(list);
            isLoading=false;
        })
    }

    //获取品牌信息
    function getBrand(data){
        if(data.brand_type){
            return '<div class="brand brand-pin">品牌</div>'
        } else {
            return '<div class="brand brand-xin">新到</div>'
        }
    }

    //获取月售数量
    function getMonthNum(data){
        var num = data.month_sale_num;
        if(num > 999){
            //如果销量大于999，则显示999+
            return '999+';
        } else {
            return num
        }
    }

    //获取商家活动
    function getOthers(data){
        var array = data.discounts2;
        var str =" ";
        array.forEach((item, index) => {
            //内部商家活动模板字符串
            var _str = '<div class="other-info">'+
                            '<img src=$icon_url class="other-tag" />'+
                            '<p class="other-count one-line">$info</p>'+
                        '</div>';
            //模板字符串替换
            _str = _str.replace('$icon_url',item.icon_url)
                       .replace('$info',item.info);
            //
            str += _str;
        });
        return str
    }

    //渲染列表
    function initContentList(list){
        list.forEach(function(item,index){
            var str = itemTmpl
                      .replace('$pic_url',item.pic_url)
                      .replace('$name',item.name)
                      .replace('$distance',item.distance)
                      .replace('$mt_delivery_time',item.mt_delivery_time)
                      .replace('$min_price_tip',item.min_price_tip)
                      .replace('$brand',getBrand(item))
                      .replace('$monthNum',getMonthNum(item))
                      .replace('$others',getOthers(item))
                      .replace('$wm_poi_score',new StarScore(item.wm_poi_score).getStars());

            $('.list-wrap').append($(str));
        })
    }

    function addEvent(){
        window.addEventListener('scroll',function(){
            var clientHeight = document.documentElement.clientHeight;
            var scrollHeight = document.body.scrollHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var preDistance = 30;

            if ( (scrollTop+clientHeight) >= (scrollHeight - preDistance) ) {

                if (page < 3){
                    if (isLoading){
                        return;
                    }
                    getList();
                }
                $('.loading').text('加载完成');
            }
        })
    }

    function init(){
        getList();
        addEvent();
    }
    init();
})();