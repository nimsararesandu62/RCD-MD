let ms = [];
let { stor, isGroup } = require("../lib");
smd(
  {
    on: "delete",
  },
  async (_0x52ff57, _0x12aaf9, { store: _0x33e289 }) => {
    try {
      let _0x2e7880 = await bot_.findOne({
        id: "bot_" + _0x52ff57.user,
      });
      if (
        _0x2e7880 &&
        _0x2e7880.antidelete &&
        _0x2e7880.antidelete === "true"
      ) {
        let _0x4a4a8f = _0x52ff57.msg.key.participant
          ? _0x52ff57.msg.key.participant
          : _0x52ff57.msg.key.fromMe
          ? _0x52ff57.user
          : _0x52ff57.msg.key.remoteJid;
        let _0x1ea1c0 = await stor();
        if (!_0x1ea1c0.messages[_0x52ff57.from]) {
          _0x1ea1c0.messages[_0x52ff57.from] = {};
        }
        ms = [
          ..._0x1ea1c0.messages[_0x52ff57.from],
          ..._0x33e289.messages[_0x52ff57.from].array,
        ];
        for (let _0x3597d4 = 0; _0x3597d4 < ms.length; _0x3597d4++) {
          if (ms[_0x3597d4].key.id === _0x52ff57.msg.key.id) {
            let _0x4d822f = await _0x52ff57.bot.fakeMessage(
              "text",
              {
                id: _0x52ff57.msg.key.id,
              },
              "*[ANTIDELETE DETECTED]*"
            );
            let _0x52c1e8 = await _0x52ff57.bot.forwardOrBroadCast(
              _0x4a4a8f, // Send to the number that deleted the message
              ms[_0x3597d4].message,
              {
                quoted:
                  ms[_0x3597d4].message && ms[_0x3597d4].message.conversation
                    ? undefined
                    : _0x4d822f,
              }
            );
            if (_0x52c1e8) {
              await _0x52ff57.bot.sendMessage(
                _0x4a4a8f, // Send details to the number that deleted the message
                {
                  text:
                    "*[DELETED INFORMATION]*\n\n*TIME:* " +
                    _0x52ff57.time +
                    "\n*CHAT:* " +
                    (await _0x52ff57.bot.getName(_0x52ff57.chat))
                      .split("\n")
                      .join("  ") +
                    "\n*DELETED BY:* @" +
                    _0x52ff57.senderNum +
                    "\n*MESSAGE FROM:* @" +
                    _0x4a4a8f.split("@")[0],
                  mentions: [_0x4a4a8f, _0x52ff57.sender],
                },
                {
                  quoted: _0x52c1e8,
                }
              );
            }
            break;
          }
        }
      }
    } catch (_0x307ba0) {
      console.log(_0x307ba0);
    }
  }
);
