(function () {
    /**
     *  创建chrome插件，简单去掉百度搜索的广告
     *  主要根据广告通用的类名和内容为'广告' 两个字去删除节点 YkTPiJ
     *  lRLJvx ekrJHU vOxVLk fXKqeY OGQyZL / sUdrNZ fdNwIe BUAeou CunVev H_Tqks
     *  上面是两个底部广告的类名，没有什么规律
     *
     *  由于百度的的广告是异步加载的，然而插件是dom加载完成就执行了，所以需要手动的刷新一下，很不方便
     *  解决办法：通过设置一个定时器来模拟手动刷新
     * */

    var ad = {
        adSafe: function () {

            // 顶部大广告，使用的类名不一样
            let b = document.querySelector('.zapKAj');
            if (b) b.remove();

            // 顶部大广告，使用的类名不一样
            let d = document.querySelector('.YkTPiJ');
            if (d) d.remove();

            // 底部的广告生成的类名是随机的，无法做的完全去掉
            let c = document.querySelector('.fyjbPh');
            if (c) c.remove();

            // 右侧区域广告
            let a = document.querySelector('.cr-offset');
            if (a) a.remove();

            // 删除有该类名的广告列表
            let adb = document.querySelectorAll('.ec_tuiguang_ppouter');
            if(adb.length > 0) {
                for(let i = 0; i < adb.length;i++){
                    console.log(adb[i].parentNode.parentNode.parentNode)
                    adb[i].parentNode.parentNode.parentNode.remove()
                }
            }

            // 删除有该类名的广告列表
            let ads = document.querySelectorAll('.ec_tuiguang_pplink');
            if(ads.length > 0) {
                for(let i = 0; i < ads.length;i++){
                    console.log(ads[i])
                    ads[i].parentNode.parentNode.parentNode.remove()
                }
            }
        },

        // 通过设置定时器来达到手动刷新的效果
        removeAd: function () {
            var time1 = setTimeout(ad.adSafe, 1000);
            var time2 = setTimeout(function(){}, 1000);

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