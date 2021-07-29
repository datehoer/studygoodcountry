"ui";

ui.layout(
    <vertical>
        <text textSize="18sp" textColor="red" text="Datehoer m 2021.05.06" />
        <horizontal>
            <text textSize="16sp">请选择订阅的栏目名:</text>
            <spinner id="sp1" entries="推荐|上新|主要央媒|行业媒体|机关企事业单位|高校|地方媒体|社会机构" />
        </horizontal>
        <horizontal>
            <text textSize="16sp">请输入文章阅读次数推荐大于12</text>
            <input id="readnum" text="12"/>
        </horizontal>
        
        <checkbox id="op1" text="选读文章" />
        <checkbox id="op2" text="看视频" />
        <checkbox id="op3" text="双人对战" />
        <checkbox id="op4" text="四人赛" />
        <checkbox id="op5" text="挑战答题" />
        <checkbox id="op6" text="订阅" />
        <checkbox id="op7" text="本地频道" />
        <button id="runjyqg" h="50" text="积分执行" />
        <button id="stopjyqg" h="50" text="停止脚本运行" />
        <button id="sponsor" h="50" text="点击赞助" />
    </vertical>
);

ui.runjyqg.click(function () {
    var op1 = ui.op1.isChecked();
    var op2 = ui.op2.isChecked();
    var op3 = ui.op3.isChecked();
    var op4 = ui.op4.isChecked();
    var op5 = ui.op5.isChecked();
    var op6 = ui.op6.isChecked();
    var op7 = ui.op7.isChecked();
    var readnum = ui.readnum.getText()
    log("选读文章:" + op1, "\n看视频" + op2, "\n双人对战" + op3, "\n四人赛" + op4, "\n挑战答题" + op5, "\n订阅" + op6, "\n本地频道" + op7)
    threads.start(function () {
        var subscribeoption = ui.sp1.getSelectedItemPosition();
        main(op1, op2, op3, op4, op5, op6, op7, subscribeoption,readnum);
    })
})
ui.stopjyqg.click(function () {
    engines.stopAllAndToast()
})
ui.sponsor.click(function () {
    app.openUrl("https://zjzdmc.top/jsfx/48.html")
    toast("点击文章页的赞赏即可,感谢支持!")
})


var screen_var = "";
screen_var += "屏幕宽度:" + device.width;
screen_var += ",屏幕高度:" + device.height;
var commenttext = ["新时代的中国越来越好，生活质量不断提高", "全民族团结一致，艰苦奋斗，共创辉煌加油", "团结奋斗，努力实现伟大的中国梦加油加油", "贯彻新发展理念，构建新发展格局加油加油", "心里有牵挂，脚下有道路，眼中有方向加油", "同呼吸共命运心连心，共同建设强大的祖国", "支持党，支持国家！", "为实现中华民族伟大复兴而不懈奋斗！", "紧跟党走，毫不动摇！", "不忘初心，牢记使命", "努力奋斗，报效祖国！"]; // 评论
var xvar = 8; // 选读文章次数
var svar = 10; // 看视频次数
var xtime = 120; // 单篇文章阅读时间
var stimes = 600; // 看视频总时间
var dian = 0; // 加载
function goSleep(seconds) {
    sleep(1000 * seconds);  // 睡眠seconds秒
}
function advertisement() {
    console.log("广告---耐心等待");
    app.openUrl("https://zjzdmc.top");
    for (let readTime = 0; readTime < 6000;) {
        if (readTime <= 30000) {
            swipe(readX, readH1, readX, readH2 - 200, 1000);
            goSleep(2);
            log("滑动次数+1");
            readTime += 500;
            click(random(60, 1000), random(60, 1660))
        }
        else {
            swipe(readX, readH2 + 200, readX, readH1, 1000);
            goSleep(2);
            log("滑动次数+1");
            readTime += 500;
            click(random(60, 1000), random(60, 1660))
        }
    }
    home();
}
function starStudy() {
    toast("请自行结束学习强国进程");
    home();
    goSleep(10);
    if (app.launchApp('学习强国')) {
        log("启动中...");
        while (true) {
            if (id("home_bottom_tab_icon_large").exists()) {
                log("启动成功");
                break;
            }
            else {
                if (dian == 1) {
                    log("启动中..");
                }
                else if (dian == 2) {
                    log("启动中.");
                }
                else if (dian == 3) {
                    log("启动中...");
                    dian = 0
                }
                sleep(2000);
                dian++;
            }
        }
        sleep(5000);
    }
    else {
        log("应用不存在，请下载！");
    }
}

