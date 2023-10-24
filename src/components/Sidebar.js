import React from 'react'

const Sidebar = ({children, isLeft, styles=""}) => {

    const style = `shadow-2xl shadow-black h-full w-[150px] flex flex-col bg-slate-950 ${isLeft ? "border-r-[2px]" : "border-l-[2px]"} border-white items-center ` + styles;

  return (
    <div className={style}>
        {children}
    </div>
  )
}

export default Sidebar