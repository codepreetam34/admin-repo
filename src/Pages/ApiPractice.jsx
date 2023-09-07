import React from 'react'
import Wrapper from '../Components/Wrapper'
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'

const ApiPractice = () => {

    const [getapi, setGetapi] = useState([]);

    const makefunction = async () => {
        try {
            const getapis = await fetch('https://fakestoreapi.com/products');
            // const jsonaip = await getapi.json();
            setGetapi(await getapis.json());
        } 
        
        catch (error) {
            console.log(error);    
        }
    };

    useEffect(() => {
        makefunction();
    }, [])
    

    
    return (
        <Wrapper>
            <div className='dashbcontent'>
                <Container>
                    <Row>
                        {getapi.map((getdata) => (
                            <Col md={6} lg={3} className="mb-3" key={getdata.id}>
                                <div className="sliderbox">
                                    <img src={getdata.image} className='img-fluid boximg' alt="" />
                                    <div className="py-3">
                                        <span>{getdata.title}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center py-2">
                                        <h4>Price:</h4>
                                        <h4><img src="http://localhost:3000/images/solana.png" className='img-fluid' alt="" /> {getdata.price}</h4>
                                    </div>
                                    <div className="text-end">
                                        <a href="#" className='bgbtn'>Buy Item</a>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </Wrapper>
    )
}

export default ApiPractice
