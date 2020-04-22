(function (){
    var itemTmpl = '<div class="order-item">'+
                        '<div class="order-item-inner">'+
                            '<img class="item-img" src=$poi_pic />'+
                            '<div class="item-right">'+
                                '<div class="item-top">'+
                                    '<p class="order-name one-line">$poi_name</p>'+
                                    '<div class="arrow"></div>'+
                                    '<div class="order-state">$status_description</div>'+
                                '</div>'+
                                '<div class="item-bottom">$getProduct</div>'+
                            '</div>'+
                        '</div>'+
                        '$getComment'+
                    '</div>';

    function getComment(data){
        var evalution = !data.is_comment;

        if (evalution) {
            return '<div class="evalution clearfix">'+
                        '<div class="evalution-btn">评价</div>'+
                    '</div>';
        }

        return '';
    }


    //定义总计菜品
    function getTotalPrice(data){
        var str = '<div class="product-item">'+
                        '<span>...</span>'+
                        '<div class="p-total-count">'+
                            '总计'+data.product_count+'个菜，实付'+
                            '<span class="total-price">'+ data.total+'</span>'+
                        '</div>'+
                    '</div>';
        return str;
    }



    //具体商品
    function getProduct(data){
        var list = data.product_list || [];

        list.push({type:'more'});

        var str = ' ';
        list.forEach(function(item){

            if (item.type==='more'){
                str += getTotalPrice(data);
            } else {
                str += '<div class="product-item">'+ 
                            item.product_name+
                            '<div class="p-conunt">x'+
                                item.product_count+
                            '</div>'+
                        '</div>';
            }
        })
        return str;
    }
    
    // 渲染列表
    function initContentList(list){
        list.forEach(function(item){
            var str = itemTmpl.replace('$poi_pic',item.poi_pic)
                              .replace('$poi_name',item.poi_name)
                              .replace('$status_description',item.status_description)
                              .replace('$getProduct',getProduct(item))
                              .replace('$getComment',getComment(item));

            $('.order-list').append(str);
        })
        
    }


    var page = 0;
    var isLoading = false; 
    //请求数据
    function getList(){
        page++;
        isLoading=true;
        $.get('../json/orders.json',function(data){

            var list = data.data.digestlist || [];
            initContentList(list);
            isLoading=false;
        })
    }


    //
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
        });
    }
    function init(){
        getList();
        addEvent();
    }

    init();

})();
