import React from 'react'

const Button = ({onClick, children, disabled, styles="", playAudio=false}) => {
  
  const sfx = new Audio("assets/audio/buttonclick.mp3");

  return (
    <div 
      className="inline-block"
    >
        <button 
            className={styles + `text-5xl bg-slate-950 text-white px-4
                                 py-1 border-[2px] border-yellow-200 m-4
                                 disabled:opacity-30 rounded-lg 
                                 ${disabled ? "" : "active:bg-slate-500 hover:bg-slate-800"}`}
            onClick={() => {
              onClick();

              if(playAudio){
                sfx.play();
              }
            }}
            disabled={disabled}
        >
            {children}
        </button>
    </div>
  )
}

export default Button