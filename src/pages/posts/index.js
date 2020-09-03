import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.sass";
import { useAuth } from "../../context/auth";

function Posts() {
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [fullText, setFullText] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);

  const {
    authUser,
    authTokens,
    users,
    check,
    setCheck,
    setIsModal,
  } = useAuth();

  function createPost(e) {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${authTokens.token}` },
    };
    axios
      .post(
        "http://localhost:3001/api/v1/posts",
        {
          title: title,
          fullText: fullText,
          description: description,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          setPosts([...posts, { ...res.data }]);
          setIsError(false);
        } else {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  }

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, [check]);

  function deletePost(postId) {
    const deletePostUrl = "http://localhost:3001/api/v1/posts/";
    const config = {
      headers: { Authorization: `Bearer ${authTokens.token}` },
    };
    axios
      .delete(deletePostUrl + postId, config)
      .then((result) => {
        if (result.status === 200) {
          const newPosts = posts.filter((elem) => elem._id !== postId);
          setPosts(newPosts);
          setIsError(false);
        } else {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  }
  return (
    <div className="postContainer">
      <h2>All posts of our Users</h2>
      <div className="postCard">
        <form className="postForm">
          <input
            className="inputPost"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="title"
          />
          <input
            className="inputPost"
            type="text"
            value={fullText}
            onChange={(e) => {
              setFullText(e.target.value);
            }}
            placeholder="fullText"
          />
          <input
            className="inputPost"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="description"
          />
          <button className="createPostButton" onClick={createPost}>
            Create post
          </button>
        </form>
        {isError && <p>Error</p>}
      </div>
      <ul className="checkUsers">
        <li className="postListRadio">
          <input
            type="radio"
            id="All"
            name="list"
            checked={check === ""}
            onChange={() => setCheck("")}
          />
          <label htmlFor="All">All</label>
        </li>
        {users.map(function (elem) {
          return (
            <li key={elem._id + "radio"} className="postListRadio">
              <input
                type="radio"
                id={elem._id}
                name="list"
                checked={check === elem._id}
                onChange={() => setCheck(elem._id)}
              />
              <label htmlFor={elem._id}>{elem.email}</label>
            </li>
          );
        })}
      </ul>

      <ul>
        {posts
          .filter((elem) => (check ? elem.postedBy === check : true))
          .map(function (elem) {
            return (
              <li key={elem._id + "posts"} className="postList">
                title: {elem.title}
                <br />
                fullText: {elem.fullText}
                <br />
                description: {elem.description}
                <br />
                postedBy: {elem.postedBy}
                <br />
                {authUser._id === elem.postedBy ? (
                  <button
                    onClick={() => {
                      setIsModal({
                        isOpen: true,
                        text: "Are you sure you want to delete this post?",
                        action: () => deletePost(elem._id),
                      });
                    }}
                  >
                    Delete post
                  </button>
                ) : (
                  ""
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Posts;
