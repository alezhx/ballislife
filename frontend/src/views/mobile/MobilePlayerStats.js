import { createMedia } from '@artsy/fresnel';
import React, { Component } from 'react';
import {
  Table,
  Header,
  Container,
  Icon,
  Grid
} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import ReactPlayer from 'react-player';
import PlayerSearch from 'components/PlayerSearch';
import StatsTable from 'components/StatsTable';
import NoStats from 'views/desktop/NoStats';
import LoadingSpinner from 'components/LoadingSpinner';
import UtilTools from 'utils/UtilTools';
import ResultsLogo from 'static/ResultsLogo.png';


class MobilePlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preStats: {},
      postStats: {stats:0},
      playerImageLink: '',
      playerHighlights: '',
      isLoading: true,
    }
  };

  componentDidMount = () => {
    window.scrollTo(0, 0)
    this.loadAllStatActions()
  }

  loadAllStatActions = () => {
    this.setState({isLoading:true, playerImageLink:""})
    this.loadBubbleStats(this.props.playerId)
    this.loadPreBubbleStats(this.props.playerId)
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => { 
    if(prevProps.playerId !== this.props.playerId) {
      this.loadAllStatActions()
    }
  }

  loadPreBubbleStats = async(player_id) => {
    const { data } = await axios.get('https://www.balldontlie.io/api/v1/stats', {
      params: {
        seasons: 2019,
        player_ids: [player_id],
        start_date: "2019-10-22",
        end_date: "2020-03-12",
        per_page: 100
      }
    })

    let cleanStats = {}

    if (!(_.isEmpty(data.data))) {
      cleanStats = UtilTools.getStatAverages(data)
    }

    this.setState({preStats:cleanStats})
  }

  loadBubbleStats = async(player_id) => {
    const { data } = await axios.get('https://www.balldontlie.io/api/v1/stats', {
      params: {
        seasons: 2019,
        player_ids: [player_id],
        start_date: "2020-07-30",
        end_date: "2020-10-12",
        per_page: 100
      }
    })

    let cleanStats = {}

    if (!(_.isEmpty(data.data))) {
      cleanStats = UtilTools.getStatAverages(data)
    }

    this.setState({postStats:cleanStats}, () => {
      if (!(_.isEmpty(this.state.postStats))) {
        this.getPlayerImage(this.props.playerName)
        this.getPlayerHighlights(this.props.playerName)
      }
      // this.setState({isLoading:false})
    })
  }

  renderSearchBar = () => {
    return (
      <div style={{
        position:'sticky', 
        paddingTop:15, 
        paddingBottom:15, 
        display:'flex', 
        justifyContent:'center', 
        top:'0px', 
        backgroundColor:'#dfe6e9', 
        width:'100%', 
        boxShadow: "2px 2px 15px black", 
        padding:8, 
        alignItems:'center',
        zIndex:999}}>
        <div style={{height:'100%', paddingRight:8}}>
          <a href=""> 
            <img
                style={{
                  objectFit : 'contain',
                  width: 150,
                  height:'100%'
                }}
                src = {ResultsLogo}
                alt = "Logo"
            />
          </a>
        </div>
        <div style={{width:'100%', display:'inline-block'}}>
          <PlayerSearch search addPlayerId={this.props.changePlayerId}/>
        </div>
      </div>
    )
  }

  getPlayerImage = async(playerName) => {
    try {
      const {data} = await axios.post('/api/getPlayerImage', {PlayerName: playerName})

      this.setState({playerImageLink: data.items[0].link,
        image: {
          height: data.items[0].image.height,
          width: data.items[0].image.width
        }
      })
    } catch (error) {
      console.log('Image API error', error)
    }
  }

  getPlayerHighlights = async(playerName) => {
    try {
      const {data} = await axios.post('/api/getPlayerHighlights', {PlayerName: playerName})

      this.setState({playerHighlights: "www.youtube.com/watch?v=" + data.items[0].id.videoId})
    } catch(error) {
      console.log('Video API error', error)
    }
  }
  
  renderPlayerStats = () => {
    let statCategories = ["fga", "fgm", "fg_pct", "fg3a", "fg3m", "fg3_pct", "fta", "ftm", "ft_pct", "oreb", "DREB" ,"reb", "ast", "blk", "stl", "pf", "turnover", "pts"]

    return (
      <div>
        {this.renderImageQuickStats()}
        <div style={{marginTop:30}}>
          <div style={{display:'flex', boxShadow: "1px 1px 1px #000000", position: 'relative', overflow: 'auto',}}>
            <StatsTable mobile statKeys={statCategories} preStats={this.state.preStats} postStats={this.state.postStats}/>
          </div>
          {this.renderVideoHighlights()}
        </div>
      </div>
    )
  }

  renderVideoHighlights = () => {
    if (this.state.playerHighlights) {
      return (
        <Container style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:30, marginBottom:60, width:this.props.media === 'tablet' ? '70%' : '100%'}}>
          <div 
            style={{
              padding:12,
              backgroundColor:'#0984e3',
              // textAlign:'center',
              color:'white',
              paddingTop:20,
              paddingBottom:30,
              borderRadius:15,
              boxShadow: "5px 5px 5px #000000",
              width:'100%'
            }}
          >
            <Header
              content="PLAYER HIGHLIGHTS"
              inverted
              style={{
                fontSize: '2em',
                textShadow: "2px 2px 2px black",
                fontFamily: 'ProximaSemiBold',
                margin:0
              }}
            />
            <ReactPlayer url = {this.state.playerHighlights} width={'100%'} height={'30vh'}/> 
          </div>
        </Container>
      )
    } else {
      return (
        <div style={{height:60}}/>
      )
    }
  }

  renderImageQuickStats = () => {

    return (
      <div>
        <div style={{marginLeft:'1em', marginRight:'1em'}}>
          <Header
            content={this.props.playerName}
            inverted
            style={{
              fontSize: '3em',
              fontWeight: 'bold',
              marginTop: '.5em',
              borderBottom: '1px solid white',
              fontFamily: 'ProximaBold, serif',
            }}
          />
        </div>
        <div style={{width:'100%', textAlign:'center', height:this.props.media === 'tablet' ? 400 :'45vh', marginTop:15, justifyContent:'center', display:'flex'}}>
          <img 
            onLoad={() => this.state.playerImageLink && this.setState({isLoading:false})}
            src={this.state.playerImageLink} 
            style={{display:'block', width:this.props.media === 'tablet' ? '70%' :'100%', height:'100%', objectFit:'cover', objectPosition:'50% 0%'}} 
            loading='lazy'
            alt = "brb using imagination since no pics"
          />
        </div>
        </div>
    )
  }

  onLoadDone = () => {
    this.setState({isLoading:false})
  }

  renderNoStatsPage = () => {
    return (
      <NoStats 
        playerName = {this.props.playerName} 
        onLoadDone = {this.onLoadDone}
        media = {this.props.media}
      />
    )
  }   

  renderLogic = () => {
    if(_.isEmpty(this.state.postStats)) {
      return this.renderNoStatsPage()
    } else {
      return this.renderPlayerStats()
    }
  }

  render() {
    return (
      <div 
        key={this.props.playerId + this.props.playerName} 
      >
        {this.renderSearchBar()}
          <div>
            <LoadingSpinner active={this.state.isLoading}/>
            {this.renderLogic()}
          </div>
      </div>
    )
  }
}

export default MobilePlayerStats