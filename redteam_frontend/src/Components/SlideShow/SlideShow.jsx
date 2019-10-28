import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../SlideShow/slideShow.css';
/**
 * This component handles the rendering
 * of a slideshow for 3 products
 */
export default class SlideShow extends Component {
    render() {
        const { data } = this.props
        return (
            <div id="slideshow">
                {data ?
                    data.length > 0 ?
                        <Carousel wrap='true' interval='2000' indicators='false' className="carousel">
                            <Carousel.Item>
                                <img id="slide-img"
                                    src={data[0].url}
                                    alt="First slide"
                                />
                                <Carousel.Caption >
                                    <h3 className="slide-caption-basketball">{data[0].name}</h3>
                                    <p className="slide-caption-basketball">{data[0].description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item >
                                <img id="slide-img"
                                    src={data[2].url}
                                    alt="Second slide"
                                />
                                <Carousel.Caption >
                                    <h3 className="slide-caption-shoe">{data[2].name}</h3>
                                    <p className="slide-caption-shoe">{data[2].description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item >
                                <img id="slide-img"
                                    src={data[1].url}
                                    alt="Third slide"
                                />
                                <Carousel.Caption >
                                    <h3 className="slide-caption-basketball">{data[1].name}</h3>
                                    <p className="slide-caption-basketball">{data[1].description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        : <p>Error fetching products</p>
                    : <p>Loading...</p>
                }
            </div>
        )
    }
}
