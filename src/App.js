import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API 
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}/>
        
        <Routes>
          <Route exact path="/home" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize={20} country='in' category="general"/>}/>
          <Route exact path="/general"  element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={20} country='in' category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={20} country='in' category="business"/>}/>
          <Route exact path="/entertainment"  element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={20} country='in' category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize={20} country='in' category="health"/>}/>
          <Route exact path="/science"  element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={20} country='in' category="science"/>}/>
          <Route exact path="/sports"  element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={20} country='in' category="sports"/>}/>
          <Route exact path="/technology"  element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={20} country='in' category="technology"/>}/>

        </Routes>
        </Router>
        

      </div>
    )
  }
}

