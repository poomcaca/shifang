'use client'

import Iridescence from './Iridescence'
import NightModeToggle from './NightModeToggle'
import { useTheme } from '@/contexts/ThemeContext'

export default function AppBackground() {
    const { isNightMode, setIsNightMode } = useTheme()

    // 海洋蓝夜间模式颜色 - 深邃的海洋蓝调
    const nightColor: [number, number, number] = [0.15, 0.25, 0.4]
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