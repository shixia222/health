import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { useLoad, useRouter } from '@tarojs/taro'
import '../../../../constants/common.scss'
import './postDetail.scss'
import { AtButton } from 'taro-ui'
import { AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtTag, AtAvatar, AtMessage } from 'taro-ui'
import { useEffect, useState } from 'react'
import classnames from 'classnames'
import { indexPostType, ReplyType } from '../../type'
import { userType } from '../../../user/type'
import { binaryToImg } from '../../../../tools/tools'
import { AtInput, AtForm } from 'taro-ui'
import moment from 'moment';
import Reply from './reply/reply'
import { dataTool } from 'echarts'

export default function PostDetail() {
  const params = Taro.getCurrentInstance()?.router?.params;
  const _id = params?._id || null;
  const [post, setPost] = useState<indexPostType>({} as indexPostType);
  const [replyList, setReplyList] = useState<ReplyType[]>([])
  const [user, setUser] = useState<userType>(Taro.getStorageSync('userInfo'))
  const [replyContent, setReplyContent] = useState()
  const [replyCurPage, setReplyCurPage] = useState(1)
  const [replyNumber, setReplyNumber] = useState(10)
  const [replyTotal, setReplyTotal] = useState(0)
  const [like, setLike] = useState(false)

  const fetchData = async () => {
    try {
      const res = await Taro.request({
        url: 'http://localhost:4000/api/post/getDetails',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: { _id },
      });
      const newData = await Promise.all(res.data.map(async (item) => {
        // 处理用户头像
        const userHeader = await binaryToImg(item.userHeader, item.user_id);
        // 处理图片数组
        const newImg = await Promise.all(item.img.map(async (imgItem, index) => {
          // 处理单个图片
          return await binaryToImg(imgItem, `${item.user_id}${index}`);
        }));
        // 返回新的数据对象
        return { ...item, userHeader, img: newImg };
      }));
      //@ts-ignore
      setPost(newData[0])
    } catch (error) {
      Taro.showToast({
        title: '没有帖子',
        icon: 'none',
      });
    }
  };

  const fetchReplyData = async () => {
    try {
      const res = await Taro.request({
        url: 'http://localhost:4000/api/reply/getListById',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: { curPage: replyCurPage, number: replyNumber, post_id: _id },
      });
      setReplyTotal(res.data.total)
      setReplyList(res.data.data)
    } catch (error) {
      Taro.showToast({
        title: '没有帖子',
        icon: 'none',
      });
    }
  };

  const fetchLikeData = () => {
    Taro.request({
      url: 'http://localhost:4000/api/moment/getMomentByPostId',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { user_id: user.openid, post_id: _id },
      success: (res) => {
        if (res.data.length !== 0) {
          setLike(true)
        }
      }
    });
  }

  const inputReply = (e) => {
    setReplyContent(e)
  }

  const handleClickReply = () => {
    if (replyContent !== undefined) {
      Taro.request({
        url: 'http://localhost:4000/api/reply/addReply',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: { post_id: _id, user_id: user.openid, content: replyContent, time: moment(new Date()).format("YYYY/M/D HH:mm:ss") },
        success: (res) => {
          Taro.showToast({
            title: '发布成功',
          })
        }
      });
    }
  }

  const handleClickLike = () => {
    setLike(!like)
    if (!like) {
      Taro.request({
        url: 'http://localhost:4000/api/moment/getDetails',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          user_id: Taro.getStorageSync('openid')
        },
        success: (res) => {
          //分三种情况，一是没有则创建，二是有新添，三是删除
          console.log(res)
          if (res.data.length == 0) {
            Taro.request({
              url: 'http://localhost:4000/api/moment/addMoment',
              method: 'POST',
              header: {
                'Content-Type': 'application/json',
              },
              data: {
                user_id: user.openid,
                moment_content: {
                  post_id: _id,
                  post_title: post.title
                }
              },
            })
          } else {
            const likeMoment = [...res.data[0].moment_content, {
              post_id: _id,
              post_title: post.title
            }]
            Taro.request({
              url: 'http://localhost:4000/api/moment/updateMoment',
              method: 'POST',
              header: {
                'Content-Type': 'application/json',
              },
              data: {
                user_id: Taro.getStorageSync('openid'),
                moment_content: likeMoment
              },
            })
          }
        }
      });
    } else {
      Taro.request({
        url: 'http://localhost:4000/api/moment/deleteMomentByPostId',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          user_id: Taro.getStorageSync('openid'),
          post_id: _id
        },
      })
    }
  }

  useEffect(() => {
    fetchData().then(() => {
      fetchReplyData();
    });
    fetchLikeData()
  }, [])
  return (
    <View className='postDetail-body flex flex-column '>
      <View className='postDetail-item flex flex-column' onClick={() => { }}>
        <View className='postDetail-item-title'>
          <Text className='title'>{post.title}</Text>
        </View>
        <View className='postDetail-item-userInfo flex'>
          <View className='postDetail-item-userHeader'>
            <AtAvatar image={post.userHeader} size='small' circle={true}></AtAvatar>
          </View>
          <View className='postDetail-item-info flex flex-column column-center'>
            <Text>{post.username}</Text>
          </View>
        </View>
        <View className='postDetail-item-content flex flex-column'>
          <View className='postDetail-item-contentDetail'>
            <Text className='content'>{post.content}</Text>
          </View>
          <Swiper
            className='test-h'
            circular
            autoplay>
            {post.img?.map((item) => {
              return <SwiperItem>
                <Image src={item} />
              </SwiperItem>
            })}
          </Swiper>
        </View>
      </View>
      <Text className='info-time'>{post.time}</Text>
      {replyList?.length !== 0 && <Text className='reply'>评论</Text>}
      <View className='reply-list'>
        {replyList?.map((item) => {
          return <Reply {...item}></Reply>
        })}
      </View>
      <View className='post-tabBar at-row column-center' >
        <View className=' at-col-4 text-align'>
          <AtInput
            name=''
            placeholder='回复'
            type='text'
            value={replyContent}
            onChange={inputReply}
          />
        </View>
        <View className='at-col at-col-1 at-col__offset-1 flex flex-column column-center' >
          <AtButton type='primary' circle size="small" onClick={handleClickReply}>发布</AtButton>
        </View>
        <View className='like at-col at-col-1 at-col__offset-1 flex flex-column column-center' onClick={handleClickLike}>
          <View className={`at-icon ${like ? 'at-icon-heart-2 icon-fill' : 'at-icon-heart'}`}></View>
          <Text>点赞</Text>
        </View>
      </View>
    </View>
  )
}

