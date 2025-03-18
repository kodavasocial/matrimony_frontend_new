import { memo } from "react";
import './Stories.css'
import { baseUrl } from "../Utils/ApiUrl";
import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';

const Stories = ({ storiesList }) => {
    const [readMore, setReadMore] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(1);
    const [getStory, setGetStory] = useState()
    const handlePrevClick = () => {
        setActiveItemIndex(Number(activeItemIndex) > 1 ? Number(activeItemIndex) - 1 : 1);
    };
    const fullStory = (e)=>{
        let storyIndex = e.target.getAttribute('data-index');
        setReadMore(true);
        setGetStory(storiesList[storyIndex])
    }

    const handleNextClick = () => {
        setActiveItemIndex(storiesList.length - 2  > activeItemIndex ? Number(activeItemIndex) + 1 : activeItemIndex);
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    return (
        <>
            <h3 className="mt-4 succes text-center">Success Stories</h3>
            {readMore ?
                <>
                    <div>
                        <div className="pmd-card-media text-center my-3">
                            <img className="story-img img-fluid" style={{ width: 'auto' }} src={baseUrl + getStory.image} alt="image here" />
                        </div>
                        <div className="card-body text-cente p-3">
                            <h2 className="card-title text-center">{getStory.title}</h2>
                            <p className="card-text ">{getStory.content}<a className="ml-1 card-span text-center" onClick={()=>{setReadMore(false)}}>Back</a></p>
                        </div>
                    </div>
                </>
                :
                <>
                    <ItemsCarousel
                        infiniteLoop={false}
                        gutter={12}
                        activePosition={'center'}
                        chevronWidth={60}
                        disableSwipe={false}
                        alwaysShowChevrons={false}
                        numberOfCards={3}
                        slidesToScroll={1}
                        outsideChevron={false}
                        showSlither={false}
                        firstAndLastGutter={true}
                        activeItemIndex={activeItemIndex}
                        requestToChangeActive={value => this.setState({ activeItemIndex: value })}
                    // rightChevron={'>'}
                    // leftChevron={'<'}
                    >
                        {storiesList?.length > 0 && storiesList?.map((story, index) => (
                            <div className="item mr-4 mt-3" key={index}>
                                <div className="card p-0 pmd-card" style={{ position: "relative" }}>
                                    <div className="pmd-card-media text-center">
                                        <img className="story-img img-fluid" src={baseUrl + story.image} alt="image here" />
                                    </div>
                                    <div className="card-body text-cente p-3">
                                        <h2 className="card-title">{story.title}</h2>
                                        <p className="card-text ">{story.content.slice(0, 150)}<a className="ml-1 card-span" data-index={index} onClick={fullStory}>Read more</a></p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </ItemsCarousel>
                    <div className="text-center my-3 ">
                        <button className="previous mr-3" onClick={handlePrevClick}><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                        <button className="next" onClick={handleNextClick}><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </>}
        </>
    )
}

export default memo(Stories)