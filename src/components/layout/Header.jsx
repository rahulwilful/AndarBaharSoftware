import React from 'react'
import Container from './Container'

const Header = ({children ,max,min,heading}) => {
  return (
    <>
    <Container px={0} py={0}  h={"6vh"} >

    <div className=' py-2 shadow-lg w-100 px-3 d-flex h-100 justify-content-between align-items-center bg-primary'>
        <div className=''>min - 500</div>
        <div className=''>max- 5000</div>
    </div>
    </Container>
    </>
  )
}

export default Header