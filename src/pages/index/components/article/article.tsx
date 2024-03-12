import { View, Text } from '@tarojs/components'
import { useLoad, useRouter } from '@tarojs/taro'
import '../../../../constants/common.scss'
import './article.scss'
import { AtButton } from 'taro-ui'
import { AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtTag } from 'taro-ui'
import { useState } from 'react'
import classnames from 'classnames'
import { list } from 'postcss'

export default function Article() {

  const [article, setArticle] = useState(articleTemp)
  const [reply, setReply] = useState(replyTemp)
  const [like, setLike] = useState(false)
  const [star, setStar] = useState(false)

  const handleClickReply = () => {

  }

  const handleClickLike = () => {
    setLike(!like)
  }

  const handleClickStar = () => {
    setStar(!star)
  }

  return (
    <View className='article-body flex flex-column '>
      <input className='article-content'>   
        {article.content}
      </input>
      <View className='article-reply'>
        {reply.map((item) => {
          return <View className='reply-item border-solid'>
            {item.content}
          </View>
        })}
      </View>
      <View className='article-tabBar at-row column-center' onClick={handleClickReply}>
        <View className='reply at-col-6 text-align'>
          <Text>回复</Text>
        </View>
        <View className='like at-col at-col-1 at-col__offset-1 flex flex-column column-center' onClick={handleClickLike}>
          <View className={`at-icon ${like ? 'at-icon-heart-2 icon-fill' : 'at-icon-heart'}`}></View>
          <Text>点赞</Text>
        </View>
        <View className='collect at-col flex flex-column column-center' onClick={handleClickStar}>
          <View className={`at-icon ${star ? 'at-icon-star-2 icon-fill' : 'at-icon-star'}` }></View>
          <Text>收藏</Text>
        </View>
      </View>
    </View>
  )
}

const articleTemp = {
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷、文章不写一字空”“积句而成章，积章而成篇”“言出为论，下笔成章”等，都是现在所说的文章的意思。更广义的文章，也包含“学问”“奥秘”等意思，如“洞明世事皆学问，人情练达即文章”就是。",
  value: 1
}

const replyTemp = [{
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷",
  value: 1
}, {
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷。",
  value: 2
}, {
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷。",
  value: 2
}, {
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷。",
  value: 2
}, {
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷。",
  value: 2
}, {
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷。",
  value: 2
}]