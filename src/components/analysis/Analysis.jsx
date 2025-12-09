import React from 'react'
import ResultData from './ResultData'
import Result from '../Result'
import Cocroach from './Cocroach'
import Container from '../layout/Container'




const Analysis = () => {
  return (
    <>
    <Container  py={0} px={1} h={"54vh"} noContainer={true}  classes={" "}>

    <div className={`h-100  w-100 `}>
        
          
         <ResultData />
         <Cocroach />
            
        
    </div>
    </Container>
    </>
  )
}

export default Analysis