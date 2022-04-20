import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
// import firebase from "firebase";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [sharedImg, setSharedImg] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not a image, the file is a ${typeof image}`);
      return;
    }
    setSharedImg(image);
  };
  const switchAssetArea = (area) => {
    setVideoLink("");
    setSharedImg("");
    setAssetArea(area);
  };
  const getTime = () => {
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString =
      currentDayOfMonth + "/" + (currentMonth + 1) + "/" + currentYear;
    return dateString;
  };
  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: sharedImg,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: getTime(),
    };
    console.log(payload);
    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    setVideoLink("");
    setSharedImg("");
    setAssetArea("");
    setEditorText("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a Post</h2>
              <button onClick={(e) => reset(e)}>X</button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user ? props.user.displayName : ""}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What you are going to talk about"
                  autoFocus={true}
                ></textarea>

                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label
                        htmlFor="file"
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.6)",
                          padding: "8px",
                          borderRadius: "10px",
                        }}
                      >
                        Select an image to share
                      </label>
                    </p>
                    {sharedImg && <img src={URL.createObjectURL(sharedImg)} />}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please Input a video link"
                        onChange={(e) => setVideoLink(e.target.value)}
                        style={{
                          margin: "auto",
                          display: "block",
                          padding: "8px",
                          border: "1px solid rgba(0, 0, 0, 0.6)",
                          borderRadius: "10px",
                        }}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <i class="fa-solid fa-image"></i>
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <i class="fa-solid fa-video"></i>
                </AssetButton>
              </AttachAssets>
              <SharedComment>
                <AssetButton>
                  <i class="fa-brands fa-rocketchat"></i> Anyone
                </AssetButton>
              </SharedComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  color: black;
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 100%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.15);
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  background: transparent;
  vertical-align: baseline;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.6);
  margin: 0 8px;
  border-radius: 20px;
  height: 40px;
  width: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
`;
const SharedComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    width: auto;
    padding: 0 8px;
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2"};
  border: none;
  color: white;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.8)" : "#004182"};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;

  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: none;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(PostModal);
