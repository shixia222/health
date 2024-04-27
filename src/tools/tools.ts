import Taro from '@tarojs/taro'
import { useState } from 'react'

export const binaryToImg = async (binaryUrl, id) => {
  try {
    const res = await new Promise((resolve, reject) => {
      Taro.getFileSystemManager().writeFile({
        filePath: wx.env.USER_DATA_PATH + '/avatar.jpg' + id,
        data: binaryUrl,
        encoding: 'binary',
        success: resolve,
        fail: reject
      });
    });
    return wx.env.USER_DATA_PATH + '/avatar.jpg' + id;
  } catch (error) {
    console.error('Failed to write avatar file:', error);
    throw error;
  }
}
