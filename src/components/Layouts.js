import React,{useState} from 'react'
import { Container } from "react-bootstrap";
import AddEmailTemplate from "./AddEmailTemplate";
import Headers from "./Header";
   const Layouts=({children})=> {
    const [showSidebar] = useState(true);

  return (
    <>
      <Container>
      <Headers />
     
      {showSidebar && (
          
           <AddEmailTemplate />
        
        )}
        
     
    </Container>

    </>
  )
}
export default Layouts
