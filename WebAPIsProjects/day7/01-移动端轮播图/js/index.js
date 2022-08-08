window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var focusWidth = focus.offsetWidth;
    var index = 0;
    var timer = this.setInterval(function () {
        index++;
        var translateX = -index * focusWidth;
        ul.style.transform = 'translateX(' + translateX + 'px)';
        ul.style.transition = 'all .5s';
    }, 2000);

    ul.addEventListener('transitionend', function () {
        // 写==时会有bug：当你从别的页面切回来时，会发现位移的很远，以至于图片不见了。
        // 这是由于你在别的页面，浏览器节约电脑资源的机制，会使这个页面处于半休眠状态，也就是只开定时器index++，但是没有进行过渡，所以过渡结束这个事件就不会触发了
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(0)';
        }
        else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translateX = -index * focusWidth;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        // 以上实现无缝滚动

        // 小圆圈跟随自动播放而变（排他）
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    var startX, moveX;
    var flag = false;   //监控触摸后是否有移动
    ul.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.targetTouches[0].pageX;
    })

    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translateX = -index * focusWidth + moveX
        ul.style.transition = '';
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true;
        e.preventDefault();   //组织手机屏幕滚动
    })

    ul.addEventListener('touchend', function () {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                // 右滑
                if (moveX > 0) {
                    index--;
                }
                else {
                    index++;
                }
                var translateX = -index * focusWidth;
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
            else {
                var translateX = -index * focusWidth;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
            flag = false;
        }

        clearInterval(timer);   //小技巧，开启定时器之前，把已存在的清理掉，防止存在多个定时器
        timer = setInterval(function () {
            index++;
            var translateX = -index * focusWidth;
            ul.style.transform = 'translateX(' + translateX + 'px)';
            ul.style.transition = 'all .5s';
        }, 2000);
    })
})