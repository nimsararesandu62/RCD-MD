const { smd, bot_ } = require("../lib");
let bgmm = false;

smd(
  {
    cmdname: "vv",
    alias: ["antivv"],
    desc: "turn On/Off auto viewOnce Downloader",
    fromMe: true,
    type: "user",
    use: "<on/off>",
    filename: __filename,
  },
  async (_0x5c3dd1, _0x543e4e) => {
    try {
      bgmm =
        (await bot_.findOne({
          id: "bot_" + _0x5c3dd1.user,
        })) ||
        (await bot_.new({
          id: "bot_" + _0x5c3dd1.user,
        }));

      // Define buttons
      let buttons = [
        { buttonId: 'enable', buttonText: { displayText: 'Enable AntiViewOnce' }, type: 1 },
        { buttonId: 'disable', buttonText: { displayText: 'Disable AntiViewOnce' }, type: 1 }
      ];

      let buttonMessage = {
        text: "Choose an option to enable/disable AntiViewOnce:",
        footer: "AntiViewOnce Control",
        buttons: buttons,
        headerType: 1
      };

      // Send the button message
      await _0x5c3dd1.sendMessage(_0x5c3dd1.from, buttonMessage);
    } catch (_0x4bb48d) {
      await _0x5c3dd1.error(
        _0x4bb48d + "\n\nCommand: AntiViewOnce ",
        _0x4bb48d
      );
    }
  }
);

smd(
  {
    on: "viewonce",
  },
  async (_0x4a4a25, _0x1400fa) => {
    try {
      if (!bgmm) {
        bgmm = await bot_.findOne({
          id: "bot_" + _0x4a4a25.user,
        });
      }
      if (bgmm && bgmm.antiviewonce && bgmm.antiviewonce === "true") {
        let _0x52bb9a = {
          key: {
            ..._0x4a4a25.key,
          },
          message: {
            conversation: "```[VIEWONCE DETECTED] downloading!```",
          },
        };
        let _0x58b72c = await _0x4a4a25.bot.downloadAndSaveMediaMessage(
          _0x4a4a25.msg
        );
        await _0x4a4a25.bot.sendMessage(
          _0x4a4a25.from,
          {
            [_0x4a4a25.mtype2.split("Message")[0]]: {
              url: _0x58b72c,
            },
            caption: _0x4a4a25.body,
          },
          {
            quoted: _0x52bb9a,
          }
        );
      }
    } catch (_0x6010c1) {
      console.log("error while getting antiviewOnce media\n, ", _0x6010c1);
    }
  }
);

// Button Response Handler
smd(
  {
    on: "button",
  },
  async (_0x5c3dd1) => {
    try {
      let _0x446f76 = _0x5c3dd1.buttonId.trim().toLowerCase();
      bgmm =
        (await bot_.findOne({
          id: "bot_" + _0x5c3dd1.user,
        })) ||
        (await bot_.new({
          id: "bot_" + _0x5c3dd1.user,
        }));

      if (_0x446f76 === "enable") {
        if (bgmm.antiviewonce === "true") {
          return await _0x5c3dd1.reply("*AntiViewOnce already enabled!*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x5c3dd1.user,
          },
          {
            antiviewonce: "true",
          }
        );
        return await _0x5c3dd1.reply("*AntiViewOnce successfully enabled*");
      } else if (_0x446f76 === "disable") {
        if (bgmm.antiviewonce === "false") {
          return await _0x5c3dd1.reply("*AntiViewOnce already disabled*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x5c3dd1.user,
          },
          {
            antiviewonce: "false",
          }
        );
        return await _0x5c3dd1.reply("*AntiViewOnce successfully disabled*");
      }
    } catch (_0x4bb48d) {
      await _0x5c3dd1.error(
        _0x4bb48d + "\n\nButton Response Error: AntiViewOnce",
        _0x4bb48d
      );
    }
  }
);
