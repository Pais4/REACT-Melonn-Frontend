import React from 'react'
import './CreateSellOrder.css'
import ecommerce from '../assets/ecommerce.png'
import Form from '../components/Form/Form'

const CreateSellOrder = () => {
    return (
        <div className='container'>
            <div className='img__container'>
                <img 
                    src={ecommerce}
                    alt='ecommerce img'
                    className='image'
                />
            </div>
            <div className='form__container'>
                <Form />
            </div>
        </div>
    )
}

export default CreateSellOrder
