# dingtalk-simple-robot

This is a dingtalk-rootbot simple sdk;
Mainly used to send messages through webhook


# Usage

```js
const DingTalkSimpleRobot = require('DingTalkSimpleRobot');
const robot = new DingTalkSimpleRobot(DingTalkSimpleRobot.SUPPORT_SAFE_TYPE.SECRET, {
  secret: 'xxx',
  Webhook: 'xxx',
})

const textMsg = new DingTalkSimpleRobot.Text('哈哈哈哈');
robot.send(textMsg);

```