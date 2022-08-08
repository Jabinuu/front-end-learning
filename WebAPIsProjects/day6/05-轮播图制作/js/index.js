window.addEventListener('load', function () {
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');

    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
    })

    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function () {
            arrowr.click();
        }, 3000);
    })

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        // 在创建的时候顺便给每个li绑定点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focus.offsetWidth);
        })
    }
    ol.children[0].className = 'current';

    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0;
    var circle = 0;
    var flag = true;  //节流阀

    arrowr.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // 添加回调函数，动画播放完毕，才打开节流阀
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            });
            // 小圆点跟随图片而变化
            circle++;
            circle = circle == ol.children.length ? 0 : circle;
            circleChange();
        }
    })

    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';
            }
            num--;
            animate(ul, -num * focus.offsetWidth, function () {
                flag = true;
            });

            // 小圆点跟随图片而变化
            circle--;
            circle = circle == -1 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 实现自动播放
    var timer = setInterval(function () {
        // 手动模拟点击右箭头
        arrowr.click();
    }, 3000);
})