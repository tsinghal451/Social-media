import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPost, action) => {
  let newPostList = currPost;
  if (action.type === "DELETE") {
    newPostList = currPost.filter((post) => post.id !== action.payload.postId);
  } else if (action.type == "ADD") {
    newPostList = [action.payload, ...currPost];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reaction: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE",
      payload: {
        postId,
      },
    });
  };

  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );
  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Go to mumbai",
    body: "hi firends i am hoing to adf",
    reaction: 100,
    userId: "user-9",
    tags: ["vaction", "travel"],
  },
  {
    id: "2",
    title: "Go to mumbai",
    body: "hi firends i am hoing to adf",
    reaction: 1200,
    userId: "user-3",
    tags: ["vaction", "travel"],
  },
];

export default PostListProvider;
