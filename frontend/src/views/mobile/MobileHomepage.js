import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Container,
  Header,
  Menu,
} from 'semantic-ui-react';
import PlayerSearch from 'components/PlayerSearch';


class MobileHomepage extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div style = {{
        minHeight: "90vh",
        maxHeight: "100vh",
        position:'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'hidden',
      }}>
        <Menu inverted secondary style={{position:'absolute', top:0, right:10}}>
          <Menu.Item
            position = 'right'
            style = {{
              padding: 0,
              margin: 0
            }}
          >
            Made by
          </Menu.Item>
          <Menu.Item 
            as='a'
            name="Alex"
            href=""
            fitted
          />
          <Menu.Item
            style = {{
              padding: 0,
              margin: 0
            }}
          >
            and
          </Menu.Item>
          <Menu.Item
              name= "Victor"
              as='a'
              href="https://www.google.com"
              fitted
          />
        </Menu>
        <div>
          <Container text>
            <Header
              content="STATS DON'T LIE 🏀"
              inverted
              style={{
                fontSize: '12vw',
                fontWeight: 'normal',
                fontFamily: 'Proxima, serif',
                margin:0
              }}
              textAlign = 'center'
            />
            <Header
              content="Search for a player's stats inside and out the NBA bubble"
              inverted
              style={{
                fontSize: '5vw',
                fontWeight: 'normal',
                marginBottom: 15,
                marginTop:0,
                fontStyle: 'italic'
              }}
              textAlign = 'center'
            />
            <PlayerSearch  addPlayerId = {this.props.addPlayerId}/>
          </Container>
        </div>
      </div>
    )
  }
}
  
export default MobileHomepage;