import React, { useEffect, useState } from 'react'
import storesData from '../../utils/storesDummyData'
import {developmentUrl, shippingMethodsUrl} from '../../utils/urls'
import './Form.css'
import { useForm } from '../../hooks/useForm'
import Success from '../Alerts/Success'
import Spinner from '../Spinner/Spinner'

const Form = () => {

    const [shippingMethods, setShippingMethods] = useState([])
    const [responseData, setResponseData] = useState({})
    const [alert, setAlert] = useState(false)
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        const getShippingMethods = async() => {
            await fetch(shippingMethodsUrl, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT'
                }})
                .then(res => res.json())
                .then(data => setShippingMethods(data))
                .catch(e => console.error(e))
        }
        getShippingMethods()
    }, [])

    const [formValues, handleInputChange] = useForm({
        sellerStore: '',
        shippingMethod: '',
        externalOrderNumber: '',
        buyerFullName: '',
        buyerPhoneNumber: '',
        buyerEmail: '',
        shippingAddress: '',
        shippingCity: '',
        shippingRegion: '',
        shippingCountry: '',
    })

    const {sellerStore, shippingMethod, externalOrderNumber, buyerFullName, buyerPhoneNumber, buyerEmail, shippingAddress, shippingCity, shippingRegion, shippingCountry } = formValues

    const createSellOrder = (e) => {
        e.preventDefault()

        const sendSellOrderData = async() => {
            await fetch(`${developmentUrl}/api/sellorder`, {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setSpinner(true)
                    setResponseData(data)
                    setAlert(true)
                    setSpinner(false)
                })
                .catch(e => console.error(e))
        }

        sendSellOrderData()
    }

    return (
        <form
            onSubmit={createSellOrder}
        >
            {
                alert && <Success />
            }
            <div className='select__container'>
                <label className='label'>Seleccione la tienda</label>
                <select
                    onChange={handleInputChange}
                    value={sellerStore}
                    className='input__container'
                    name='sellerStore'
                >
                    <option value=''>- Seleccione -</option>
                        {storesData.map(store => (
                            <option key={store.id} value={store.name}>{store.name}</option>
                        ))}
                </select>
                <label className='label'>Seleccione el método de envío</label>
                <select
                    onChange={handleInputChange}
                    value={shippingMethod}
                    className='input__container'
                    name='shippingMethod'
                >
                    <option value=''>- Seleccione -</option>
                        {shippingMethods.map(shipping => (
                            <option key={shipping.id} value={shipping.name}>{shipping.name}</option>
                        ))}
                </select>
            </div>
            <div className='input__style'>
                <div className='single__input'>
                    <label className='label'>External Order Number</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="externalOrderNumber"
                        className="input__container"
                        autoComplete="off"
                        value= {externalOrderNumber}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className='single__input'>
                    <label className='label'>Full Name</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="buyerFullName"
                        className="input__container"
                        autoComplete="off"
                        value= {buyerFullName}
                        onChange={ handleInputChange }
                    />
                </div>
            </div>
            <div className='input__style'>
                <div className='single__input'>
                    <label className='label'>Phone Number</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="buyerPhoneNumber"
                        className="input__container"
                        autoComplete="off"
                        value= {buyerPhoneNumber}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className='single__input'>
                    <label className='label'>Email</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="buyerEmail"
                        className="input__container"
                        autoComplete="off"
                        value= {buyerEmail}
                        onChange={ handleInputChange }
                    />
                </div>
            </div>
            <div className='input__style'>
                <div className='single__input'>
                    <label className='label'>Address</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="shippingAddress"
                        className="input__container"
                        autoComplete="off"
                        value= {shippingAddress}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className='single__input'>
                    <label className='label'>City</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="shippingCity"
                        className="input__container"
                        autoComplete="off"
                        value= {shippingCity}
                        onChange={ handleInputChange }
                    />
                </div>
            </div>
            <div className='input__style'>
                <div className='single__input'>
                    <label className='label'>Region</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="shippingRegion"
                        className="input__container"
                        autoComplete="off"
                        value= {shippingRegion}
                        onChange={ handleInputChange }
                    />
                </div>
                <div className='single__input'>
                    <label className='label'>Country</label>
                    <input 
                        type="text"
                        placeholder="Orden Externa"
                        name="shippingCountry"
                        className="input__container"
                        autoComplete="off"
                        value= {shippingCountry}
                        onChange={ handleInputChange }
                    />
                </div>
            </div>
            
            <button
                type='submit'
                className='btn__container'
            >
                Create Order
            </button>

            {spinner && <Spinner />}

        </form>
    )
}

export default Form
