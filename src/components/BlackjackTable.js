import React from 'react'

const BlackjackTable = ({children}) => {
  return (
    <div 
        className="h-[80%] bg-slate-950 w-[100%] sm:w-[40%] rounded-[75px] border-[2px]
                 border-yellow-200 py-10 shadow-lg shadow-black"
    >
        {children}
    </div>
  )
}

export default BlackjackTable