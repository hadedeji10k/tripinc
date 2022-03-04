import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Signup from '../components/SignUp';


const Home: React.FC = () => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const toggleIsOpen = (): void => {
        setIsOpen(!isOpen);
    }

  return (
        <>
            <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            <Navbar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            <Signup />
        </>
  )
}

export default Home