var screenWidth = device.width;
var screenHeight = device.height;
var readRandom = random(0, 2)
var readGenres = ["推荐", "要闻", "综合"];
var readNum = 12;
var readX = (screenWidth / 3) * 2;
var readH1 = (screenHeight / 6) * 5;
var readH2 = (screenHeight / 6);
var readCommentRandom = random(0, commenttext.length - 1);

var readPlaces = ["“学习强国”学习平台", "新华社", "人民日报", "人民日报客户端"];
function read(readnum) {
    if(readnum < 12){
        toast("阅读次数为"+readnum+"次，少于规定次数，以设置为12次")
        readNum = 12;
    }
    else {
        readNum = readnum;
    }
    goSleep(3);
    let readGenre = readGenres[readRandom];
    log(readGenre);
    click(readGenre);
    goSleep(1);
    for (var readnot = 0; readnot < readNum;) {
        click("“学习强国”学习平台"); //先进入一个文章页，然后判断是否是文章页
        goSleep(1)
        let readJudge = true;
        while (readJudge) {
            if (className("android.widget.TextView").text("欢迎发表你的观点").exists()) {
                readJudge = false;
                log("在文章页");
                break; // 判断是否存在评论
            }
            else {
                if (id("home_bottom_tab_icon_large").exists()) {
                    className("ListView").scrollForward(); // 翻页
                    log("在主页");
                    let readPlace = readPlaces[random(0, readPlaces.length - 1)]
                    click(readPlace);
                }
                else {
                    back();
                    className("ListView").scrollForward(); // 翻页
                    log("不在文章页");
                    goSleep(2);
                    let readPlace = readPlaces[random(0, readPlaces.length - 1)]
                    click(readPlace);
                    goSleep(5);
                }
            }
        }
        goSleep(3);
        if (className("android.widget.RelativeLayout").clickable(true).depth(11).exists()) {
            className("android.widget.RelativeLayout").clickable(true).depth(11).findOne().click();  // 播放
        }
        else {
            log("播放不存在，打开的是视频页面")
        }
        goSleep(1);
        for (let readTime = 0; readTime <= 60000;) {
            if (readTime <= 30000) {
                swipe(readX, readH1, readX, readH2 - 200, 1000);
                goSleep(5);
                log("滑动次数+1");
                readTime += 6000;
            }
            else {
                swipe(readX, readH2 + 200, readX, readH1, 1000);
                goSleep(5);
                log("滑动次数+1");
                readTime += 6000;
            }
        }// 滑动文章
        goSleep(3);
        if (readnot == 3) {
            className("android.widget.TextView").text("欢迎发表你的观点").findOne().click();
            className("android.widget.EditText").findOne().click();
            setText(commenttext[readCommentRandom]);
            goSleep(1);
            className("android.widget.TextView").text("发布").findOne().click()
            goSleep(2);
            click("删除");
            goSleep(1);
            click("确认");
            log("评论成功");
        }
        else if (readnot == 1&&readnot ==5) {
            className("ImageView").drawingOrder(4).findOnce().click(); // 点击分享按钮
            goSleep(1);
            click("分享到学习强国");
            goSleep(1);
            click("创建新的聊天");
            goSleep(1);
            click("好友");
            goSleep(2);
            back();
            goSleep(1);
            back();
            goSleep(1);
            back();
            // 分享
        }
        goSleep(2);
        readnot += 1;
        log("已经阅读完" + readnot + "次");
        back();
        goSleep(3);
        className("ListView").scrollForward(); // 翻页
        goSleep(3)
    }
}
function video() {
    click("百灵");
    goSleep(10);
    className("android.widget.FrameLayout").depth(24).focusable(false).indexInParent(0).click();
    goSleep(2)
    while(true){
        if(className("android.widget.ImageView").depth(17).focusable(false).indexInParent(0).exists()){
            log("点击成功");
            break;
        }
        else {
            back();
            goSleep(2);
            className("android.widget.FrameLayout").depth(24).focusable(false).indexInParent(0).click();
            goSleep(2);
        }
    }
    goSleep(2)
    if(click("继续播放")){
        log("已用流量开始播放视频")
    }
    goSleep(600);//等待10min
    back();
}
function thinkIsInHomepage(){
    goSleep(5);
    if(id("home_bottom_tab_icon_large").exists()){
        console.log("在主页");
    }
    else {
        back();
        back();
        back();
        back();
        goSleep(2)
        starStudy();
    }
}
function dayAnswer() {
    click("我的");
    goSleep(1);
    click("学习积分");
    goSleep(1);
    swipe(300, 800, 300, 400, 500);
    goSleep(1);
    click("去答题");
}
function toTubscribe(subscribeoption) {
    click("订阅");
    goSleep(1);
    click("添加");
    goSleep(2);
    if (subscribeoption == 0) {
        subscribeoption = "推荐";
    }
    else if (subscribeoption == 1) {
        subscribeoption = "上新";
    }
    else if (subscribeoption == 2) {
        subscribeoption = "主要央媒";
    }
    else if (subscribeoption == 3) {
        subscribeoption = "行业媒体";
    }
    else if (subscribeoption == 4) {
        subscribeoption = "机关企事业单位";
    }
    else if (subscribeoption == 5) {
        subscribeoption = "高校";
    }
    else if (subscribeoption == 6) {
        subscribeoption = "地方媒体";
    }
    else if (subscribeoption == 7) {
        subscribeoption = "社会机构";
    }
    else {
        subscribeoption = "推荐";
    }
    log("用户建议通过" + subscribeoption + "来订阅")
    className("android.view.View").desc(subscribeoption).findOne().click()
    goSleep(2);
    for (let tubscrtibe = 0; tubscrtibe < 2;) {
        let notSubscribeNum = 0;
        if (className("android.view.View").depth(16).exists()) {
            className("android.view.View").depth(16).click();
        }
        else {
            back();
        }
        goSleep(3);
        if (className("android.widget.ImageView").desc("订阅").exists()) {
            goSleep(2);
            click("订阅");
            log("订阅成功");
            goSleep(2);
            back();
            goSleep(2);
            tubscrtibe += 1;
        }
        else {
            notSubscribeNum += 1;
        }
        goSleep(2)
        if (className("android.widget.Button").exists()) {
            console.log("在订阅页");
        }
        else {
            console.log("返回");
            var a = back();
        }
        goSleep(2)
        if(click("添加")){
            log("点击添加")
        };
        goSleep(2);
        swipe(600, 900, 600, 617, 500);
        goSleep(2);
        let subscribeDesc = ["推荐","上新","主要央媒","行业媒体","机关企事业单位","高校","地方媒体","社会机构"];
        let subscribeDescRandom = random(0,subscribeDesc.length-1);
        if(className("android.view.View").depth(15).indexInParent(10).exists()){
            if(className("android.view.View").depth(15).indexInParent(10).exists()){
                className("android.view.View").desc(subscribeDesc[subscribeDescRandom]).findOne().click();
                goSleep(3);
            }
            
        }
        if(notSubscribeNum == 20){
            toast("没有找到合适的订阅号，请稍后任务完成自行订阅");
            break;
        }
    }
    back();
}

