import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getData } from './components/utils/FetchData';
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        getData("/api/product")
            .then((res) => {
                if (res.data && res.status) {
                    setProducts(res.data.data);
                }
            }).catch((err) => {
                console.log("err", err);
            })
        const socket = io('ws://localhost:4000', { transports: ["websocket"] })
        setSocket(socket);
        return () => socket.close();
    }, [])

    const state = {
        products: [
            products,
            setProducts
        ],
        socket,
    }

    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}

export {
    DataContext,
    DataProvider
}