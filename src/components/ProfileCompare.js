import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileCompare(){
    const GithubUser = {
        name: null,
        userName: null,
        avatar: null,
        followers: null,
        following: null,
        repoCount: null,
        repos: []
      }
    
      const [userData, setUserData] = useState(false);
      const [user1, setFirstUser] = useState(GithubUser);
      const [user2, setSecondUser] = useState(GithubUser);
      const [firstUserInput, setFirstUserInput] = useState('');
      const [secondUserInput, setSecondUserInput] = useState('');
      const [error, setError] = useState(null);
    
      const handleUserProfileInput = e => {
        if(e.target.id == "user1"){
            setFirstUserInput(e.target.value);
        }else if(e.target.id == "user2"){
            setSecondUserInput(e.target.value);
        }else{
            console.log("Error: User form ID not found");
        }
      }
      
      const handleSearchSubmit = () => {
          Promise.all([
            fetch(`https://api.github.com/users/${firstUserInput}`).then(user1 => user1.json()),
            fetch(`https://api.github.com/users/${firstUserInput}/repos`),
            fetch(`https://api.github.com/users/${secondUserInput}`).then(user2 => user2.json()),
            fetch(`https://api.github.com/users/${secondUserInput}/repos`)
          ]).then((data) => {
              console.log(data);
              setUserData(true);
              setData(data[0], "user1");
              setData(data[2], "user2");
          });
      }
    
      const setData = ({ name, login, followers, following, public_repos, avatar_url }, user) => {
        if(user == "user1"){
          setFirstUser({name: name, userName: login, followers: followers, following: following, repos: public_repos, avatar: avatar_url});
        }else if(user == "user2"){
          setSecondUser({name: name, userName: login, followers: followers, following: following, repos: public_repos, avatar: avatar_url});
        }
      }
    
      return (
          <div className="container">
            <div className="Search-bar">
            <Form onSubmit={handleSearchSubmit}>
              <Form.Group as={Row}>
                <Col>
                    <Form.Label className="label">User Profile 1</Form.Label>
                    <Form.Control type="text" placeholder="Github Profile" id="user1" className="input-fields" onChange={handleUserProfileInput}/>
                </Col>
                <p className="label">vs</p>
                <Col>
                    <Form.Label className="label">User Profile 2</Form.Label>
                    <Form.Control type="text" placeholder="Github Profile" id="user2" className="input-fields" onChange={handleUserProfileInput}/>
                </Col>
              </Form.Group>
              <Button variant="danger" onClick={handleSearchSubmit} block>
                Compare
              </Button>
            </Form>
            </div>
            <Row>
                <Col className="Card">
                <div className="Github-card">
                    {/* SETUP IF STATEMENT */}
                </div>
                {/* <Card className="Github-card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user1.avatar} />
                    <Card.Body>
                        <Card.Title>{user1.userName}</Card.Title>
                        <Card.Text>
                        Repos: {user1.repos}<br />
                        Followers: {user1.followers}<br />
                        Following: {user1.following}
                        </Card.Text>
                    </Card.Body>
                </Card> */}
                </Col>
                <Col className="Card">
                <div className="Github-card">
                    {/* SETUP IF STATEMENT */}
                    
                </div>
                {/* <Card className="Github-card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user2.avatar} />
                    <Card.Body>
                        <Card.Title>{user2.userName}</Card.Title>
                        <Card.Text>
                        Repos: {user2.repos}<br />
                        Followers: {user2.followers}<br />
                        Following: {user2.following}
                        </Card.Text>
                    </Card.Body>
                    </Card> */}
                </Col>
            </Row>
          </div>
      );
}

export default ProfileCompare;