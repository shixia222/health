import Taro from '@tarojs/taro'
import { useState } from 'react'

export const handleClickChooseImg = (imgNum) => {
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);
  Taro.chooseMedia({
    count: imgNum,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      // 获取选择的媒体文件临时文件路径
      res.tempFiles.forEach(tempFile => {
        wx.getFileSystemManager().readFile({
          filePath: tempFile.tempFilePath,
          encoding: 'binary',
          success: res => {
            setImages(prevImages => [...prevImages, res.data]);
          },
          fail: error => {
            console.error('Failed to read avatar file:', error);
          }
        });
      })
      // 使用读取文件的方法将文件转换为二进制数据

    },
    fail: function (res) {
      // 选择媒体文件失败
      console.error('Failed to choose media:', res.errMsg);
    }
  });
}