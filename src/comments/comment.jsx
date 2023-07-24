import React, { useState } from 'react';
import './comment.css';

const Comment = (props) => {
  const { comment, addReplyComm, deleteCommentCurr } = props;
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');
  console.log(comment);

  const getId = () => {
    if (comment.nestedComments && comment.nestedComments.length > 0) {
      const lastComment =  comment.nestedComments[comment.nestedComments.length - 1];
      return lastComment.id
    } else {
      return comment.id;
    }
  }

  const addReply = () => {
    addReplyComm({
      id: Math.floor(Math.random() * 100),
      name: comment.nestedComments && comment.nestedComments.length > 0 ? 'Computer2' : 'Computer',
      parentId: getId(),
      Text: text
    });
    setShowInput(false);
  };

  const deleteComment = (cmts) => {
    deleteCommentCurr(cmts);
  };

  return (
    <>
      <div className='container'>
        <div>
          <h3>{comment.name}</h3>
          <p>{comment.Text}</p>
        </div>
        <div className='action-btns'>
          <p onClick={() => setShowInput((bool) => !bool)}>Reply</p>
          <p onClick={() => deleteComment(comment)}>Delete</p>
        </div>
      </div>
      {showInput && <div className='input'>
        <input type='text' onChange={(e) => setText(e.target.value)} autoFocus/>
        <button disabled={text.length > 0 ? false : true} onClick={() => addReply()}>Reply</button>
      </div>}
    </>
  )
}

export default Comment