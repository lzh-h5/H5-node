const fs = require('fs')
const xlsx = require('node-xlsx') // 读写xlsx的插件
const path = require('path')
const config = require('../../config')
const utils = require('../../utils')

const upload = {
  i18nToJson: async (ctx, next) => {
    const file = ctx.request.files.file; // 获取上传文件 file是上传时的key
    const _name = file.newFilename
    const fileExistPath = path.resolve() + `\\${config.uploadFolder}` // 这个路径是绝对路径
    const absoluteFilePath = fileExistPath + '\\' + _name // 整个文件的绝对路径

    if (!file.originalFilename.endsWith('xls') && !file.originalFilename.endsWith('xlsx')) {
      utils.deleteFile(absoluteFilePath)
      return ctx.body = {
        code: 501,
        message: '请上传xls或xlsx格式的文件'
      }
    }
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(absoluteFilePath)) // 这种方式是解析buffer的
    utils.deleteFile(absoluteFilePath)

    const data = []
    for (let i = 0; i < workSheetsFromBuffer.length; i++) {
      const item = workSheetsFromBuffer[i]
      if (item.data.length) {
        const keys = item.data[0]
        if (keys.includes('English')) {
          item.data.map((item1, index) => {
            const _itemData = []
            if (index !== 0) {
              item1.map((item2, index1) => {
                _itemData.push({
                  language: keys[index1],
                  content: item2
                })
              })
              _itemData.length && data.push(_itemData)
            }
          })
        } else {
          return ctx.body = {
            code: 501,
            message: '表格格式有误！'
          }
        }
      }
    }
    ctx.body = data
  }
}

module.exports = upload