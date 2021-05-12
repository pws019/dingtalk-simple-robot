# dingtalk-simple-robot

This is a dingtalk-rootbot simple sdk;
Mainly used to send messages through webhook.
Please Use Node Env;

# Install
```shell
npm i dingtalk-simple-robot
```

# Usage

```js

const DingTalkSimpleRobot = require('dingtalk-simple-robot');

// new DingTalkSimpleRobot(SafeMode, options);
// Safe Mode. Only support add secret, now;
const robot = new DingTalkSimpleRobot(DingTalkSimpleRobot.SUPPORT_SAFE_TYPE.SECRET, {
  secret: 'xxx',
  Webhook: 'xxx',
})

const textMsg = new DingTalkSimpleRobot.Text('哈哈哈哈，艾特一个数组的人');
textMsg.atMobiles(['15212345678']);  // 覆盖要at的列表
// textMsg.appendMobiles(['15212345678']); // 追加要at的列表
// textMsg.atAll(); // at所有人
robot.send(textMsg);

const textMsg2 = new DingTalkSimpleRobot.Text('哈哈哈哈，艾特所有的人');
// textMsg2.atMobiles(['15212345678']);  // 覆盖要at的列表
// textMsg.appendMobiles(['15212345678']); // 追加要at的列表
textMsg2.atAll(); // at所有人
robot.send(textMsg2);

const markdownMsg = new DingTalkSimpleRobot.Markdown({
  "title":"杭州天气",
  "text": "#### 杭州天气 @15212345678 \n> 9度，西北风1级，空气良89，相对温度73%\n> ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n> ###### 10点20分发布 [天气](https://www.dingtalk.com) \n"
})
markdownMsg.appendMobiles(['15212345678']);
robot.send(markdownMsg);
```