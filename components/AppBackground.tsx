'use client'

import { useState } from 'react'
import Iridescence from './Iridescence'
import NightModeToggle from './NightModeToggle'

export default function AppBackground() {
    const [isNightMode, setIsNightMode] = useState(false)

    // 海洋蓝夜间模式颜色 - 深邃的海洋蓝调
    const nightColor: [number, number, number] = [0.1, 0.5, 0.8]
    // 保持原来的默认颜色
    const dayColor: [number, number, number] = [1, 1, 1]

    return (
        <>
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <Iridescence
                    color={isNightMode ? nightColor : dayColor}
                    mouseReact={true}
                    amplitude={0.15}
                    speed={0.5}
                />
            </div>

            <NightModeToggle onModeChange={setIsNightMode} />
        </>
    )
}