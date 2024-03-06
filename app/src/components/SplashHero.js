import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap';

// import withRoute from '../withRoute';
// import { withAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
// import LoginButton from './auth/LoginButton';

const LoginButton = ({text, variant, loginWithRedirect}) => {
    return <Button variant={variant || "dark"} onClick={() => loginWithRedirect()}>
        {text || "Log In"}
      </Button>;
  };

function SplashHero(props) {
    return (
        <div>
            <div style={style.heroImage}>
            <Container fluid style={style.heroContainer}>
                    <HeroMarque />
                    <Row>
                        <Col xs={12} sm={6} md={8}>
                            <CallToActionPlain {...props} />
                        </Col>
                    </Row>
                </Container>

            </div>
            {/* <div style={style.container}>
                <h1 style={style.title}>Welcome to the <br/> <span style={{color: '#ff0000'}}>Red</span> Store</h1>
                <h2 style={style.subtitle}>The best place to buy red stuff</h2>
                <div style={style.heroImage} />
            </div> */}
        </div>);
}

class HeroMarque extends Component {
    render() {
        return (<div style={style.heroMarque}>
            <h1 style={style.title}> <span style={{ color: '#dd88dd' }}>Drama Echo</span></h1>
            {/* <h2 style={style.subtitle}>Listen and repeat with high intrest videos!</h2> */}
        </div>);
    }
}

function CallToActionPlain(props) {
        return (
            <Card style={style.callToActionCard}>
                <Card.Body>
                    <Card.Title style={style.CTA_title}>Call and response language learning for the digital age</Card.Title>
                    <Card.Text style={style.CTA_text}>
                        Have you ever watched a movie in a foreign language and thought "I wish I could do that!"
                    </Card.Text>
                    <Card.Text style={style.CTA_text}>
                        Now you can!
                    </Card.Text>
                        {
                            props.isAuthenticated ?
                            <Row>
                                <Col>
                                    <Link to="/dialogs" className="btn btn-primary btn-lg">For Teachers</Link>
                                </Col>
                                <Col className='d-flex flex-row-reverse'>
                                    <Link to="/echoes" className="btn btn-primary btn-lg">For Learners</Link>
                                </Col>
                            </Row>
                        : <Row>
                            <Col>
                                &nbsp;
                            </Col>
                            <Col className='d-flex flex-row-reverse'>
                                <LoginButton 
                                text="Try it!"
                                variant="primary" 
                                loginWithRedirect={props.loginWithRedirect}
                                />
                            </Col>
                        </Row>
                        }           
                    
                </Card.Body>
            </Card>);
}

// const CallToAction = withAuth0(withRoute(CallToActionPlain));

const IMG_URL_SPLASH = process.env.REACT_APP_IMG_URL_SPLASH;

const style = {
    heroMarque: {
        color: '#fff',
        padding: '1rem',
        position: 'absolute',
        top: '0',
        left: '0',
    },
    heroContainer: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: '5rem',
        textAlign: 'center',
        color: '#fff'
    },
    subtitle: {
        fontSize: '2rem',
        textAlign: 'center',
        color: '#fff'
    },
    heroImage: {
        backgroundSize: "cover",
        backgroundPosition: "top",
        width: '100%',
        height: '90vh',
        backgroundImage: `linear-gradient(45deg, rgba(255,255,255,1) 7%, rgba(255,255,255,0) 58%), url(${IMG_URL_SPLASH})`,
        backgroundRepeat: 'no-repeat',
    },
    callToActionCard: {
        backgroundColor: "rgba(245, 245, 245, 0.8)"
    },
    CTA_title: {
        fontSize: '2rem',
        color: '#dd88dd'
    },
    CTA_text: {
        fontSize: '1.5rem',
    }

}

export default SplashHero;