import { View, Text } from '@tarojs/components'
import { useLoad, useRouter } from '@tarojs/taro'
import '../../constants/common.scss'
import './index.scss'
import { AtButton } from 'taro-ui'
import { AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtTag } from 'taro-ui'
import { useEffect, useState } from 'react'
import { indexPostType } from './type'
import { AtAvatar } from 'taro-ui'
import { binaryToImg } from '../../tools/tools'

export default function Index() {
  const [postDetailList, setPostDetailList] = useState<indexPostType[]>([])
  const [current, setCurrent] = useState()

  const imgLoad = (imgBinary, id) => {
    return binaryToImg(imgBinary, id)
  }

  const handleClickSearch = () => {
    Taro.navigateTo({
      url: '../../components/search/search'
    })
  }
  const handleClickCart = () => {
    Taro.navigateTo({
      url: '../../components/cart/cart'
    })
  }

  const handleClickPostDetailType = (value) => {
    console.log(value)
  }

  const handleClickPostDetail = (value) => {
    Taro.navigateTo({
      url: `./components/postDetail/postDetail?_id=${value}`
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Taro.request({
          url: 'http://localhost:4000/api/post/getList',
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          data: { curPage: 1, number: 10 },
        });
        const newData = await Promise.all(res.data.data.map(async (item) => {
          const userHeader = await imgLoad(item.userHeader, item.user_id);
          let indexImg = ''
          if (item.img.length !== 0) {
            indexImg = await imgLoad(item.img[0], item._id);
          }
          return { ...item, userHeader, indexImg };
        }));
        //@ts-ignore
        setPostDetailList(newData)
      } catch (error) {
        Taro.showToast({
          title: '没有帖子',
          icon: 'none',
        });
      }
    };
    fetchData();
  }, []);

  return (
    <View className='index-body flex flex-column' >
      <View className='search-bar flex column-center' onClick={handleClickSearch}>
        <View className='at-icon at-icon-search'></View>
        <Text>搜索</Text>
      </View>
      <AtNoticebar className='notice-bar' marquee>
        这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
      </AtNoticebar>
      <View className='postDetail-body'>
        <View className='top-bar'>
          <AtTag
            className='postDetail-bar'
            type='primary'
            circle
            onClick={() => handleClickPostDetailType(1)}
          >
            训练
          </AtTag>
          <AtTag
            className='postDetail-bar'
            type='primary'
            circle
            onClick={() => handleClickPostDetailType(2)}
          >
            饮食
          </AtTag>
        </View>
        <View className='postDetail-list'>
          {postDetailList?.map((item) => {
            return <View className='postDetail-item flex flex-column' key={item._id} onClick={() => handleClickPostDetail(item._id)}>
              <View className='postDetail-item-userInfo flex'>
                <View className='postDetail-item-userHeader'>
                  <AtAvatar image={item.userHeader} size='small' circle={true}></AtAvatar>
                </View>
                <View className='postDetail-item-info flex flex-column'>
                  <Text>{item.username}</Text>
                  <Text className='info-time'>{item.time}</Text>
                </View>
              </View>
              <View className='postDetail-item-content flex flex-column'>
                <View className='postDetail-item-title'>
                  <Text className='title'>{item.title}</Text>
                </View>
                <View className='postDetail-item-contentDetail'>
                  <Text className='content'>{item.content}</Text>
                </View>
                <image src={item.indexImg.toString()} />
              </View>
            </View>
          })}
        </View>
      </View>
    </View>
  )
}
