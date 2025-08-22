'use client'

import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'

const audioTracks = [
  { name: '432 Hz', file: '/audio/432.m4a', description: '自然和谐频率' },
  { name: '528 Hz', file: '/audio/528.m4a', description: '爱的频率' },
  { name: '852 Hz', file: '/audio/852.m4a', description: '直觉与觉醒' }
]

export default function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
    }
  }, [volume])

  // 自动播放第一首音乐
  useEffect(() => {
    if (audioRef.current && currentTrack !== null) {
      audioRef.current.src = audioTracks[currentTrack].file
      audioRef.current.loop = true // 确保循环播放
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        // 如果自动播放失败（浏览器政策），用户需要手动点击
        setIsPlaying(false)
      })
    }
  }, [])

  const playTrack = (trackIndex: number) => {
    if (currentTrack === trackIndex && isPlaying) {
      // 如果点击的是当前播放的音轨，则暂停
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      // 播放新音轨
      setCurrentTrack(trackIndex)
      if (audioRef.current) {
        audioRef.current.src = audioTracks[trackIndex].file
        audioRef.current.loop = true // 确保循环播放
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const stopAudio = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
    setCurrentTrack(null)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
    }
  }

  return (
    <>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
      <div className="fixed bottom-4 right-4 z-50">
        {/* 音频元素 */}
        <audio ref={audioRef} />
        
        {/* 主控制按钮 */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 shadow-lg hover:bg-white/20 transition-all duration-300"
        >
          <Music className="w-6 h-6 text-white" />
        </button>

      {/* 控制面板 */}
      {showControls && (
        <div className="absolute bottom-16 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-lg p-4 shadow-xl min-w-[280px]">
          <div className="space-y-3">
            <h3 className="text-white font-medium text-sm">背景音乐</h3>
            
            {/* 音轨选择 */}
            <div className="space-y-2">
              {audioTracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => playTrack(index)}
                  className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                    currentTrack === index && isPlaying
                      ? 'bg-blue-600/80 border border-blue-400 shadow-md'
                      : 'bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50'
                  }`}
                >
                  <div className="text-white text-sm font-medium">{track.name}</div>
                  <div className="text-gray-300 text-xs">{track.description}</div>
                </button>
              ))}
            </div>

            {/* 控制按钮 */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
              <button
                onClick={stopAudio}
                className="bg-red-600/80 hover:bg-red-500/80 text-white text-sm px-3 py-1 rounded-md transition-colors"
              >
                静音
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-gray-300 hover:text-white transition-colors p-1"
                >
                  {audioRef.current?.muted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}