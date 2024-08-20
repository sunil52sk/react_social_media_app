import React, { useContext } from 'react'
import { FaLaptop,FaTablet,FaMobile } from 'react-icons/fa6';
import DataContext from './context/DataContext';
const Header = ({title}) => {
  const {width}=useContext(DataContext);
  return (
    <header className='Header'>
      <h1>{title}</h1>
      {
        width<768?<FaMobile/>:width<992?<FaTablet/>:<FaLaptop/>
      }
    </header>
  )
}

export default Header