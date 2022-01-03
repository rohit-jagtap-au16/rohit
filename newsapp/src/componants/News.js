import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=1f3d98a648764eeeb4a1401c5d014c2c&page=1&pageSize=20";
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })
    }
    handelPrevClick = async () => {
        console.log("this is prev click")
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1f3d98a648764eeeb4a1401c5d014c2c&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles
        })
    }
    handelNextClick = async () => {
        console.log("this is next click")
        if (this.state.page + 1 >Math.ceil( this.state.totalResults / 20)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1f3d98a648764eeeb4a1401c5d014c2c&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parseData = await data.json()
            console.log(parseData);
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey - TOP HEADLINES</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handelPrevClick} > &larr;Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
