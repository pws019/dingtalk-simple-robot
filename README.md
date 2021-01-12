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
const DingTalkSimpleRobot = require('DingTalkSimpleRobot');

// new DingTalkSimpleRobot(SafeMode, options);
// Safe Mode. Only support add secret, now;
const robot = new DingTalkSimpleRobot(DingTalkSimpleRobot.SUPPORT_SAFE_TYPE.SECRET, {
  secret: 'xxx',
  Webhook: 'xxx',
})

const textMsg = new DingTalkSimpleRobot.Text('哈哈哈哈');
robot.send(textMsg);


const markdownMsg = new DingTalkSimpleRobot.Markdown({
  "title":"杭州天气",
  "text": "#### 杭州天气 @150XXXXXXXX \n> 9度，西北风1级，空气良89，相对温度73%\n> ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n> ###### 10点20分发布 [天气](https://www.dingtalk.com) \n"
})
robot.send(markdownMsg);
```