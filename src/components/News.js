import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps ={
        country:'in',
        pageSize:8,
        category:"general"
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
        
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading: false,
            page:1,  
            totalResults: 0
        }
        document.title= `${this.capitilizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    capitilizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews(){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data= await fetch(url);
        this.props.setProgress(30);
        let parsedData= await data.json() 
        this.props.setProgress(50);
        this.setState({
            totalResults:parsedData.totalResults,
            articles: parsedData.articles,
            loading: false
        })
        this.props.setProgress(100);

    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8960be4928984f36ac1470571159ee86&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json()
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false})
    }


    handlePrevClick=async()=>{
        this.setState({page: this.state.page -1});
        this.updateNews();
    }
    
    handleNextClick= async ()=>{
        this.setState({page:this.state.page + 1})
        this.updateNews();

        }

    fetchMoreData = async() => {
        this.setState({page:this.state.page +1})
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8960be4928984f36ac1470571159ee86&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data= await fetch(url);
        let parsedData= await data.json() 
        this.setState({
            totalResults:parsedData.totalResults,
            articles: this.state.articles.concat(parsedData.articles),
            loading: false
        })
        
        };    

  render() { 
    return (
        <>
      
        <h2 className="text-center">NewsMonkey- Top Headlines</h2>
        {/*{this.state.loading && <Spinner />}*/}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
            <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
                return             <div className="col-md-3" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage?element.urlToImage:"https://static.toiimg.com/thumb/msid-107879027,width-1070,height-580,imgsize-1284695,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} newsUrl={element.url}  author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                </div>


            })}  </div>  
            </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark mx-3" onClick={this.handlePrevClick}>Previous</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" id='senBtn' onClick={this.handleNextClick}>Next</button>
        </div>*/}


    </>
    )
  }
}

export default News