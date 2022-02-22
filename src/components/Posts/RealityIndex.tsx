import React, { Component } from 'react'
import PostRLCard from './RLPostCard'
import RealityPosts from './Reality'
import UpdateReality from './EditReality'
import datab from '../../helpers/DB'

type RLIndexProps = {
  token: string
}

interface RLIndexState {

  postData: Array<object>
  updatePost: { [key: string]: string }
  updateOpen: boolean
  open: boolean
}

class RLPostIndex extends Component<RLIndexProps, RLIndexState> {
  constructor(props: RLIndexProps) {
    super(props)
    this.state = {
      postData: [],
      open: true,
      updateOpen: false,
      updatePost: {},
    }
  }

  fetchPost = async () => {
    if (this.props.token) {
      try {
        const response = await fetch(`${datab}/post/my`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
          },
        })
        const data = await response.json()
        this.setState({ postData: data })
        return data
      } catch (err) {
        console.log(err)
      }
    }
  }

  componentDidMount = () => {
    this.fetchPost()
  }

  componentDidUpdate(prev: RLIndexProps) {
    if (prev.token !== this.props.token) {
      this.fetchPost()
    }
  }

  editRealPost = (post: any) => {
    this.setState({ updatePost: post })
  }

  updateOn = () => {
    this.setState({ updateOpen: true })
  }

  updateOff = () => {
    this.setState({ updateOpen: false })
  }

  render() {
    return (
      <div>
        <RealityPosts 
        token={this.props.token} 
        fetchPost={this.fetchPost} />
        <PostRLCard
          token={this.props.token}
          postData={this.state.postData}
          fetchPost={this.fetchPost}
          editRealPost={this.editRealPost}
          updateOn={this.updateOn}
        />
        {this.state.updateOpen ? (
          <UpdateReality
            token={this.props.token}
            fetchPost={this.fetchPost}
            updateRealPost={this.state.updatePost}
            updateEnd={this.updateOff}
            open={this.state.open}
          />
        ) : (
          <></>
        )}
      </div>
    )
  }
}

export default RLPostIndex;