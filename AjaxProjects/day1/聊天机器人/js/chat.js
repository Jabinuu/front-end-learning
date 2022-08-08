$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    // 将输入文本渲染到聊天框中
    $('#btnSend').on('click', function () {
        var text = $('#iptForm').val().trim();
        if (text.length <= 0)
            return $('#iptForm').val('');
        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>');
        resetui();
        $('#iptForm').val('');
        getMsg(text);
    });

    // 利用ajax获取聊天文本
    function getMsg(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: { spoken: text },
            success: function (res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text;
                    $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>');
                    resetui();
                    getVoice(msg);
                }
            }
        })
    }

    function getVoice(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: { text: text },
            success: function (res) {
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl);
                }
            }
        });
    }

    $('body').on('keyup', function (e) {
        if (e.keyCode === 13) {
            $('#btnSend').click();
        }
    })
})