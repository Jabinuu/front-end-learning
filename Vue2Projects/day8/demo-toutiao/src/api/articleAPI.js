import request from '@/utils/request.js'


// export和exportdefault的区别：
// export可以向外暴露多个对象（引入时通常搭配结构赋值使用），而export default只能下向外暴露唯一的对象
export const getArticleList = function (_page, _limit) {
    return request.get("/articles", {
        params: {
            _page,
            _limit
        },
    });
}