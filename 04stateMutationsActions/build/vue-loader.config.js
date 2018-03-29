// const docsLoader = require.resolve('./doc-loader');

module.exports = (isDev) => {
    return {
        preserveWhitepace: true,
        extractCSS: !isDev,//上线环境不提取每个vue的css，开发环境进行热加载
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true  //将css中的-变成js中的与驼峰命名
        },
        // hotReload: false, // 组件热重载功能根据环境变量生成
        // loaders:{
        //     'docs':docsLoader
        // }
    }
}