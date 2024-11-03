import React from 'react'
import VideoContent from '../components/Video Components/VideoContent'
import VideoHeader from '../components/Video Components/VideoHeader'

const Videos = () => {
  return (
    <div className='bg-black text-white min-h-screen flex flex-col items-center justify-center gap-8 bg-cover bg-center px-4 sm:px-8'>
    <VideoHeader />
    <VideoContent videoId="qL96iv_bfZo" /> 
    <VideoContent videoId="TNG2IKKNUDo" /> 
    <VideoContent videoId="LDsSFx2PFzw" /> 
  </div>
  )
}

export default Videos
