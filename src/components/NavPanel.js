import React from 'react'
import Sidebar from './Sidebar'

const NavPanel = () => {
  return (
    <Sidebar isLeft={true} styles="gap-9">
        <img src="/assets/logo/spade.png" className="w-[50%] my-9"></img>
        <p className="text-white">Home</p>
        <p className="text-white">Rules</p>
        <p className="text-white">Deposit</p>
        <p className="text-white">About</p>
    </Sidebar>
  )
}

export default NavPanel