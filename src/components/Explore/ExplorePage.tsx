import React, { useState } from 'react'
import './ExplorePage.css'
import { preferencedata } from '../../currentUserData'

import { IoIosArrowDown } from 'react-icons/io'
import { BsSuitHeartFill } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'

const ExplorePage = () => {

  const [preferenceData, setPreferenceData] = useState(preferencedata)

    // function to handle preference click
  const handlePreferencesClick = (e: any) => {
    e.preventDefault()
    // console.log(e.target.id)
    const id = e.target.id
    const index = preferenceData.findIndex(item => item.id === parseInt(id))
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass
    // preferenceData[index].class = preferenceData[index].stateOfClass ? 'clicked' : 'not-clicked'
    setPreferenceData([...preferenceData])
  }

  return (
    <div className="explore_page_container">
        <div className="explore_page_header">
            {/* <img className="explore_page_header_image" src="https://images.unsplash.com/photo-1596889157941-d2651f70a4f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvdXJpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" /> */}
            <div className="explore_page_header_text">
                <h3 className="explore_page_header_title">Explore Cities!</h3>
                <p className="explore_page_header_description">You can search cities you wish on this page using the search form.</p>
            </div>
        </div>
        <div className="explore_page_search_container">
            <div className="explore_page_search_form">
                <input className="explore_page_search_input" type="text" placeholder="Search for a city" />
                <input className="date_input" type="date" name="" id="" defaultValue="No dates"/>
                <select className="explorer_page_select" name="" id="">
                    <option value="">Solo trip</option>
                    <option value="">Family trip</option>
                    <option value="">Friend trip</option>
                </select>
                <button className="explore_page_search_button">
                    <BiSearch />
                </button>
            </div>
            <div className="preferences_tag_container">
                <p>Sort using preferences:</p>
            {preferenceData.map(item => (
                  // <span key={item.id} className="preferences_tag">{item.title}</span>
              <span key={item.id} id={item.id.toString()} className={item.stateOfClass ? 'preferences_clicked' : 'preferences_not_clicked'} onClick={handlePreferencesClick}>{item.title}</span>
            ))}
          </div>
        </div>
        <div className="card">
            <div className="card_container">
                <div className="image_container">
                    <img className="image" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" />
                </div>
                <div className="card_details">
                    <p className="card_title">The London Eye</p>
                    <p className="card_description">Not to be missed experience! Get the full English breakfast experience fit for kings!</p>
                    <hr />
                    <div className="card_price_review">
                        <p className="price">from $245</p>
                        <p className="price">&#9733; 4.7 (12 reviews)</p>
                    </div>
                </div>
                <div className="arrow">
                    <p className="arrow_tag"><IoIosArrowDown /></p>
                </div>
                <div className="heart">
                    <p className="heart_tag"><BsSuitHeartFill /></p>
                </div>
            </div>
            <div className="card_container">
                <div className="image_container">
                    <img className="image" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" />
                </div>
                <div className="card_details">
                    <p className="card_title">The London Eye</p>
                    <p className="card_description">Not to be missed experience! Get the full English breakfast experience fit for kings!</p>
                    <hr />
                    <div className="card_price_review">
                        <p className="price">from $245</p>
                        <p className="price">&#9733; 4.7 (12 reviews)</p>
                    </div>
                </div>
                <div className="arrow">
                    <p className="arrow_tag"><IoIosArrowDown /></p>
                </div>
                <div className="heart">
                    <p className="heart_tag"><BsSuitHeartFill /></p>
                </div>
            </div>
            <div className="card_container">
                <div className="image_container">
                    <img className="image" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" />
                </div>
                <div className="card_details">
                    <p className="card_title">The London Eye</p>
                    <p className="card_description">Not to be missed experience! Get the full English breakfast experience fit for kings!</p>
                    <hr />
                    <div className="card_price_review">
                        <p className="price">from $245</p>
                        <p className="price">&#9733; 4.7 (12 reviews)</p>
                    </div>
                </div>
                <div className="arrow">
                    <p className="arrow_tag"><IoIosArrowDown /></p>
                </div>
                <div className="heart">
                    <p className="heart_tag"><BsSuitHeartFill /></p>
                </div>
            </div>
            <div className="card_container">
                <div className="image_container">
                    <img className="image" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" />
                </div>
                <div className="card_details">
                    <p className="card_title">The London Eye</p>
                    <p className="card_description">Not to be missed experience! Get the full English breakfast experience fit for kings!</p>
                    <hr />
                    <div className="card_price_review">
                        <p className="price">from $245</p>
                        <p className="price">&#9733; 4.7 (12 reviews)</p>
                    </div>
                </div>
                <div className="arrow">
                    <p className="arrow_tag"><IoIosArrowDown /></p>
                </div>
                <div className="heart">
                    <p className="heart_tag"><BsSuitHeartFill /></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExplorePage