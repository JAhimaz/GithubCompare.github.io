import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

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
      const [user1Error, setErrorUser1] = useState(null);
      const [user2Error, setErrorUser2] = useState(null);
    
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
                setUserData(true);
                if(data[0].message){
                    setErrorUser1(data[0].message);
                }else{
                    setErrorUser1(null);
                    setData(data[0], "user1");
                }
                if(data[2].message){
                    setErrorUser2(data[2].message);
                }else{
                    setErrorUser2(null);
                    setData(data[2], "user2");
                }              
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
            { userData == false ? (<div className="error-text">Please Enter The Profiles and Click Compare</div>
            ) : (
            <div>
                <Row>
                    <Col className="Card">
                    <div className="Github-card">
                        { user1Error ? (<div className="error-text">{user1Error}</div>) : 
                        (
                            <div>
                                <Row>
                            <Col sm="5">
                                <img src={user1.avatar} className="profile-image" />
                            </Col>
                            <Col sm="87">
                            <p className="profile-header"><span className="profile-name">{user1.name}</span><br/>
                            <a className="profile-link" href={"Github.com/" + user1.userName}>Github.com/{user1.userName} <FontAwesomeIcon icon={faExternalLinkAlt} /></a></p>
                            </Col>
                        </Row>
                        <Row className="profile-follow">
                            <Col sm="6">
                                <div  className="follow-box">
                                    <p>
                                        Followers: <br/>
                                        {user1.followers > user2.followers && <span className="follow-number-greater">{user1.followers}</span>}
                                        {user2.followers > user1.followers && <span className="follow-number-lower">{user1.followers}</span>}
                                        {user2.followers === user1.followers && <span className="follow-number-same">{user1.followers}</span>}
                                    </p>
                                </div>
                            </Col>
                            <Col sm="6">
                                <div  className="follow-box">
                                    <p>
                                        Following: <br/>
                                        {user1.following > user2.following && <span className="follow-number-greater">{user1.following}</span>}
                                        {user2.following > user1.following && <span className="follow-number-lower">{user1.following}</span>}
                                        {user2.following === user1.following && <span className="follow-number-same">{user1.following}</span>}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                            </div>
                        )
                        } 
                    </div>
                    </Col>
                    <Col className="Card">
                    <div className="Github-card">
                        { user2Error ? (<div className="error-text">{user2Error}</div>) : 
                        (
                        <div>
                        <Row>
                            <Col sm="5">
                                <img src={user2.avatar} className="profile-image" />
                            </Col>
                            <Col sm="87">
                            <p className="profile-header"><span className="profile-name">{user2.name}</span><br/>
                            <a className="profile-link" href={"Github.com/" + user2.userName}>Github.com/{user2.userName} <FontAwesomeIcon icon={faExternalLinkAlt} /></a></p>
                            </Col>
                        </Row>
                        <Row className="profile-follow">
                        <Col sm="6">
                                <div  className="follow-box">
                                    <p>
                                        Followers: <br/>
                                        {user2.followers > user1.followers && <span className="follow-number-greater">{user2.followers}</span>}
                                        {user1.followers > user2.followers && <span className="follow-number-lower">{user2.followers}</span>}
                                        {user1.followers === user2.followers && <span className="follow-number-same">{user2.followers}</span>}
                                    </p>
                                </div>
                            </Col>
                            <Col sm="6">
                                <div  className="follow-box">
                                    <p>
                                        Following: <br/>
                                        {user2.following > user1.following && <span className="follow-number-greater">{user2.following}</span>}
                                        {user1.following > user2.following && <span className="follow-number-lower">{user2.following}</span>}
                                        {user1.following === user2.following && <span className="follow-number-same">{user2.following}</span>}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        </div>
                        )}
                    </div>
                    </Col>
                </Row>
            </div>
            )}
          </div>
      );
}

export default ProfileCompare;