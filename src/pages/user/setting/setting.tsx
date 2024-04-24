import { View, Text, Input } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../constants/common.scss'
import './setting.scss'
import { AtButton } from 'taro-ui'
import { AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtTag } from 'taro-ui'
import { useEffect, useState } from 'react'
import { AtAvatar } from 'taro-ui'
import { AtList, AtListItem } from "taro-ui"
import { userType } from '../type'
import { AtForm, AtInput } from 'taro-ui'
import { Picker } from '@tarojs/components'
import { AtIndexes } from 'taro-ui'
import { gender } from './constant'

export default function Setting() {
  const [user, setUser] = useState<userType>(Taro.getStorageSync('userInfo'))

  const handleClickTo = (url) => {
    // 使用 Taro.navigateTo() 导航到带参数的 URL
    Taro.navigateTo({
      url: `./${url}`
    });
  };

  const onDateChange = (e) => {
    let age = e.detail.value
    userModify('age', age)
  }

  const onGenderChange = (e) => {
    let gender = e.detail.value == '0' ? '男' : '女'
    userModify('gender', gender)
  }

  useEffect(() => {
    //完成对用户数据的获取
    setUser(Taro.getStorageSync('userInfo'))
  }, [])

  const userModify = (parm, value) => {
    Taro.request({
      url: 'http://localhost:4000/api/users/updateUser',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { ...user, [parm]: value },
    }).then(() => {
      Taro.setStorageSync('userInfo', { ...user, [parm]: value })
    }).catch((error) => {
      Taro.showToast({
        title: '网络错误！',
        icon: 'none',
      });
    });
  }

  const handleClickAvatar = () => {
    Taro.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 获取选择的媒体文件临时文件路径
        var tempFilePath = res.tempFiles[0].tempFilePath;
        // 使用读取文件的方法将文件转换为二进制数据
        Taro.getFileSystemManager().readFile({
          filePath: tempFilePath,
          encoding: 'binary',
          success: function (res) {
            Taro.getFileSystemManager().writeFile({
              filePath: wx.env.USER_DATA_PATH + '/avatar.jpg',
              data: res.data,
              encoding: 'binary',
              success: function (res) {
                // 将临时文件路径赋值给图片组件的 src 属性，展示用户头像
                Taro.setStorageSync('userInfo', { ...user, header: wx.env.USER_DATA_PATH + '/avatar.jpg' })
              },
              fail: function (error) {
                console.error('Failed to write avatar file:', error);
              }
            });
            // 在这里可以将二进制数据发送到服务器等操作
            Taro.request({
              url: 'http://localhost:4000/api/users/updateUser',
              method: 'POST',
              data: {
                ...user,
                header: res.data // 二进制数据
              },
              success: function (response) {
                console.log('Avatar uploaded successfully');
              },
              fail: function (error) {
                console.error('Failed to upload avatar:', error);
              }
            });
          },
          fail: function (res) {
            // 读取文件失败
            console.error('Failed to read file:', res.errMsg);
          }
        });
      },
      fail: function (res) {
        // 选择媒体文件失败
        console.error('Failed to choose media:', res.errMsg);
      }
    });
  }

  return (
    <View className='setting-body flex flex-column'>
      <AtList>
        <AtListItem className='user-choice-item' title='头像' arrow='right' onClick={handleClickAvatar} />
        <AtListItem className='user-choice-item' title='昵称' extraText={user.username} arrow='right' onClick={() => handleClickTo('components/username/username')} />
        <AtListItem className='user-choice-item' title='所在城市' extraText={user.city} arrow='right' onClick={() => handleClickTo('components/city/city')} />
        <AtListItem className='user-choice-item' title='简介' extraText={user.introduce} arrow='right' onClick={() => handleClickTo('components/introduce/introduce')} />
        <View className='page-section'>
          <View>
            <Picker mode='selector' range={gender} onChange={onGenderChange} >
              <AtList>
                <AtListItem title='性别' extraText={user.gender} />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className='page-section'>
          <View>
            <Picker mode='date' onChange={onDateChange}>
              <AtList>
                <AtListItem title='出生日期' extraText={user.age} />
              </AtList>
            </Picker>
          </View>
        </View>
        <AtListItem className='user-choice-item' title='手机号' extraText={user.mobile} />
        <AtListItem className='user-choice-item' title='邮箱' extraText={user.email} arrow='right' onClick={() => handleClickTo('components/email/email')} />
      </AtList>
    </View>
  )
}