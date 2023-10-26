import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Card from '../components/Card/Card'
import Button from '../components/Button/Button';
import { BiArrowBack } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsArrowRepeat } from 'react-icons/bs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PiPencil } from 'react-icons/pi';
import { GrTrash } from 'react-icons/gr';
import { Navigation, Keyboard } from 'swiper/modules';
import './Folder.css'
import 'swiper/css/navigation';
import 'swiper/css';

function Cards({ allFolders, setAllFolders }) {
  
  // getting id parameter to find out which folder was clicked
  const { id: folderId } = useParams()
  // getting state with card index from card that was edited 
  const { state } = useLocation()
  // logic data for flipping between card sides
  const [flipedCard, setFlipedCard] = useState(false);  
  // making immediately active card that was just now edited or added
  const [activeSlide, setActiveSlide] = useState(Number(state?.cardIndex) || 0);
  // finding selected folder
  const selectedFolder = allFolders.find(folder => folder.id === Number(folderId));

  const toggleSideCard = () => {
    setFlipedCard(!flipedCard)
  }

  const deleteCard = () => {
    setAllFolders(prevFolder => prevFolder.map(folder => {
      if (folder.id === Number(folderId)) {
        const updatedCards = folder.cards.filter((card, i) => i !== activeSlide)
        return {...folder, cards: updatedCards}
      } else {
        return folder
      }
    }))
  }
  //switching card to initial side after passing to another card
  useEffect(() => {
    setFlipedCard(false)
  }, [activeSlide])

  return (
    <div className="folder">
      <div className="folder__container">
          <Link 
          to='..' 
          className='folder__link folder__link--back'>
          <BiArrowBack
            style={{width:'40px', height:'40px'}}
          />
          </Link>
          <Button 
            onClick={deleteCard}
            className='folder__btn--delete'
            style={{display: selectedFolder.cards.length ? 'block' : 'none'}}
          >
            <GrTrash
              className='folder__btn-icon'
              style={{width: '30px', height: '30px'}}
            />
          </Button>
          <Link 
            to={`editor/${activeSlide}`} 
            className='folder__link folder__link--edit'
            style={{display: selectedFolder.cards.length ? 'block' : 'none'}}>
            <PiPencil
              className='folder__link-icon '
              style={{width: '35px', height: '35px'}}
            />
          </Link>
          <Link 
            to='editor' 
            className='folder__link folder__link--new'>
            <AiOutlinePlus
              style={{width:'40px', height:'40px'}}
            />
          </Link>
          <Card>
          {/* If the folders do not exist, rendering title  */}
          {selectedFolder.cards.length === 0 ? (
            <h1 className='all-folders__title'>Add Your First Memory Card</h1>
          ) : (
            <Swiper
              initialSlide={activeSlide} 
              navigation={true}
              modules={[Navigation, Keyboard]}
              className="mySwiper"
              style={{position: 'static'}}
              onSlideChange={slide => setActiveSlide(slide.activeIndex)}
              keyboard={{
                enabled: true
              }}
            >
              {selectedFolder.cards.map((card, i) => {
                return  <SwiperSlide
                          key={i}
                          style={{display:'flex'}}
                        >
                          { flipedCard ? card.outputValue : card.inputValue }
                        </SwiperSlide>
              })}
            </Swiper> 
          )}
          </Card>
          <Button
            className='folder__btn'
            onClick={toggleSideCard}
            style={{
              display: selectedFolder.cards.length ? 'block' : 'none',
              color:'var(--pink)'
            }}
          >
          <BsArrowRepeat
            style={{width:'45px', height:'45px'}}
          />
          </Button>
      </div>
    </div>
  );
}

export default Cards;