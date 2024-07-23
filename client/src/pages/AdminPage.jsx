import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Calendar from '../components/Calendar';
import Auth from "../utils/auth";
import EmployeeList from '../components/EmployeeList';

const AdminPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`admin-hero text-white d-flex flex-column align-items-center ${isVisible ? 'fade-in' : ''}`}>
            <Container>
                <Row className="justify-content-center">
                    {/* <Col className="text-center">
                        <h3>Hello, {Auth.getProfile().authenticatedPerson.username}!</h3>
                    </Col> */}
                </Row>
                <Row className="justify-content-center mt-5">
                    <Col className="text-center">
                        <Calendar />
                    </Col>
                    <EmployeeList/>
                </Row>
            </Container>
        </div>
    );
};

export default AdminPage;
