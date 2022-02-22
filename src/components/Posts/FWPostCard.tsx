import React, { Component } from 'react';
import FreewillPosts, { FwillState } from './Freewill';
import moment from 'moment';
import 'moment-timezone';


import datab from '../../helpers/DB'

type cardFWProps = {
  token: string
  postData: Array<object>
  fetchPost: () => Promise<any>
  editFWPost: (post: string) => void
  updateOn: () => void
}

interface FWCardState extends FwillState {
  id: number
}

export class PostFWCard extends Component<cardFWProps, FWCardState> {
  constructor(props: cardFWProps) {
    super(props)
    this.state = {
      id: Infinity,
      post: [],
      date: '',
      topicTitle: '',
      postEntry: '',
    }
  }

  deleteFWPost = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    await fetch(`${datab}/post/freewill/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
    return this.props.fetchPost() 
  }

  render() {
    let dateFormat = 'MM/DD/YYYY'
    return (
      <div>
        {this.props.postData.length > 0 ? (
          <>
            {this.props.postData.map((post: any, index: number) => {
              return (
                <div
                  key={index}
                 
                >
                  <p>
                    {moment(post.data["started"].toString().dateFormat)}
                 
                  </p>
                  <p>
                    {post.topicTitle}
                  </p>
                  <p >
                    {post.postEntry}
                    <div >
                      <button
                        
                        onClick={() => {
                          this.props.editFWPost(post)
                          this.props.updateOn()
                        }}
                      >
                        Update
                      </button>
                      <button
                       
                        onClick={e => this.deleteFWPost(e, post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </p>
                </div>
              )
            })}
          </>
        ) : (
          <>
            <h3>Test Your Will!</h3>
          </>
        )}
      </div>
      // </div>
    )
  }
}

export default PostFWCard