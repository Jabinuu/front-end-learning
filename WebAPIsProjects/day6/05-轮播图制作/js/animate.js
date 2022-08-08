function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 到达目的地则关闭计时器，即关闭动画
        if (obj.offsetLeft == target) {
            // 回调函数：在动画结束后执行的函数*****
            // if (callback) {
            //     callback();
            // }  等价于  
            callback && callback();    //短路运算
            clearInterval(obj.timer);
        }
        // 这个数学公式是实现缓动的核心：每次移动的步长 = （目标位置 - 现在的位置） / x
        var step = (target - obj.offsetLeft) / 40;

        // 因为px<0.5的时候，计算机在处理时是视为0的，所以会出现到不了target的问题，这时候就需要取整数了
        // 一来可以避免浮点数，二来可以真正的到达目的地了
        // 当step是正数时，向上取值，当step是负数时，向下取整（-0.5向上取值是0）
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 10);
}