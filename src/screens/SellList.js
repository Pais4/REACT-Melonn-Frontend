import React, { useEffect, useState } from 'react'
import {developmentUrl} from '../utils/urls'
import List from '../components/List/List'
import './SellList.css'

const SellList = () => {

    const [ordersData, setOrdersData] = useState([])

    useEffect(() => {

        const getAllOrders = async() => {
            fetch(`${developmentUrl}/api/sellorder`)
                .then(res => res.json())
                .then(data => setOrdersData(data.getSellOrders))
        }

        getAllOrders()

    }, [])

    return (
        <div className='image__container'>
            <header>
                <h1>Sell Order List</h1>
            </header>
            <div className='list__container'>
                {
                    ordersData.map(order => (
                        <List 
                            key={order._id}
                            order={order}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SellList
