import { View, Button, Text, Radio } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import CartItem from './cartItem/cartItem'
import { AtDivider } from 'taro-ui'
import { useEffect, useState } from 'react'
import { CheckboxGroup, Checkbox } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { AtTag } from 'taro-ui'
import './cart.scss'
import '../../constants/common.scss'
export default function Cart() {
  const [checkedList, setCheckedList] = useState([])
  const [management, setManagement] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [allPrice, seetAllPrice] = useState(0)
  const itemLen = list.length

  const handleChangeCheck = (value) => {
    //选中多少
    console.log(value.detail)
    setCheckedList(value.detail)
  }

  const handleManagement = () => {
    //打开购物车删除按钮
    setManagement(!management)
  }

  const handleDeleteItem = (item) => {
    //刪除购物车
    console.log(item)
  }

  const handleSelectAll = () => {
    // if (checkedList.length == 0) {

    // }
    setSelectAll(!setSelectAll)
  }

  const handleNumChange = () => {
  }


  // useEffect(() => {

  // }, [checkedList])

  return (
    <View className='cart-body flex column-center flex-column'>
      <View className='management-body flex column-center'>
        <View className='at-icon at-icon-bullet-list'></View>
        <AtButton type='primary' size='small' onClick={handleManagement}>管理</AtButton>
      </View>
      <View className='cart-list flex'>
        <CheckboxGroup className='cart-checkbox-group flex flex-column' value={checkedList} onChange={handleChangeCheck}>
          {list.map((item) => {
            return (<View className='flex column-center'>
              <Checkbox
                key={item.id} //后续换成编号
                value={item.id}
              >
              </Checkbox>
              <CartItem item={item} onChange={handleNumChange}></CartItem>
              {management && <Button className='delete ' type="warn" onClick={() => handleDeleteItem(item)}>刪除</Button>}
            </View>)
          })}
        </CheckboxGroup>
      </View>
      <View className='cart-tabBar'>
        <AtDivider className='max-width' />
        <View className='at-row'>
          <View className='at-col at-col-2 at-col__offset-1 flex column-center'>
            <Checkbox value="all" checked={selectAll} onClick={handleSelectAll} />全选
          </View>
          <View className='at-col at-col-2 at-col__offset-3 flex column-center'>
            <AtTag disabled={true} size='normal'>总价:{ }</AtTag>
          </View>
          <View className='at-col at-col-2 at-col__offset-1 '>
            <AtButton type='primary' size='normal'>结算</AtButton>
          </View>
        </View>
      </View>
    </View>
  )
}

const list = [{
  id: '1',
  name: '运动手表',
  price: 200,
  num: 2,
  property: '运功装备',
  url: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
},
{
  id: '2',
  name: '肌酸',
  price: 20,
  num: 1,
  property: '运功补剂',
  url: "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png",
},
{
  id: '3',
  name: '衣服',
  price: 300,
  num: 1,
  property: '生活用品',
  url: "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png",
}]