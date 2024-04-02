import React, { useState, useEffect, useContext } from 'react';
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
import { AllFoldersContext } from '../context/allFoldersContext';
import './Folder.css'
import 'swiper/css/navigation';
import 'swiper/css';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { LocalStorage } from '../utilities/LocalStorage/LocalStorage';
import { IAllFoldersContext } from '../types/types';



function Cards() {

  const contextValue = useContext<IAllFoldersContext | null>(AllFoldersContext);

  if (!contextValue) {
    throw new Error('AllFoldersContext is not available.');
  }


  const { allFolders, setAllFolders } = contextValue;
  // getting id parameter to find out which folder was clicked
  const { id: folderId } = useParams()
  // getting state with card index from card that was edited 
  const { state } = useLocation()
  // logic data for flipping between card sides
  const [flipedCard, setFlipedCard] = useState(false);  
  // finding selected folder
  const selectedFolder = allFolders?.find(folder => folder.id === Number(folderId));
  const cardsCount = selectedFolder?.cards.length;
  // making immediately active card that was just now edited or added
  const [activeSlide, setActiveSlide] = useState(Number(state?.cardIndex) || 0);
  // state for check if card was learned
  const cardIsLearned = selectedFolder?.cards[activeSlide]?.isLearned || null;


  const toggleSideCard = () => {
    setFlipedCard(!flipedCard)
  }

  const toggleIsLearned = () => {
    setAllFolders(prevFolder => {
      const updatedFolder = prevFolder.map(folder => {
        if (folder.id === Number(folderId)) {
          const updatedCards = folder.cards.map((card, i) => {
            if (i === activeSlide) {
              return {...card, isLearned: !cardIsLearned}
            } else {
              return card
            }
          })
          return {...folder, cards: updatedCards}
        } else {
          return folder
        }
      })
        if (updatedFolder) {
          LocalStorage.set('allFolders', updatedFolder);
        }
        
        return updatedFolder
    }) 
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
          {selectedFolder?.cards.length ?
          <Button 
            onClick={toggleIsLearned}
            className='folder__btn folder__btn--learned'
          >
            {cardIsLearned ? 
              (
              <AiFillStar
                className='folder__btn-icon'
                style={{width: '40px', height: '40px'}}
              />
              ) : (
              <AiOutlineStar
                className='folder__btn-icon'
                style={{width: '40px', height: '40px'}}
              /> 
              )
            }
          </Button> : null}
          <Button 
            onClick={deleteCard}
            className='folder__btn--delete'
            style={{display: selectedFolder?.cards.length ? 'block' : 'none'}}
          >
            <GrTrash
              className='folder__btn-icon'
              style={{width: '30px', height: '30px'}}
            />
          </Button>
          <Link 
            to={`editor/${activeSlide}`} 
            className='folder__link folder__link--edit'
            style={{display: selectedFolder?.cards.length ? 'block' : 'none'}}>
            <PiPencil
              className='folder__link-icon '
              style={{width: '35px', height: '35px'}}
            />
          </Link>
          <Link 
            to='editor' 
            state={{cardsCount}}
            className='folder__link folder__link--new'>
            <AiOutlinePlus
              style={{width:'40px', height:'40px'}}
            />
          </Link>
          <Card>
          {selectedFolder?.cards.length === 0 ? (
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
              {selectedFolder?.cards.map((card) => {
                return  <SwiperSlide
                          key={card.id}
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
              display: selectedFolder?.cards.length ? 'block' : 'none',
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