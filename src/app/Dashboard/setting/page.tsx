'use client'
import Card from '@/app/components/ui/card'
import React from 'react'

export default function page() {
  return (
    // eslint-disable-next-line react/no-children-prop
    <div><Card width={30} children={<img className='h-[100%] w-[100%]' src='/images/img_1730230385350.jpg'></img>}/></div>
  )
}
