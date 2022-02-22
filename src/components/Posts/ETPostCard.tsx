import React, { Component } from 'react';
import EthicPosts, { EthicState } from './Ethics';
import moment from 'moment';
import 'moment-timezone';
import {Button} from 'reactstrap'

// import '../Views/BlogCard.css'
import datab from '../../helpers/DB'

type cardETProps = {
  token: string
  postData: Array<object>
  fetchPost: () => Promise<any>
  editEthicPost: (post: string) => void
  updateOn: () => void
}

interface ETCardState extends EthicState {
  id: number
}

export class PostETCard extends Component<cardETProps, ETCardState> {
  constructor(props: cardETProps) {
    super(props)
    this.state = {
      id: Infinity,
      post: [],
      date: '',
      topicTitle: '',
      postEntry: '',
    }
  }

  deleteETPost = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    await fetch(`${datab}/post/ethics/${id}`, {
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
                          this.props.editEthicPost(post)
                          this.props.updateOn()
                        }}
                      >
                        Update
                      </Button>
                      <Button style={{backgroundColor: '#64b5f6', font: 'Gabriela, serif' }}
                       
                        onClick={e => this.deleteETPost(e, post.id)}
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
            <h3 style={{font: 'Gabriela, serif'}}>For Justice! (whatever that is...)</h3>
          </>
        )}
      </div>
    
    )
  }
}

export default PostETCard