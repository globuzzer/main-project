import React, { useState, useEffect, fragment } from "react";
import "../css/Home.css";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import LazyLoad from "react-lazyload";
import { HomeValue } from "../components/HomeValue/HomeValue";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { JoinCity } from "../components/JoinCity/JoinCity";
import JoinCityData from "../Data/JoinCityData";
import FeaturedArticle from "../components/FeaturedArticle/FeaturedArticle";
import AuxService from "../components/AuxService/AuxService";
import { OwnSection } from "../components/OwnSection/OwnSection";
import { Footer } from "../components/Footer/Footer";
import { SearchCity } from "../components/SearchCity/SearchCity";
import { JoinCommunity } from "../components/JoinCommunity/JoinCommunity";
import { RequestNewCity } from "../components/RequestNewCity/RequestNewCity";
import useFetchDoc from "../hooks/useFetchDoc";
import useFetchArray from "../hooks/useFetchArray";
import { GetWindowDimension } from "../utils/GetWindowDimension";

export const Home = () => {
  const { width } = GetWindowDimension();
  const [query, setQuery] = useState("");
  const [moreJoinCity, setMoreJoinCity] = useState(false);
  const [joinCity, setJoinCity] = useState(JoinCityData);
  // const { items, loading } = useFetch('landing_live');
  const banners = useFetchArray("banners");
  const texts = useFetchDoc("texts");
  const places = useFetchDoc("places");
  const features = useFetchDoc("features");
  const cities = useFetchArray("cities");
  const articles = useFetchArray("articles");

  const isLoading = () => {
    return (texts.loading || places.loading || features.loading || cities.loading || articles.loading || banners.loading);
  };

  useEffect(() => {
    fetchJoinCityData();
  }, [query, moreJoinCity]);

  const fetchJoinCityData = () => {
    const sorted = JoinCityData.filter((city) => city.name.toLowerCase().includes(query.toLowerCase()));
    moreJoinCity
      ? setJoinCity(
          sorted.sort((a, b) => {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          })
        )
      : setJoinCity(
          sorted.slice(0, 11).sort((a, b) => {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          })
        );
  };

  return (
    <>
      {isLoading() ? <div>Loading...</div>
      : (
        <>
          <LazyLoad>
            <section
              className="section_header"
              id="section_header"
              style={{backgroundImage: `url(${banners.items[0].img})`}}
            >
              <p
                id="header_1"
                style={
                  {...texts.items[0].style, fontSize: width > 1100 ? texts.items[0].style.fontSize : ""}
                }
              >
                {texts.items[0].content}
              </p>
              <p
                id="header_2"
                style={
                  {...texts.items[1].style, fontSize: width > 1100 ? texts.items[1].style.fontSize : ""}
                }
              >
                {texts.items[1].content}
              </p>
              <SearchCity />
              <p id="header_suggestion">
                Maybe{" "}
                <a
                  href={places.items[0].link}
                  style={{color: places.items[0].color}}
                >
                  {places.items[0].text}
                </a>,{" "}
                <a
                  href={places.items[1].link}
                  style={{color: places.items[1].color}}
                >
                  {places.items[1].text}
                </a>
                {" "}
                or{" "}
                <a
                  href={places.items[2].link}
                  style={{color: places.items[2].color}}
                >
                  {places.items[2].text}
                </a>{" "}?
              </p>
            </section>
          </LazyLoad>
          <section className="section_value">
            <HomeValue
              src={features.items[0].image}
              imgCaption={features.items[0].title}
              alt="value"
              imgDescription={features.items[0].text}
            />
            <HomeValue
              src={features.items[1].image}
              imgCaption={features.items[1].title}
              alt="value"
              imgDescription={features.items[1].text}
            />
            <HomeValue
              src={features.items[2].image}
              imgCaption={features.items[2].title}
              alt="value"
              imgDescription={features.items[2].text}
            />
          </section>
          <section className="section_newcity" id="section_newcity">
            {/* <p id="newcity_p">Move to a new city? </p> */}
            <SectionHeader header="What is your next destination? " />
            <div className="newcity_input">
              <FiSearch className="search_icon" />
              <input
                type="text"
                placeholder="Find your city"
                id="newcity_input_city"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="joincity_grid">
              {cities.items.map((cityData, index) => (
                <JoinCity cityData={cityData} key={index} />
              ))}
              {!moreJoinCity && cities.items.length > 0 && (
                <JoinCity
                  cityData={{ name: "Explore more cities" }}
                  isViewMore
                  setMoreJoinCity={setMoreJoinCity}
                />
              )}
              {moreJoinCity && cities.items.length > 0 && <RequestNewCity />}
            </div>
            <div className="no_item">
              {cities.items.length === 0 && <RequestNewCity />}
            </div>
          </section>
          <JoinCommunity />

          <section className="featured_articles" id="featured_articles">
            <SectionHeader header="Featured articles" />
            {articles.items.map(({ title, ...otherProps }) => (
              <FeaturedArticle key={title} title={title} {...otherProps} />
            ))}
            <div className="featured_articles_more">
              <a
                href="https://globuzzer.mn.co/feed?filters=articles"
                className="featured_articles_more_anchor"
              >
                SEE ALL ARTICLES
              </a>
              <MdKeyboardArrowRight className="featured_articles_more_icon" />
            </div>
          </section>
          <section className="aux_services" id="aux_services">
            <SectionHeader header="Helpful services" />
            <AuxService />
          </section>
        </>
      )}
      <OwnSection />
      <Footer />
    </>
  );
};
