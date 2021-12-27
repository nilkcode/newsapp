import React from 'react'

const  NewsItem = (props) => {
   
        let{title , description,imageUrl ,newsUrl,author,date,source } = props;
        const a = date;
        const d = new Date(a);
        const publishDate = d.toGMTString();

        return (
            <div >
               
               <div className="card my-2 width-card" >
               <span className="badge badge-success" style={{'background':'#39b939','position':'absolute'}}>{source}</span>

                <img className="card-img-top" src={imageUrl} alt="Card cap"/>
                <div className="card-body">
              
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                   
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" >Read More</a>
                    <p className="card-text"><small className="text-muted">By {!author ?"Unknown":author} on {publishDate}  </small></p>

                </div>
                </div>
            </div>
        )
 
}

export default NewsItem
