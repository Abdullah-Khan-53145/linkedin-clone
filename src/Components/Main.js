import { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import { getArticleAPI } from "../actions";
import ReactPlayer from "react-player";
const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  useEffect(() => {
    props.getArticles();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("open");
        break;
    }
  };
  return (
    <>
      <Container>
        <Sharebox>
          {}
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button
              disabled={props.loading ? true : false}
              onClick={handleClick}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src="./images/photo-icon.png" alt="" />
              <span>photo</span>
            </button>

            <button>
              <img src="./images/photo-icon.png" alt="" />

              <span>videos</span>
            </button>
            <button>
              <img src="./images/photo-icon.png" alt="" />
              <span>Event</span>
            </button>
            <button>
              <img src="./images/photo-icon.png" alt="" />
              <span>Article</span>
            </button>
          </div>
        </Sharebox>
        <Content>{props.loading && <Spinner />}</Content>
        <div>
          {props.articles.length === 0 ? (
            <p>No articles to show</p>
          ) : (
            props.articles.map((article, key) => {
              return (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title} </span>
                        <span>{article.actor.description} </span>
                        <span>{article.actor.date} </span>
                      </div>
                    </a>
                    <button>
                      <img src="images/dots.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description} </Description>
                  {article.sharedImg !== "" ? (
                    <SharedImg>
                      <a>
                        <img src={article.sharedImg} alt="" />
                      </a>
                    </SharedImg>
                  ) : (
                    article.video !== "" && (
                      <SharedImg>
                        <a>
                          <ReactPlayer width={"100%"} url={article.video} />
                        </a>
                      </SharedImg>
                    )
                  )}

                  <SocialCounts>
                    <li>
                      <button>
                        <img
                          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                          alt=""
                        />
                        <img
                          src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                          alt=""
                        />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>2 comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img
                        src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                        alt=""
                      />
                      <span>Like</span>
                    </button>
                    <button>
                      <img
                        src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                        alt=""
                      />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img
                        src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                        alt=""
                      />
                      <span>Share</span>
                    </button>
                  </SocialActions>
                </Article>
              );
            })
          )}
        </div>
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`;
const Sharebox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.55;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 2px solid rgba(0, 0, 0, 0.15);
        background-color: right;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;

      justify-content: space-between;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
          width: 35px;
          border-radius: 50%;
          margin-right: 8px;
        }
        span {
          color: #78b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 12px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    width: 25px;
    top: 0;
    border: none;
    outline: none;
    background: transparent;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      border: none;
      display: flex;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    color: #0a66c2;
    @media (min-width: 768px) {
      margin-left: 8px;
    }
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Main);
