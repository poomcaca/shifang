'use client'

import React, { useState } from 'react'
import Iridescence from '@/components/Iridescence'

export default function TestPage() {
  const [text, setText] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const handleButtonClick = () => {
    console.log('Button clicked!')
    alert('按钮被点击了！')
    setShowMessage(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    console.log('Input changed:', e.target.value)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">测试页面</h1>
        
        <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
          <Iridescence
            color={[1, 0.5, 0.8]}
            mouseReact={true}
            amplitude={0.1}
            speed={1.0}
          />
        </div>
        
        <textarea
          value={text}
          onChange={handleInputChange}
          placeholder="输入一些文字..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg"
        />
        
        <button
          onClick={handleButtonClick}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          测试按钮
        </button>
        
        {showMessage && (
          <p className="text-green-600 text-center">按钮工作正常！</p>
        )}
        
        <p className="text-gray-600">输入的文字: {text}</p>
      </div>
    </div>
  )
} 