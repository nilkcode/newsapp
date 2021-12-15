import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'



export class News extends Component {


    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
       country:PropTypes.string,
       pageSize:PropTypes.number,
       category:PropTypes.string,
    }

    constructor() {
        super()

        this.state = {
            article: [],
            loading: false,
            page:1,
        }
   }

   async updateNewsPage() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=335ba5fd43e6475ba7100620daf57b27&page=${this.state.page}Size=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData);
    this.setState({article:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
   }

   async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=335ba5fd43e6475ba7100620daf57b27&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // console.log(parsedData);
        // this.setState({article:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
        
        //....please refere above code for pratice coding this is working code for refactoring it comment --/
  
        this.updateNewsPage();
   }

   // note :: async function wait inside the body of await to resolve some promises

   handlePreviouseClick = async() => {
        console.log("next click working")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=335ba5fd43e6475ba7100620daf57b27&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
    

        // this.setState ({
        //     page:this.state.page - 1,
        //     article:parsedData.articles,
        //     loading:false,
        // })
        this.setState({page:this.state.page - 1,})
        this.updateNewsPage();
   }
  
   handleNextClick = async() => {
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
       
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=335ba5fd43e6475ba7100620daf57b27&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
       
    //     console.log(parsedData);
    
    //     this.setState ({
    //         page:this.state.page + 1,
    //         article:parsedData.articles,
    //         loading:false,
    //     })
    // }
    this.setState({page:this.state.page + 1,})
    this.updateNewsPage();
   
  }

  render() {
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

   
    return (
      <>
        
        <div className="container ">
        <h2 className="mt-3 mb-1">Top Headlines - From News World</h2>
         <div className="text-center">{this.state.loading && <Spinner/>} </div>
        <div className="my-4  d-flex justify-content-between flex-wrap"> 
           
            {!this.state.loading && this.state.article.map((newselement) =>{
                return  <NewsItem  key={newselement.url} title={newselement.title? newselement.title.slice(0, 50): ""} description={newselement.description? newselement.description.slice(0,60):""} imageUrl={newselement.urlToImage ===null ? "https://images.moneycontrol.com/static-mcnews/2021/08/fandosensexniftyderivative-770x433.jpg":newselement.urlToImage}   newsUrl={newselement.url}
                author={newselement.author} date={newselement.publishedAt} source={newselement.source.name} />
            })}
        </div>  
        

        <nav aria-label="Page navigation example " className="d-flex justify-content-end">
           <button disabled={this.state.page <= 1}  type="button" className="btn btn-dark mx-2" onClick={this.handlePreviouseClick}>Previouse</button>
           <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)} className="btn btn-dark mx-2"  type="button" onClick={this.handleNextClick}>Next</button>
        </nav>
        </div>
      
      </>
    )
  }
}

export default News
