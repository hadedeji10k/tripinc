import React, { useState } from 'react'
// import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
// import SecurityCodeModal from '../SecurityCodeModal/SecurityCodeModal';

import './Preferences.css'

const preferencedata = [
  {
    id: 1,
    title: '🎢 Adventure',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 2,
    title: '🎨 Arts & Galleries',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 3,
    title: '🏝 Beach',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 4,
    title: '🍹 Food & Drinks',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 5,
    title: '🏝 Shopping',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 6,
    title: '🏛 History & Culture',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 7,
    title: '⛩ Iconic Architecture',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 8,
    title: '⚽️ Sporting Attractions',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 9,
    title: '🏵 Wellness & Spa',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 10,
    title: '🌲 Outdoors & Nature',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 11,
    title: '🎷 Nightlife',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 12,
    title: '🗽 Tourist Attractions',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 13,
    title: '🎬 Film',
    stateOfClass: false,
    class: 'clicked'
  }
]

const placesdata = [
  {
    id: 1,
    title: 'Nigeria',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 2,
    title: 'Barcelona',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 3,
    title: 'America',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 4,
    title: 'London',
    stateOfClass: false,
    class: 'clicked'
  }
]  

const placesBeenTodata = [
  {
    id: 1,
    title: 'Nigeria',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 2,
    title: 'Barcelona',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 3,
    title: 'America',
    stateOfClass: false,
    class: 'clicked'
  },
  {
    id: 4,
    title: 'London',
    stateOfClass: false,
    class: 'clicked'
  }
]

const Preferences: React.FC = () => {

  const [preferenceData, setPreferenceData] = useState(preferencedata)
  const [placesData, setPlacesData] = useState(placesdata)
  const [placesBeenToData, setPlacesBeenToData] = useState(placesBeenTodata)

  const handleClick = (e: any) => {
    e.preventDefault()
    // console.log(e.target.id)
    const id = e.target.id
    const index = preferenceData.findIndex(item => item.id === parseInt(id))
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass
    // preferenceData[index].class = preferenceData[index].stateOfClass ? 'clicked' : 'not-clicked'
    setPreferenceData([...preferenceData])
  }

  const handlePlacesClick = (e: any) => {
    e.preventDefault()
    const id = e.target.id
    let data = placesData.filter(item => item.id !== parseInt(id))
    setPlacesData([...data])
    console.log(placesData)
  }

  const handlePlacesChange = (e: any) => {
    e.preventDefault();
    // console.log(e.keyCode)
    let inputData = e.target.value.toString()
    let input = document.getElementById('places') as HTMLInputElement
    input.addEventListener("keydown", function(event) {
        if(event.key === 'Enter') {
          let newPlacesData = placesData.filter(item => item.title !== inputData)
          // console.log(placesData)
          setPlacesData([...newPlacesData])

          if(newPlacesData.length !== placesData.length) {
            // console.log(inputData)
            // console.log(id)
            let lastElement = newPlacesData[newPlacesData.length - 1]
            let id = lastElement.id + 1 
              setPlacesData([...newPlacesData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          } else {
            let lastElement = newPlacesData[newPlacesData.length - 1]
            let id = lastElement.id + 1
            setPlacesData([...newPlacesData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          }
          console.log(placesData)
          input.value = ''
        }
    });
  }

  const handlePlacesBeenToClick = (e: any) => {
    e.preventDefault()
    const id = e.target.id
    let data = placesBeenToData.filter(item => item.id !== parseInt(id))
    setPlacesBeenToData([...data])
    console.log(placesBeenToData)
  }

  const handlePlacesBeenToChange = (e: any) => {
    e.preventDefault();
    // console.log(e.keyCode)
    let inputData = e.target.value.toString()
    let input = document.getElementById('placesBeenTo') as HTMLInputElement
    input.addEventListener("keydown", function(event) {
        if(event.key === 'Enter') {
          let newPlacesBeenToData = placesBeenToData.filter(item => item.title !== inputData)
          // console.log(PlacesBeenToData)
          setPlacesBeenToData([...newPlacesBeenToData])

          if(newPlacesBeenToData.length !== placesBeenToData.length) {
            // console.log(inputData)
            // console.log(id)
            let lastElement = newPlacesBeenToData[newPlacesBeenToData.length - 1]
            let id = lastElement.id + 1 
              setPlacesBeenToData([...newPlacesBeenToData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          } else {
            let lastElement = newPlacesBeenToData[newPlacesBeenToData.length - 1]
            let id = lastElement.id + 1
            setPlacesBeenToData([...newPlacesBeenToData, {id, title: inputData, stateOfClass: false, class: 'clicked'}])
          }
          console.log(placesBeenToData)
          input.value = ''
        }
    });
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(placesData)
    console.log(placesBeenToData)
    let preferences = preferenceData.filter(item => item.stateOfClass === true)

    console.log(preferences)
  }

  return (
      <div className="preferences_container">
        <div className="preferences_word">
          <h1 className="preferences_header">Nice to meet you!</h1>
          <h3 className="preferences_title">Tell us a bit more about your adventures.</h3>
        </div>
        
        {/* places been to */}
        <div>
          <label className="preferences_label">Where have you been before?</label>
          <input id="placesBeenTo" className="preferences_input" type="text" placeholder='Enter the name of the location' onChange={handlePlacesBeenToChange}/>
        </div>
        <div className="bucket_list_tag_container">
                {placesBeenToData.map(item => (
              // <span key={item.id} className="bucket_list_tag">{item.title}</span>
              <span key={item.id} id={item.id.toString()} className='location_tag' onClick={handlePlacesBeenToClick}>x {item.title}</span>
            ))}
        </div>
        
        {/* Bucket List */}

        <div className="bucket_list">
          <label className="preferences_label">What’s on your bucket list? </label>
          <input id="places" className="preferences_input" type="text" placeholder='Enter your preferred location' onChange={handlePlacesChange}/>
        </div>
        <div className="bucket_list_tab">
          <div className="bucket_list_tag_container">
            {placesData.map(item => (
                    // <span key={item.id} className="bucket_list_tag">{item.title}</span>
              <span key={item.id} id={item.id.toString()} className='location_tag' onClick={handlePlacesClick}>x {item.title}</span>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="preferences_tab">
          <label className="preferences_label">Describe your travel interests (select as many as you like):</label>
          <div className="preferences_tag_container">
            {preferenceData.map(item => (
                  // <span key={item.id} className="preferences_tag">{item.title}</span>
              <span key={item.id} id={item.id.toString()} className={item.stateOfClass ? 'preferences_clicked' : 'preferences_not_clicked'} onClick={handleClick}>{item.title}</span>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="preferences_button_container">
          <button className="preferences_button" onClick={handleSubmit}>Time to Explore!</button>
        </div>
        {/* <SecurityCodeModal showModal={showModal} setShowModal={setShowModal} /> */}
        <div className="have_account">
          <h3>Already have an account? <a href="/" className="login_text">Login</a></h3>
        </div>
      </div>
  )
}

export default Preferences