import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
import Taro from '@tarojs/taro'

function App({ children }: PropsWithChildren<any>) {
  // 微信小程序id:wxf230d7e3077c44a1
  // 微信小程序密钥:0de19f143d5aa92d45ab7726caa6c2c0
  useLaunch(() => {
    Taro.login({
      success: async res => {
        if (res.code) {
          try {
            let URL = `https://api.weixin.qq.com/sns/jscode2session?appid=wxf230d7e3077c44a1&secret=0de19f143d5aa92d45ab7726caa6c2c0&js_code=${res.code}&grant_type=authorization_code`;
            const sessionRes = await Taro.request({ url: URL });
            const openid = sessionRes.data.openid;
            Taro.setStorageSync('openid', openid);

            // 获取用户信息
            Taro.getUserInfo({
              success: async userInfoRes => {
                const userInfo = userInfoRes.userInfo;
                const openid = Taro.getStorageSync('openid'); // 获取本地缓存中的 openid
                const data = {
                  openid: openid,
                  username: userInfo.nickName,
                  header: userInfo.avatarUrl,
                };

                // 发送用户信息到后端服务器
                try {
                  const userDetailsRes = await Taro.request({
                    url: 'http://localhost:4000/api/users/getDetails',
                    method: 'POST',
                    header: {
                      'Content-Type': 'application/json',
                    },
                    data,
                  });

                  if (userDetailsRes.data.length === 0) {
                    await Taro.request({
                      url: 'http://localhost:4000/api/users/addUser',
                      method: 'POST',
                      header: {
                        'Content-Type': 'application/json',
                      },
                      data,
                    });
                    console.log('创建成功');
                  }
                  Taro.getFileSystemManager().writeFile({
                    filePath: wx.env.USER_DATA_PATH + '/avatar.jpg',
                    data: userDetailsRes.data[0].header,
                    encoding: 'binary',
                    success: function (res) {
                      // 将临时文件路径赋值给图片组件的 src 属性，展示用户头像
                      Taro.setStorageSync('userInfo', { ...userDetailsRes.data[0], header: wx.env.USER_DATA_PATH + '/avatar.jpg' })
                    },
                    fail: function (error) {
                      console.error('Failed to write avatar file:', error);
                    }
                  });
                } catch (error) {
                  console.error(error);
                  Taro.showToast({
                    title: '网络错误！',
                    icon: 'none',
                  });
                }
              },
              fail: err => {
                console.error('获取用户信息失败', err);
              }
            });
          } catch (error) {
            console.error(error);
            Taro.showToast({
              title: '网络错误！',
              icon: 'none',
            });
          }
        }
      },
      fail: function (res) {
        console.log('登陆失败');
      }
    });

  })
  return children

  // children 是将要会渲染的页面
}

export default App
