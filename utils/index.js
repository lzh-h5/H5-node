const fs = require("fs")
const path = require("path")

const utils = {
  // 错误JSON
  resultErrorJson: (code = 501, message = "失败", data = {}) => {
    return {
      code: code,
      data: data,
      message: message
    }
  },
  // 成功JSON
  resultSuccessJson: (code = 0, message = "成功", data = {}) => {
    return {
      code: code,
      data: data,
      message: message
    }
  },
  // 切割文件后缀名
  splitFileName: (text) => {
    let index = text.lastIndexOf(".");
    return {
      name: text.substring(0, index),
      suffix: text.substring(index + 1)
    };
  },
  // 递归创建目录
  mkdirsSync: (dirname) => {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (utils.mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  },
  deleteFile: (path) => {
    fs.unlink(path, err => {
    })
  }
};
module.exports = utils
