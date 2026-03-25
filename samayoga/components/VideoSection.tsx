'use client'

import { useState, useRef, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface VideoSectionProps {
  videoId: string
}

export function VideoSection({ videoId }: VideoSectionProps) {
  const [isMuted, setIsMuted] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Extract video ID from YouTube URL
  const getVideoId = useCallback((url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : url
  }, [])

  const embedId = getVideoId(videoId)
  
  // YouTube iframe parameters for autoplay, loop, muted
  const getEmbedUrl = useCallback((muted: boolean) => {
    return `https://www.youtube.com/embed/${embedId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${embedId}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`
  }, [embedId])

  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    
    // Update iframe src to change mute state
    if (iframeRef.current) {
      iframeRef.current.src = getEmbedUrl(newMutedState)
    }
  }, [isMuted, getEmbedUrl])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          key={embedId}
          src={getEmbedUrl(isMuted)}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}
          title="Yoga Practice Video"
          loading="lazy"
        />
      </div>
      
      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        type="button"
        className="absolute bottom-8 right-8 z-10 p-4 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 group"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-[#1A1A1A] group-hover:text-primary-600 transition-colors" aria-hidden="true" />
        ) : (
          <Volume2 className="w-6 h-6 text-[#1A1A1A] group-hover:text-primary-600 transition-colors" aria-hidden="true" />
        )}
      </button>
    </section>
  )
}
