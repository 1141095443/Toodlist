$(function () {
    //  1.存储内容
    var myArray = [];
    // 1.每次打开都要将本地存储的值给当前数组  同时更新小li
    myArray = get();
    load();
    // 2.获取本地存储的值 需要转对象形式
    function get() {
        var mysqlValue = JSON.parse(localStorage.getItem('mysql'));
        // 如果为空就返回空 []
        if (mysqlValue == null) {
            return [];
        }
        else {
            return mysqlValue;
        }
    }

    // 3.存储内容 将当前修改后的数组的内容存给本地存储 记得要以字符串存储
    function set(array) {
        localStorage.setItem('mysql', JSON.stringify(array));
    }

    // 4.重新同步更新小li和本地存储的个数 需要一个一个添加用到遍历$.each(需要遍历的数组，function(索引 , 当前索引对着的数组))
    function load() {
        var NoSpan = 0;
        var YesSpan = 0;
        // 每次重新加载页面需要清空
        $('ul').empty();
        var mysqlValue = get();
        $.each(mysqlValue, function (index, document) {
            // 如果done是true 就添加到yes里面 添加li 同时给a添加了自定义索引 当我们点击当前a的索引就能得到当前li
            if (mysqlValue[index].done == true) {
                $('.YesUl').prepend('<li><input type="checkbox" class="NoBtn" checked> <p>' + document.title + '</p> <a href="javascript:;" class="remove" index = ' + index + ' ></a ></li >');
                YesSpan++;
            }
            else {
                $('.NoUl').prepend('<li><input type="checkbox" class="NoBtn"> <p>' + document.title + '</p> <a href="javascript:;" class="remove" index = ' + index + ' ></a ></li >');
                NoSpan++;
            }
        })
        // 同时让右边的数字跟着变化
        $('.NoSpan').text(NoSpan);
        $('.YesSpan').text(YesSpan);
    }



    //5. 输入框按下回车 回车ascll 13 追加新数组 同时存到本地存储里面 重新渲染页面
    $('.text').children('input').on('keydown', function (e) {
        if (e.keyCode == 13) {
            // 如果输入的为空就不加载
            if ($(this).val() == '') {
                alert('请输入待办事项');
            }
            else {
                var myArray = get();
                myArray.push({
                    title: $(this).val(),
                    done: false
                })
                set(myArray);
                $(this).val('');

                load();
            }

        }

    });

    // 6.点击复选框 让当前a对应的数组的done和复选框状态相同 并存入本地存储 由于复选框是未来创建的 只能通过ul获取并绑定点击事件
    $('ul').on('click', 'input', function () {
        // 获取的是a里面自定义索引attr() 与数组绑定
        var index = $(this).siblings('a').attr('index');
        var myArray = get();
        myArray[index].done = $(this).prop('checked');
        set(myArray);

        load();
    })
    // 7.点击删除 删除当前a对应的本地存储splice(从第几个开始，位数) 重新加载页面
    $('ul').on('click', '.remove', function () {
        var myArray = get();
        var index = $(this).attr('index');
        myArray.splice(index, 1);
        set(myArray);
        load();
    })

})