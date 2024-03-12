export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/index/components/article/article',
    'pages/user/user',
    'pages/course/course',
    'pages/motion/motion',
    'pages/mall/mall',
    'components/search/search',
    'components/cart/cart',

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
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
        // iconPath: '/src/constants/images/home/home.png'
      },
      {
        pagePath: 'pages/course/course',
        text: '课程',
        // iconPath: '/src/constants/images/home/home.png'
      },
      {
        pagePath: 'pages/motion/motion',
        text: '训练',
        // iconPath: '/src/constants/images/home/home.png'
      },
      {
        pagePath: 'pages/mall/mall',
        text: '商城',
        // iconPath: './src/constants/images/user/user.png'
      },
      {
        pagePath: 'pages/user/user',
        text: '我的',
        // iconPath: './src/constants/images/user/user.png'
      },
    ],
  },
})
