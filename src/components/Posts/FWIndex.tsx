import React, { Component } from 'react'
import PostFWCard from './FWPostCard'
import FreewillPosts from './Freewill'
import UpdateFW from './EditFW'
import datab from '../../helpers/DB'

type fwIndexProps = {
  token: string
}

interface FWIndexState {

  postData: Array<object>
  updatePost: { [key: string]: string }
  updateOpen: boolean
  open: boolean
}

class FWPostIndex extends Component<fwIndexProps, FWIndexState> {
  constructor(props: fwIndexProps) {
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

  componentDidUpdate(prev: fwIndexProps) {
    if (prev.token !== this.props.token) {
      this.fetchPost()
    }
  }

  editFWPost = (post: any) => {
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
        <FreewillPosts 
        token={this.props.token} 
        fetchPost={this.fetchPost} />
        <PostFWCard
          token={this.props.token}
          postData={this.state.postData}
          fetchPost={this.fetchPost}
          editFWPost={this.editFWPost}
          updateOn={this.updateOn}
        />
        {this.state.updateOpen ? (
          <UpdateFW
            token={this.props.token}
            fetchPost={this.fetchPost}
            updateFWPost={this.state.updatePost}
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

export default FWPostIndex;