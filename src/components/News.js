import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const  News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const  titleCase = (string) => {
      return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }
   document.title = `${titleCase(props.category)} - News World`
   const  updateNewsPage   = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(20)
    let parsedData = await data.json();
    props.setProgress(50)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
   }

   useEffect(() => {
    updateNewsPage();
    
   },[])


   // note :: async function wait inside the body of await to resolve some promises

  // const handlePreviouseClick = async() => {
  //        setPage(page-1);
       
  //       updateNewsPage();
  //  }
  
  //  const handleNextClick = async() => {
   
  //   setPage(page+1);
  //   updateNewsPage();
   
  // }

   const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
  };

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return (
      <>
        <div className="container ">
        <h2 className="mt-3 mb-1">{`News World - ${titleCase(props.category)}`}</h2>
       
    
         <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
              >
              <div className="my-4  d-flex justify-content-between flex-wrap"> 
                  
                  { articles.map((newselement) =>{
                      return  <NewsItem  key={newselement.url} title={newselement.title? newselement.title.slice(0, 50): ""} description={newselement.description? newselement.description.slice(0,60):""} imageUrl={newselement.urlToImage ===null ? "https://images.moneycontrol.com/static-mcnews/2021/08/fandosensexniftyderivative-770x433.jpg":newselement.urlToImage}   newsUrl={newselement.url}
                      author={newselement.author} date={newselement.publishedAt} source={newselement.source.name} />
                  })}
              </div>  
       </InfiniteScroll>

      
        </div>
      
      </>
    )
 
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
  
}

News.propTypes = {
 country:PropTypes.string,
 pageSize:PropTypes.number,
 category:PropTypes.string,
}

export default News



