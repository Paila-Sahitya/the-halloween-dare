import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [stage, setStage] = useState("intro");
  const [countdown, setCountdown] = useState(5);
  const bgAudioRef=useRef(null);

  useEffect(()=>{
    if(stage==="countdown" && countdown>0){
      const timer=setTimeout(()=>{
        setCountdown(prev=> prev-1);
      }, 1200)

      return ()=> {
        clearTimeout(timer);
      }
    }

    else if (stage==="countdown" && countdown===0){
      if(bgAudioRef.current){
        bgAudioRef.current.pause();
        bgAudioRef.current.currentTime=0;
      }
      setStage("scare");
    }

    else if(stage ==="scare"){
      const audio = new Audio("https://res.cloudinary.com/doyf1s3dr/video/upload/v1761981663/scream_ju91ck.mp3");
      audio.play();
      setTimeout(()=>{
        setStage("end");
      }, 4000);
    }
  }, [stage, countdown]);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-black text-white overflow-hidden text-2xl sm:text-3xl md:text-4xl">
      {stage ==="intro" && (
        <div className="z-20 flex flex-col items-center px-4">
          <button
            onClick={()=>{
              setStage("countdown");
              bgAudioRef.current=new Audio("https://res.cloudinary.com/doyf1s3dr/video/upload/v1761981664/creepy-ticking_oxlxsx.mp3");
              bgAudioRef.current.loop=true;
              bgAudioRef.current.volume=0.4;
              bgAudioRef.current.play().catch(()=>{});
            }}
            className="px-6 py-3 bg-red-700 rounded-lg hover:bg-red-900 transition text-lg sm:text-xl md:text-2xl shadow-lg"
          >
            Start if you dare...
          </button>
        </div>
      )}

      {stage==="countdown" && (
        <>
          <video
          src="https://res.cloudinary.com/doyf1s3dr/video/upload/v1761981665/creepy_b2a1cj.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="fixed top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out z-10"
          onCanPlayThrough={(e)=> e.currentTarget.style.opacity="0.7"}
          ></video>

          <h1 className="text-red-500 font-bold animate-pulse text-6xl sm:text-7xl md:text-8xl z-20 relative text-center drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
            {countdown}
          </h1>
        </>
      )}

      {stage==="scare" && (
        <video
          src="https://res.cloudinary.com/doyf1s3dr/video/upload/v1761981665/jumpscare_uopvx0.mp4"
          autoPlay
          playsInline
          preload="auto"
          className="fixed top-0 left-0 w-full h-full object-cover z-10 opacity-0 transition-opacity duration-500 ease-in-out"
          onCanPlayThrough={(e)=> e.currentTarget.style.opacity="1"}
        ></video>
      )}

      {stage ==="end" && 
        <div className="flex flex-col items-center text-center z-20">
          <h1 className="text-4xl text-orange-400 font-bold">You Survived!</h1>
          <p className="mt-4 text-2xl text-yellow-300">🎃 Happy Halloween 2025 👻 </p>
        </div>
      }
      
    </div>
  )
}

export default App
