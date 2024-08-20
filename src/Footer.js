import React from 'react'

const Footer = () => {
  const date=new Date();
  date.setDate(0);
  return (
    <footer className='Footer'>
      <h1>Copyright Anigram &copy; {date.getFullYear()}</h1>
    </footer>
  )
}

export default Footer