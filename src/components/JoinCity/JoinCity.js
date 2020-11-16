import React from "react";
import LazyLoad from "react-lazyload";
import "./style.css";
import { Link } from "react-router-dom";

const Loading = () => (
    <div>
        <h5>Loading</h5>
    </div>
);

export const JoinCity = (props) => {
    const {cityData, isViewMore, setMoreJoinCity} = props;
    const {name, img, members} = cityData;

    return (
        <LazyLoad placeholder={<Loading />}>
            <div
                className="joincity_container"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundColor: isViewMore ? "#F24B6A" : null,
                }}
            >
                <p
                    id="joincity_name"
                    style={{
                        textAlign: isViewMore && "center",
                    }}
                >
                    {name}
                </p>
                {isViewMore ? (
                    <button
                        onClick={() => {
                            setMoreJoinCity(true);
                        }}
                        type="button"
                        id="joincity_viewmore"
                    >
                        View More
                    </button>
                ) : (
                    <button type="button" id="joincity_join">
                       <Link to='/Helsinki'>Explore</Link> 
                    </button>
                )}

                {!isViewMore && <p id="joincity_members">{members} members</p>}
            </div>
        </LazyLoad>
    );
};
