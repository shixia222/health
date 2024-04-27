export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/index/components/postDetail/postDetail',
    'pages/course/course',
    'pages/course/components/plan/plan',
    'pages/course/components/star/star',
    'pages/train/train',
    'pages/train/motion/motion',
    'pages/train/posture/posture',
    'pages/user/user',
    'pages/user/updates/updates',
    'pages/user/bodyData/bodyData',
    'pages/user/setting/setting',
    'pages/user/setting/components/introduce/introduce',
    'pages/user/setting/components/username/username',
    'pages/user/setting/components/city/city',
    'pages/user/setting/components/email/email',
    'pages/publish/publish',
    'components/search/search',
    'components/cart/cart',

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  },
  tabBar: {
    "color": "#666666",
    "selectedColor": "#FF5F15",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: "./resource/nav/home-off.png",
        selectedIconPath: "./resource/nav/home-on.png"
      },
      {
        pagePath: 'pages/course/course',
        text: '课程',
        iconPath: "./resource/nav/vip-off.png",
        selectedIconPath: "./resource/nav/vip-on.png"
      },
      {
        pagePath: 'pages/train/train',
        text: '训练',
        iconPath: "./resource/nav/quan-off.png",
        selectedIconPath: "./resource/nav/quan-on.png"
      },
      {
        pagePath: 'pages/publish/publish',
        text: '发布',
        iconPath: "./resource/nav/msg-off.png",
        selectedIconPath: "./resource/nav/msg-on.png"
      },
      {
        pagePath: 'pages/user/user',
        text: '我的',
        iconPath: "./resource/nav/my-off.png",
        selectedIconPath: "./resource/nav/my-on.png"
      },
    ],
  },
  "requiredPrivateInfos": [
    "getLocation",
    "onLocationChange",
    "startLocationUpdateBackground",
    "chooseAddress"
  ]
})
