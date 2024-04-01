import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../constants/common.scss'
import './motion.scss'
import { AtButton } from 'taro-ui'
import { AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { useEffect, useMemo, useRef, useState } from 'react'
import Operate from './components/operate'

export default function Motion() {
  // const [latitude, setLatitude] = useState(0)
  // const [longitude, setLongitude] = useState(0)
  const params = Taro.getCurrentInstance()?.router?.params;
  const type = params?.type || null; // 区别不同的运动类型
  if (!type) {
    return <View>错误</View>
  }
  const operatePostion = wx.getSystemInfoSync().windowHeight - 80
  const [position, setPosition] = useState({ x: 0, y: operatePostion });
  const [startPosition, setStartPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetPositionY, setOffsetPositionY] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const offsetPositionYRef = useRef(0);
  // const location = wx.getLocation()


  // const mapRef = useRef(null);
  // useEffect(() => {
  //   getLocation();
  // }, []);

  // const getLocation = () => {
  //   Taro.getLocation({
  //     type: 'wgs84',
  //     success: (res) => {
  //       const latitude = res.latitude;
  //       const longitude = res.longitude;
  //       console.log('用户位置：', latitude, longitude);
  //       renderMap(latitude, longitude);
  //     }
  //   });
  // };
  // const renderMap = (latitude, longitude) => {
  //   const mapContext = Taro.createMapContext('map', mapRef.current);
  //   mapContext.moveToLocation({
  //     latitude,
  //     longitude
  //   });
  // };


  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartPosition(position)
    offsetPositionYRef.current = 0
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const newY = e.touches[0].clientY;
    if (offsetPositionYRef.current == 0) {
      setOffsetPositionY(e.touches[0].clientY - position.y)
      offsetPositionYRef.current = 1
    }
    setPosition({ x: 0, y: newY });


  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (position.y - startPosition.y < -200) {
      setPosition({ x: 0, y: 200 })
      setShowOverlay(true);
    } else if ((position.y - startPosition.y - offsetPositionY > 200) || position.y > operatePostion) {
      setPosition({ x: 0, y: operatePostion })
      setOffsetPositionY(0)
      setShowOverlay(false);
    } else {
      setPosition(startPosition)
    }

  };
  return (
    <View className='motion-body flex flex-column'>
      {/* <map id='map' style={{ width: '100%', height: '300px' }} /> */}
      <View className='motion-map'>地图</View>
      <View
        style={{
          position: 'fixed',
          left: 0,
          top: `${position.y <= 0 ? 0 : offsetPositionY <= 0 ? position.y + offsetPositionY : position.y - offsetPositionY}px`,
          width: '100%',
          height: '2000rpx',
          background: '#564C60',
          borderRadius: '50rpx',
          zIndex: 9999,
          touchAction: 'none', // 防止浏览器默认滚动行为
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!showOverlay ? <View className='motion-data flex'>
          <View className='motion-data-item'>公里</View>
          <View className='motion-data-item'>用时</View>
          <View className='motion-data-item'>配速</View>
        </View> : <Operate></Operate>}
      </View>
    </View>

  )
}
