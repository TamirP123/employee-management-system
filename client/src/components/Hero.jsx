import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/hero.css';


const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`hero text-white d-flex align-items-center justify-content-center ${isVisible ? 'fade-in' : ''}`}>
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1 className="display-4">Increase visibility and optimize workplace logistics with Employee Bubble</h1>
                        <p className="lead">This is a simple employee system hub that allows both employees and HR members to easily interact with work-life systems.</p>
                        <Button variant="light" onClick={() => window.scrollTo({ top: document.documentElement.clientHeight, behavior: 'smooth' })}>Learn More</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Hero;