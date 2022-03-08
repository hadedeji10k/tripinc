import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
// import Signup from '../components/SignUp';
// import Signin from '../components/SignIn';
// import BasicDetails from '../components/BasicDetails'
import Preferences from '../components/Preferences'


const Home: React.FC = () => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const toggleIsOpen = (): void => {
        setIsOpen(!isOpen);
    }

  return (
        <>
            <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            <Navbar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            {/* <Signup /> */}
            {/* <Signin /> */}
            {/* <BasicDetails /> */}
            <Preferences />
        </>
  )
}

export default Home