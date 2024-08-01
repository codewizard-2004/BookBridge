import React from 'react'
import "./SocialForm.css"
import useBackground from '../hooks/useBackground';

export const SocialForm = () => {
  const {isDark} = useBackground();
  return (
    <div className={`card ${!isDark?"bg-slate-500":""}`}>
      <span>If you wish to mail the book yourself, here's our address</span>
  <div className={`card__content ${!isDark?"bg-slate-500":""}`}>
    <p className={`card__title ${isDark?"text-black":""}`}>Card Title</p>
    <p className={`card__description ${isDark?"text-black":""}`}>BookBridge HQ,</p>
    <p className={`card__description ${isDark?"text-black":""}`}>Random Street,</p>
    <p className={`card__description ${isDark?"text-black":""}`}>Random City,</p>
    <p className={`card__description ${isDark?"text-black":""}`}>Random State,</p>
    <p className={`card__description ${isDark?"text-black":""}`}>PIN: 123456</p>
  </div>
</div>

  )
}