function toLocation() {
    click("北京");
    goSleep(1)
    click("北京学习平台");
    goSleep(3);
    back();
}


function doubleFight() {
    click("我的");
    goSleep(2);
    click("我要答题")
    goSleep(2);
    className("android.view.View").depth(22).indexInParent(9).click(); // 双人对战
    goSleep(2);
    className("android.view.View").text("").findOne().click();
    goSleep(2)
    if(className("android.widget.Button").exists()){
        click("知道了");
        goSleep(2);
        className("android.view.View").text("").findOne().click();
    }
    goSleep(15)
    for (let runNum = 0; runNum < 1;) {
        let listArray = className("ListView").findOnce().children();//题目选项列表
        let i = random(0, listArray.length - 1);
        log("随机点击");
        listArray[i].child(0).click();//随意点击一个答案
        goSleep(5);
        if (className("android.view.View").text("  继续加油！").exists()) {
            runNum += 1;
            log("继续加油");
            goSleep(1);
        }
        else if (className("android.view.View").text("  获得胜利！").exists()) {
            runNum += 1;
            log("获得胜利");
            goSleep(1);
        }
    }
    goSleep(2);
    back();
    goSleep(2);
    className("android.view.View").text("").findOne().click()
    goSleep(2);
    while(true){
        if(className("android.widget.Button").text("退出").exists){
            className("android.widget.Button").text("退出").findOne().click();
            break;
        }
        else {
            className("android.view.View").text("").findOne().click()
        }
    }
    goSleep(2)
    back();
    goSleep(2);
    back();
}
function runHigh() {
    click("我的");
    goSleep(2);
    click("我要答题")
    goSleep(2);
    className("android.view.View").depth(22).indexInParent(8).click(); // 四人赛
    goSleep(2);
    if(className("android.widget.Button").exists()){
        click("知道了");
        goSleep(2);
        click("开始比赛");
    }
    goSleep(2);
    click("开始比赛")
    goSleep(15);
    for (let runNum = 0; runNum < 2;) {
        let think = true;
        while (think) {
            let listArray = className("ListView").findOnce().children();//题目选项列表
            let i = random(0, listArray.length - 1);
            log("随机点击");
            listArray[i].child(0).click();//随意点击一个答案
            goSleep(5);
            if (className("android.view.View").text("  继续加油！").exists()) {
                runNum += 1;
                log("继续加油");
                goSleep(2);
                think = false;
            }
            else if (className("android.view.View").text("  获得胜利！").exists()) {
                runNum += 1;
                log("获得胜利");
                goSleep(2);
                think = false;
            }
        }
        if (runNum == 1) {
            think = true;
            click("继续挑战");
            log("第二轮");
            goSleep(10);
            click("开始比赛");
            goSleep(15);
        }
    }
    goSleep(2)
    back();
    goSleep(2);
    back();
    goSleep(2);
    back();
    goSleep(2);
    back();
}
function goChallenge() {
    click("我的");
    goSleep(2);
    click("我要答题")
    goSleep(2);
    className("android.view.View").depth(22).indexInParent(10).click(); // 挑战答题
    goSleep(5);
    for (let challengeNum = 0; challengeNum < 10; challengeNum++) {
        // 挑战答题搜索答案
        var questions = className("ListView").findOnce().parent().child(0).text();
        var re = new RegExp("[\u4E00-\u9FA5]{2,5}");
        var question = questions.match(re);
        var url = 'http://www.syiban.com/search/index/init.html?modelid=1&q=' + question;
        var res = http.get(url);
        var html = res.body.string();
        var re2 = new RegExp(';">答案：.*</span>');
        var answer = html.match(re2);
        var re3 = new RegExp("[A-Z]");
        var answer2 = answer[0].match(re3);
        let option = 0
        if (answer2 == "B") {
            option = 1;
        }
        else if (answer2 == "C") {
            option = 2;
        }
        else if (answer2 == "D") {
            option = 3;
        }
        if (challengeNum > 6) {
            option = 1;
        }
        let listArray = className("ListView").findOnce().children();//题目选项列表
        listArray[option].child(0).click();//点击答案
        challengeNum + 1;
        goSleep(10);
        if (className("android.view.View").text("结束本局").exists()) {
            click("结束本局");
            goSleep(5);
            let challengeNiceText = String(className("android.view.View").depth(25).findOne().getText()); //获取本次答对xx
            let challengeNiceNumReRule = RegExp("10|[0-9]");
            let challengeNiceNum = challengeNiceText.match(challengeNiceNumReRule)[0] //匹配答对题数进行判断
            if (challengeNum > 5) {
                log("结束,答对" + challengeNum - 1 + "道题")
                back();
                goSleep(2);
                back();
                goSleep(2);
                back();
                goSleep(2);
                break;
            }
            else {
                log("重新开始,答对" + challengeNum - 1 + "道题")
                challengeNum = 0;
                log("重新开始");
                click("再来一局");
                goSleep(10);
            }
        }
    }
}
function main(op1, op2, op3, op4, op5, op6, op7, subscribeoption,readnum) {
    console.show();//开启提示
    if (!$floaty.checkPermission()) {
        // 没有悬浮窗权限，提示用户并跳转请求
        toast("本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。");
        $floaty.requestPermission();
        exit();
    } else {
        console.log('已有悬浮窗权限');
    }
    var bbh = http.get("https://zjzdmc.top/autojsbbh.txt");
    var bbhhtml = bbh.body.string();
    if (bbhhtml == "1.01") {
        console.log("现在是最新版" + bbhhtml);
    }
    else {
        console.log("版本错误,已停止运行");
        engines.stopAll();
    }
    advertisement()
    starStudy();
    if (op1) {
        read(readnum);
        log("已经完成文章选读");
        thinkIsInHomepage();
        goSleep(10);
    }
    if (op3) {
        doubleFight();
        log("已经完成双人对战");
        thinkIsInHomepage();
        goSleep(10);
    }
    if (op4) {
        runHigh();
        log("已经完成四人赛");
        thinkIsInHomepage();
        goSleep(10);
    }
    if (op5) {
        goChallenge();
        log("已经完成挑战答题");
        thinkIsInHomepage();
        goSleep(10);
    }
    if (op6) {
        toTubscribe(subscribeoption);
        log("已经完成订阅");
        thinkIsInHomepage();
        goSleep(10);
    }
    if (op7) {
        toLocation();
        log("已经完成本地频道");
        thinkIsInHomepage();
        goSleep(10);
    }
    if (op2) {
        video();
        log("已经完成视频播放");
        goSleep(10);
    }
    log("执行完成");
}
    //log(className("android.view.View").depth(23).indexInParent(1).findOne().getText())
