import React, { Component } from 'react';
import RealityPosts, { RealityState } from './Reality';
import moment from 'moment';
import 'moment-timezone';
import {Button} from 'reactstrap'
import datab from '../../helpers/DB'

type cardRLProps = {
  token: string
  postData: Array<object>
  fetchPost: () => Promise<any>
  editRealPost: (post: string) => void
  updateOn: () => void
}

interface RLCardState extends RealityState {
  id: number
}

export class PostRLCard extends Component<cardRLProps, RLCardState> {
  constructor(props: cardRLProps) {
    super(props)
    this.state = {
      id: Infinity,
      post: [],
      date: '',
      topicTitle: '',
      postEntry: '',
    }
  }

  deleteRLPost = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    await fetch(`${datab}/post/reality/${id}`, {
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
                  moment(data["started"].toString().dateFormat)
                  </p>
                  <p>
                    {post.topicTitle}
                  </p>
                  <p >
                    {post.entry}
                    <div >
                      <Button
                       style={{backgroundColor: '#64b5f6', font: 'Gabriela, serif' }}
                        
                        onClick={() => {
                          this.props.editRealPost(post)
                          this.props.updateOn()
                        }}
                      >
                        Update
                      </Button>
                      <Button style={{backgroundColor: '#64b5f6', font: 'Gabriela, serif' }}
                       
                        onClick={e => this.deleteRLPost(e, post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </p>
                </div>
              )
            })}
          </>
        ) : (
          <>
            <h3 style={{font: 'Gabriela, serif'}}>Red pill or blue pill?</h3>
          </>
        )}
      </div>
    
    )
  }
}

export default PostRLCard