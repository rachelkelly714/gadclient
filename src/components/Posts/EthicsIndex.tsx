import React, { Component } from 'react'
import PostETCard from './ETPostCard'
import EthicPosts from './Ethics'
import UpdateEthic from './EditEthics'
import datab from '../../helpers/DB'

type etIndexProps = {
  token: string
}

interface ETIndexState {

  postData: Array<object>
  updatePost: { [key: string]: string }
  updateOpen: boolean
  open: boolean
}

class ETPostIndex extends Component<etIndexProps, ETIndexState> {
  constructor(props: etIndexProps) {
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

  componentDidUpdate(prev: etIndexProps) {
    if (prev.token !== this.props.token) {
      this.fetchPost()
    }
  }

  editEthicPost = (post: any) => {
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
        <EthicPosts 
        token={this.props.token} 
        fetchPost={this.fetchPost} />
        <PostETCard
          token={this.props.token}
          postData={this.state.postData}
          fetchPost={this.fetchPost}
          editEthicPost={this.editEthicPost}
          updateOn={this.updateOn}
        />
        {this.state.updateOpen ? (
          <UpdateEthic
            token={this.props.token}
            fetchPost={this.fetchPost}
            updateEthPost={this.state.updatePost}
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

export default ETPostIndex;