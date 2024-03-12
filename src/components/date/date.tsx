import { View, Text } from '@tarojs/components'
import './date.scss'
import { AtTag } from 'taro-ui'
import classnames from 'classnames';

export default function WeekdayTable() {
  const compareDays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const today = new Date();
  const todayIndex = compareDays.indexOf(today.toLocaleDateString('zh-CN', { weekday: 'long' }))
  console.log(todayIndex)
  return (
    <View className='date-box flex'>
      {days.map((day, index) => {
        return (
          <View className='flex flex-column'>
            <AtTag
              className={classnames({
                'date': true,
                'today-date': todayIndex === index
              })
              }
              key={day}
              type='primary'
              circle >
              {day}
              {/* <Plan>每天计划量组件</Plan> */}
            </AtTag>
            <View className='text-align'>
              圆圈
            </View>
          </View>
        )
      })}
    </View >
  )
}

