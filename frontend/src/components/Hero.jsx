import React from 'react'

const Hero = ({ title, imageUrl }) => {
  return (
    <div className='hero container'>
      <div className='banner'>
        <h1>{title}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laboriosam! Numquam nulla impedit ipsa facilis minus itaque quibusdam libero ex deserunt perferendis, et architecto mollitia rerum magnam ea corporis dolor labore recusandae dolore. Nemo veritatis ipsum vitae rem sed sunt laborum? Facilis maxime temporibus omnis tempore odit itaque illum corrupti.</p>
      </div>
      <div className='banner'>
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero