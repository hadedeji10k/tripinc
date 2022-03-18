import React from 'react'
import './Card.css'
import { IoIosArrowDown } from 'react-icons/io'
import { BsSuitHeartFill } from 'react-icons/bs'


const Card = ({ data }) => {

    // const newLocal = { review: 0, }

  return (
    <div className="card">
    {data.map(item => {
        return (<>
            <div className="card_container">
                <div className="image_container">
                    <img className="image" src={item.image.toString()} alt="" />
                </div>
                <div className="card_details">
                    <p className="card_title">{item.title}</p>
                    <p className="card_description">{item.description.slice(0, 100)}...</p>
                    <hr />
                    <div className="card_price_review">
                        <p className="price"> from {item.price}</p>

                        <p className="price"> {item.reviews?.length} reviews</p>
                        {/* <p className="price"> {item.reviews?.map((item) => {
                            newLocal.review += item.rating
                        })} {item.reviews?.length} reviews</p> */}
                    </div>
                </div>
                <div className="arrow">
                    <p className="arrow_tag"><IoIosArrowDown /></p>
                </div>
                <div className="heart">
                    <p className="heart_tag"><BsSuitHeartFill /></p>
                </div>
            </div>
        </>
        )
    })}
</div>
  )
}

export default Card