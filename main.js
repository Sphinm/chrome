(function () {
    /**
     *  创建chrome插件，简单去掉百度搜索的广告
     *  主要根据广告通用的类名和内容为'广告' 两个字去删除节点
     *  由于百度的的广告是异步加载的，然而插件是dom加载完成就执行了，所以需要手动的刷新一下，很不方便
     *  解决办法：通过设置一个定时器来模拟手动刷新
     *
     *  lRLJvx ekrJHU vOxVLk fXKqeY OGQyZL / sUdrNZ fdNwIe BUAeou CunVev H_Tqks
     *  上面是两个底部广告的类名，没有什么规律
     * */

    let ad = {
        adSafe: function () {

            // 右侧区域广告
            let cr = document.querySelector('.cr-offset');
            if (cr) cr.remove();

            // 删除顶部第一个节点强制显示的广告
            let cnt = document.querySelector('#content_left');
            let css_first = cnt.firstElementChild.style.cssText;
            let css_last = cnt.lastElementChild.style.cssText;
            const temp = 'display: block !important; visibility: visible !important;';
            if (css_first === temp) cnt.firstElementChild.remove();
            if (css_last === temp) cnt.lastElementChild.remove();


            // 顶部强制显示的广告删除后默认会显示到最后一个，还需要再删除一下
            let clone = document.querySelector('#clone');
            if (clone) clone.remove();

            // 删除有该类名的广告列表
            let outer = document.querySelectorAll('.ec_tuiguang_ppouter');
            if(outer.length > 0) {
                for(let i = 0; i < outer.length;i++){
                    console.dir('进入了ec_tuiguang_ppouter')
                    outer[i].parentNode.parentNode.parentNode.remove()
                }
            }

            // 删除有该类名的广告列表
            let link = document.querySelectorAll('.ec_tuiguang_pplink');
            if(link.length > 0) {
                for(let i = 0; i < link.length;i++){
                    console.dir('进入了ec_tuiguang_pplink')
                    link[i].parentNode.parentNode.parentNode.remove()
                }
            }
        },

        // 通过设置定时器来达到手动刷新的效果
        removeAd: function () {
            let time1 = setTimeout(ad.adSafe, 1000);
            let time2 = setTimeout(function(){}, 1000);

            // 监听搜索button的点击事件
            document.querySelector('#su').addEventListener('click', function () {
                time1 = setTimeout(ad.adSafe, 1000);
            });
            // 监听输入框的input事件
            document.querySelector('#kw').addEventListener('input', function () {
                time2 = setTimeout(ad.adSafe, 1000);
            });
        }
    };

    // 执行
    ad.removeAd();
})();