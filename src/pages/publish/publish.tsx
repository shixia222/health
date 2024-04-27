import { View, Text, Button, Textarea, Input } from '@tarojs/components'
import { AtCard, AtMessage, AtRadio } from "taro-ui"
import { useState } from 'react'
import { userType } from '../user/type'
import Taro from '@tarojs/taro'
import moment from 'moment';
export default function Pubilsh() {
  const [user, setUser] = useState<userType>(Taro.getStorageSync('userInfo'))
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const [type, setType] = useState();

  const handleInputTitle = (e) => {
    setTitle(e.detail.value)
  }

  const handleInputContent = (e) => {
    setContent(e.detail.value)
  }

  const handleClickOption = (e) => {
    setType(e)
  }

  const handleClickChooseImg = () => {
    Taro.chooseMedia({
      count: 9,
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

  const handleClickPublish = () => {
    const time = moment(new Date()).format("YYYY/M/D HH:mm:ss");
    Taro.request({
      url: 'http://localhost:4000/api/post/addPost',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { user_id: Taro.getStorageSync('openid'), username: user.username, userHeader: Taro.getStorageSync('userHeader'), title, content, img: images, time, type },
    }).then(() => {
      Taro.atMessage({
        'message': '发布成功',
        'type': 'success',
      })
    }).catch((error) => {
      Taro.showToast({
        title: '网络错误！',
        icon: 'none',
      });
    });
  }

  return (
    <View className='pubilsh-body flex flex-column'>
      <AtCard
        title='新帖子'
      >
        <Text>标题：</Text>
        <Input value={title} auto-focus onInput={handleInputTitle} />
        <Text>内容：</Text>
        <Textarea value={content} auto-focus onInput={handleInputContent} />
        <AtRadio
          options={[
            { label: '训练', value: 'motion' },
            { label: '饮食', value: 'balance' },
          ]}
          value={type}
          onClick={handleClickOption}
        />
        <Button style={{ marginBottom: 40 + 'rpx' }} onClick={handleClickChooseImg}>选择图片</Button>
        <Button onClick={handleClickPublish}>发布</Button>
        <AtMessage />
      </AtCard>
    </View>
  )
}