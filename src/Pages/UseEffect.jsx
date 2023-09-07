import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const UseEffect = () => {

    const [count, setCount] = useState(0);
    const [read, setRead] = useState(false);

    useEffect(()=> {
        document.title = `Count Click ${count}` 
    })
    
    return (
        <div className='d-flex justify-content-center'>
            <div className='text-center'>
                <h1>{count}</h1>
                <Button onClick={() => setCount(count + 1)} variant="success">Click Me</Button> 
                <Button className='d-block mt-3' onClick={()=> setRead(!read)} variant="success">{read ? 'Clicked' : 'Click Me'}</Button>
            </div>
        </div>
    )
}

export default UseEffect