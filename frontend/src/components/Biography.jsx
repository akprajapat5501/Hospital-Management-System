import React from 'react'

const Biography = ({ imageUrl }) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil hic atque, harum enim dolorum provident. Vero dicta rem accusantium quaerat maiores aspernatur soluta vel at sapiente sint. Dignissimos magni, tempora facere necessitatibus alias eligendi sequi voluptate delectus vitae, tenetur inventore nesciunt optio in iure expedita laudantium eaque, deserunt adipisci possimus!</p>


        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit aperiam quam asperiores non illo obcaecati eos animi alias odio iste. Aliquid natus obcaecati officiis dignissimos unde totam quod in voluptate repudiandae, harum, neque, sequi sit earum. Facere tempora laborum eveniet?</p>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur blanditiis vero officiis cum sint magnam.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
    </div>
  )
}

export default Biography