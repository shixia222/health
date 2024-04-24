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
import { useState } from 'react'
export default function Index() {
  const [articleList, setArticleList] = useState(article)
  const [current, setCurrent] = useState(article)
  useLoad(() => {
    console.log('Page loaded.')
  })

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

  const handleClickArticleType = (value) => {
    //更新新的社区文章内容
    console.log(value)
  }

  const handleClickArticle = (value) => {
    //跳转到社区文章详情
    Taro.navigateTo({
      url: './components/article/article'
    })
    console.log(value)
  }

  return (
    <View className='index-body flex flex-column'>
      <View className='search-bar flex column-center' onClick={handleClickSearch}>
        <View className='at-icon at-icon-search'></View>
        <Text>搜索</Text>
      </View>
      <AtNoticebar className='notice-bar' marquee>
        这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
      </AtNoticebar>
      <View className='article-body'>
        <View className='top-bar'>
          <AtTag
            className='article-bar'
            type='primary'
            circle
            onClick={() => handleClickArticleType(1)}
          >
            训练
          </AtTag>
          <AtTag
            className='article-bar'
            type='primary'
            circle
            onClick={() => handleClickArticleType(2)}
          >
            饮食
          </AtTag>
        </View>
        <View className='article-list'>
          {/* {articleList.map((item) => {
            return <View className='article-item' key={item.value} onClick={() => handleClickArticle(item.value)}>
              {item.content}
            </View>
          })} */}
        </View>
      </View>
      {/* <AtButton type='primary' onClick={handleClickCart}>跳转购物车</AtButton> */}
    </View>
  )
}

const article = [{
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷、文章不写一字空”“积句而成章，积章而成篇”“言出为论，下笔成章”等，都是现在所说的文章的意思。更广义的文章，也包含“学问”“奥秘”等意思，如“洞明世事皆学问，人情练达即文章”就是。",
  value: 1
}, {
  content: "“文章”的“章”字，是个会意字，从音从十。古代奏音乐，连奏十段才能结束（十，数之终也），这十段乐就是一章。所以，文章文章，也有段落。文章既从“音乐”里会意出来，应是用文字表达出来的东西，读起来如音乐一样美妙无穷、悦耳动听的文字，传诵开来，才配得上“文章”一词的真正含义。",
  value: 2
}]