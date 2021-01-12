
const crypto = require('crypto');//引入crypto模块
const utf8 = require('utf8');
const axios = require('axios');
const MsgTypes = require('./msgType.js');

class DingTalkSimpleRobot {
  constructor(type, options) {
    // 验证传入的必填参数
    this.validConfig(type, options);
    this.options = options;
    this.type = type;
    // 通过上面的参数计算。顺序不能乱
    this.requestUrl = this.getRequestUrl();
  }

  validConfig(type, options) {
    const vaildFieldsMap = {
      [DingTalkSimpleRobot.SUPPORT_SAFE_TYPE.SECRET]: ['secret', 'Webhook'],
    }

    const validHandler = (fields = [], options = {}) => {
      fields.forEach(fieldItem => {
        if(typeof options.fieldItem === undefined) {
          throw new Error(`${fieldItem} option must exist`);
        }
      })
    }

    if(vaildFieldsMap[type]) {
      validHandler(vaildFieldsMap[type], options);
    } else {
      throw new Error('Unsupported security setting type');
    }
  }

  calcSignUrl() {
    const timestamp = Date.now();
    const secret = this.options.secret;
    const secretEnc = utf8.encode(secret);
    const stringToSign = timestamp + "\n" + secret;
    const stringToSignEnc = utf8.encode(stringToSign);
    const sign = crypto.createHmac('SHA256', secretEnc).update(stringToSignEnc).digest("base64");
    const signEnc = encodeURIComponent(sign);
    const requestUrl = this.options.Webhook + `&timestamp=${timestamp}&sign=${signEnc}`;
    return requestUrl;
  }

  getRequestUrl() {
    if(this.type === DingTalkSimpleRobot.SUPPORT_SAFE_TYPE.SECRET) {
      return this.calcSignUrl();
    }
    return this.options.Webhook;
  }

  send(msgInstance) {
    const msgContent = msgInstance.getMsg();
    axios.post(this.requestUrl, msgContent);
  }
}

DingTalkSimpleRobot.Text = MsgTypes.TextMsg;
DingTalkSimpleRobot.Link = MsgTypes.LinkMsg;
DingTalkSimpleRobot.Markdown = MsgTypes.MarkdownMsg;

DingTalkSimpleRobot.SUPPORT_SAFE_TYPE = {
  SECRET: 'SECRET',
  KEYWORD: 'KEYWORD',
  IP: 'IP',
}

module.exports = DingTalkSimpleRobot;