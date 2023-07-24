import React, { useEffect, useState } from 'react';
import './comments.css';
import commentList from '../data-src/commentList.js';
import Comment from './comment'

const Comments = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(commentList);
  }, [])

  const handleAddComment = (newComment) => {
    const tempList = [...list];
    tempList.map((ob) => {
      return addNestedCmts(ob, newComment)
    })
    setList(tempList);
  };

  const addNestedCmts = (comment, newComment) => {
    if (comment.id === newComment.parentId) {
      comment.nestedComments = [newComment];
      return
    } else if (comment.nestedComments && comment.nestedComments.length > 0) {
      comment.nestedComments.map((cmnts) => {
        return addNestedCmts(cmnts, newComment);
      })
    };
  }

  const removeNestedComments = (comment, removeComment) => {
    if (comment.id === removeComment.parentId) {
      delete comment.nestedComments;
      return
    } else if (comment.nestedComments && comment.nestedComments.length > 0) {
      comment.nestedComments.map((cmnts) => {
        return removeNestedComments(cmnts, removeComment);
      })
    }
  }

  const removeComment = (deletecomment) => {
    const tempList = [...list];
    tempList.map((ob, i) => {
      if (ob.id === deletecomment.id) {
        return tempList.splice(i,1);
      } else {
        return removeNestedComments(ob, deletecomment, i)
      }
    })
    setList(tempList);
  }

  
  const getComments = (comments) => {
    return <>
      {comments.length > 0 && comments.map((comment) => {
      return (
       <>
         <Comment key={comment.id} comment={comment} addReplyComm={handleAddComment} deleteCommentCurr={removeComment} />
         {comment.nestedComments && <div className='nested-comment'>
           {comment.nestedComments && comment.nestedComments.length > 0 && comment.nestedComments.map((cmnt) => {
             return getComments([cmnt]);
           })}
         </div>}
       </>
      )
      })}
    </>
  };

  return (
    <div>
      {list.length > 0 && getComments(list)}
    </div>
  )
}

export default Comments;