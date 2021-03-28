import React from 'react';
import {
  Container,
  Header
} from 'semantic-ui-react';
import jordan from 'static/jordan-crying.jpg';
import kobepic from 'static/kobe.jpg';
import { StyleSheet, css } from 'aphrodite';
import { MediaTypes } from 'utils/Enum';


const styles = StyleSheet.create({
  main: {
    width: '80%', 
    display: 'flex', 
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex', 
    justifyContent: 'center'
  },
  image: {
    objectFit: 'contain',
    height: 500, 
    width: 500
  },
  header1: {
    fontSize: '2em',
    fontWeight: 'normal',
    marginTop: '1em',
    fontFamily: 'ProximaBold, serif',
  },
  header2: {
    fontSize: '2em',
    fontWeight: 'normal',
    fontFamily: 'ProximaBold, serif',
  }
});

const mobileStyles = StyleSheet.create({
  header1: {
    fontSize: '8vw',
    fontWeight: 'normal',
    marginTop: '.5em',
    fontFamily: 'ProximaBold, serif'
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    height:'45vh',
  },
  header2: {
    fontSize: '8vw',
    fontWeight: 'normal',
    fontFamily: 'Proximabold,serif'
  }
});

const NoStats = (props) => {
  let kobe = {
      h1: "Rest in peace Kobe & Gianna.",
      h2: ' "You asked for my hustle, I gave you my heart." ',
      imgSrc: kobepic
    },
    noStats = {
      h1: "This player did not play in the NBA bubble.",
      h2: "There are no stats. Please search again.",
      imgSrc: jordan
    }
    console.log(props.media)
    return (
    <Container className={css(styles.main)} >
      <Header
        className={css(props.media === MediaTypes.desktop ? styles.header1 : mobileStyles.header1)}
        content={props.playerName === "Kobe Bryant" ? kobe.h1 : noStats.h1}
        inverted
      />
      <div className={css(styles.imageContainer)}>
        <img
          className={css(props.media === MediaTypes.desktop ? styles.image : mobileStyles.image)}
          onLoad={()=>props.onLoadDone()}
          src = {props.playerName === "Kobe Bryant" ? kobe.imgSrc : noStats.imgSrc}
          alt = "sad Jordan"
        />
      </div>
      <Header
        className={css(props.media === MediaTypes.desktop ? styles.header2 : mobileStyles.header2)}
        content= {props.playerName === "Kobe Bryant" ? kobe.h2 : noStats.h2}
        inverted
      />
    </Container>
  )
}

export default NoStats