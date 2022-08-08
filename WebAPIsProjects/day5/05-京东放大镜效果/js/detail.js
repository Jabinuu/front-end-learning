window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigImg = document.querySelector('#bigImg');

    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })

    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    preview_img.addEventListener('mousemove', function (e) {
        var innerX = e.pageX - this.offsetLeft;
        var innerY = e.pageY - this.offsetTop;

        var maskX = innerX - mask.offsetWidth / 2;
        var maskY = innerY - mask.offsetHeight / 2;

        console.log(maskY);
        // 因为里外都是正方形，所以垂直和水平方向的mask最大移动距离是相同的
        var maskMaxMoveDistance = this.offsetWidth - mask.offsetWidth;
        var bigImgMaxMoveDistance = bigImg.offsetWidth - big.offsetWidth;

        if (maskX < 0) {
            maskX = 0;
        }
        else if (maskX > maskMaxMoveDistance) {
            maskX = maskMaxMoveDistance;
        }
        if (maskY < 0) {
            maskY = 0;
        }
        else if (maskY > maskMaxMoveDistance) {
            maskY = maskMaxMoveDistance;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        bigImg.style.left = -maskX / maskMaxMoveDistance * bigImgMaxMoveDistance + 'px';
        bigImg.style.top = -maskY / maskMaxMoveDistance * bigImgMaxMoveDistance + 'px';
    })
})