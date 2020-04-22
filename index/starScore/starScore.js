(function (){
    //得分模板字符串
    var itemTmpl = '<div class="star-score">$starstr</div>';

    function _getStars(){
        var _score = this.score.toString();
        var scoreArray = _score.split('.');
        //满星
        var fullStar = parseInt(scoreArray[0]);
        //半星
        var halfStar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;
        //零星
        var nullStar = 5 - fullStar - halfStar;
        var starstr = '';

        for (var i=0; i<fullStar; i++){
            starstr += '<div class="star fullstar"></div>'
        }
        for (var j=0; j<halfStar; j++){
            starstr += '<div class="star halfstar"></div>'
        }
        for (var k=0; k<nullStar; k++){
            starstr += '<div class="star nullstar"></div>'
        }
        return itemTmpl.replace('$starstr',starstr);
    }

    window.StarScore = function (score){
        this.score = score || '';
        this.getStars = _getStars;
    }
})();