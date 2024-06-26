import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { AtSearchBar } from 'taro-ui'
import { AtTag } from 'taro-ui'
import './search.scss'
import '../../constants/common.scss'
import { Picker } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

export default function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [historyList, setHistoryList] = useState(historyListTemp)
  const historyListLen = historyList.length
  const hotListLen = hotList.length


  useLoad(() => {
    console.log('search loaded.')
  })

  const handleChange = (e) => {
    setSearchValue(e)
  }

  const handleClean = () => {
    setHistoryList([])
  }

  const handleClickTag = (value) => {
    console.log(value)
  }
  var state = {
    selector: [['a', 'b'], ['c', 'd']],
    selectorChecked: '美国',
    timeSel: '12:01',
    dateSel: '2018-04-22'
  }
  return (
    <View className='search-body flex column-center flex-column'>
      <View className='search-bar'>
        <AtSearchBar value={searchValue} onChange={handleChange} placeholder='请输入帖子内容' />
        <Picker mode='multiSelector' range={state.selector} >
          <AtList>
            <AtListItem
              title='筛选'
            // extraText={this.state.selectorChecked}
            />
          </AtList>
        </Picker>
        <View className='history-search-body' >
          <View className='at-row at-row__justify--between'>
            <Text className='search-title '>历史搜索</Text>
            <Text className='search-clean' onClick={handleClean}>清除</Text>
          </View>
          {/* {historyListLen !== 0
            ?
            <View className='history-search-item flex'>
              {historyList.map((item) => {
                // return <View key={item.value} className='history-item'>{item.label}</View>
                return <AtTag
                  className='history-item'
                  name={item.label}
                  type='primary'
                  circle
                  onClick={() => handleClickTag(item.value)}
                >
                  {item.label}
                </AtTag>
              })}
            </View>
            : '暂无搜索记录'} */}
        </View>
      </View>
      {/* <View className='hot-search margin-right-auto '>
        <View className='at-row at-row__justify--between'>
          <Text className='search-title'>热门搜索</Text>
        </View>
        {hotList.map((item) => {
          return <AtTag className='hot-search-item' onClick={() => handleClickTag(item.value)} key={item.value} name={item.label} >{item.label}
          </AtTag>
        })}
      </View> */}
    </View>
  )
}

const historyListTemp = [{
  value: '1',
  label: '运动'
}, {
  value: '2',
  label: '手表'
}, {
  value: '3',
  label: '蛋白粉'
}, {
  value: '4',
  label: '腰带'
}, {
  value: '5',
  label: '护腕'
}, {
  value: '5',
  label: '护腕'
}]


const hotList = [{
  value: '1',
  label: '肌酸'
}, {
  value: '2',
  label: '手表'
},
{
  value: '2',
  label: '手表'
},
{
  value: '2',
  label: '手表'
}]