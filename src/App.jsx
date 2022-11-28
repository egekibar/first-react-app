import {useState,useEffect} from "react";
import classNames from 'classnames'
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function App() {
  let [posts, setPosts] = useState(false);

  let [postId, setPostId] = useState(1);
  let [post, setPost] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(data => setPosts(data))

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data))

    return () => {
      console.log('destroyed')
    }
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data))
  }, [postId]);

  const [animationParent] = useAutoAnimate()

  return (
    <>
      <h1 className="p-4 text-center font-bold text-6xl">Selam React</h1>
      <div className="flex justify-center items-center">
        <button onClick={() => setPostId( postId => postId+1 )} className="bg-red-300 px-5 py-3 rounded-lg border border-red-600 hover:bg-red-400 transition ease-in-out text-red-700 hover:text-red-100">
          +
        </button>
        <div className="mx-2 bg-red-400 text-white p-3 rounded-lg">{postId}</div>
        <button onClick={() => setPostId( postId => postId-1 )} disabled={postId == 1} className="disabled:pointer-events-none disabled:opacity-50 bg-red-300 px-5 py-3 rounded-lg border border-red-600 hover:bg-red-400 transition ease-in-out text-red-700 hover:text-red-100">
          -
        </button>
      </div>
      <div ref={animationParent}>
        {
            post && (<>
              <div id="post" key={post.id} className="container mx-auto py-12 px-20">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  { post.title }
                </h5>
                <p className="font-normal text-gray-700">
                  { post.body }
                </p>
              </div>
            </>)
        }
      </div>
      <div ref={animationParent} className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {
            posts && posts.map((post) => {
              if (post.id != postId ){
                return (
                    <a href="#post" onClick={() => setPostId( postId => post.id )} key={post.id}
                       className={classNames({
                         "cursor-pointer rounded-xl bg-red-50 overflow-hidden shadow-lg": true,
                         "ring ring-red-300": post.id == postId
                       })}>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{post.title}</div>
                        <p className="text-gray-700 text-base">{post.body}</p>
                      </div>
                    </a>
                )
              }
            })
        }
      </div>
    </>
  )
}
