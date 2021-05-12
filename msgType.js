class AtMsgBase {
  static atMobiles(atConfig = {}, mobiles) {
    atConfig.atMobiles = mobiles;
  }

  static appendMobiles(atConfig = {}, mobiles) {
    if (mobiles.forEach) {
      if (!atConfig.atMobiles) {
        atConfig.atMobiles = [];
      }
      atConfig.atMobiles.push(...mobiles);
    }
  }

  static atAll(atConfig = {}, isAtAll = true) {
    atConfig.isAtAll = isAtAll;
  }
}

class BaseMsg {
  getMsg() {
    throw new Error("未实现的方法");
  };
}

class TextMsg extends BaseMsg {
  constructor(text) {
    super();
    this.msg = {
      msgtype: "text",
      text: {
        content: text,
      },
      at: {
        atMobiles: [],
        isAtAll: false,
      },
    };
  }

  setText(text) {
    this.msg.text = text;
  }

  getMsg() {
    return this.msg;
  };
}

class LinkMsg extends BaseMsg {
  constructor({ text, title, picUrl, messageUrl }) {
    super();
    this.msg = {
      msgtype: "link",
      link: {
        text,
        title,
        picUrl,
        messageUrl,
      },
    };
  }

  getMsg() {
    return this.msg;
  };
}

class MarkdownMsg extends BaseMsg {
  constructor({ title, text }) {
    super();
    this.msg = {
      msgtype: "markdown",
      markdown: {
        title: title,
        text: text,
      },
      at: {
        atMobiles: [],
        isAtAll: false,
      },
    };
  }

  getMsg() {
    return this.msg;
  };
}

const supportAtMsgType = [TextMsg, MarkdownMsg];

supportAtMsgType.forEach(Klass => {
  const atMsgBaseSupportFn = ['atMobiles', 'appendMobiles', 'atAll']

  atMsgBaseSupportFn.forEach(fn => {
    Klass.prototype[fn] = function(args) {
      AtMsgBase[fn](this.msg.at, args);
    }
  })
})

module.exports = {
  TextMsg,
  LinkMsg,
  MarkdownMsg,
};
