import { Component } from 'react'
import PostETCard from './ETPostCard'
import EthicPosts from './Ethics'
import { editEthicsProps } from './EditEthics'
import UpdateEthic from './EditEthics'
import datab from '../../helpers/DB'

type viewEProps = {
  token: string
}

interface EthicIndexState {

  postData: Array<object>
  updatePost: { [key: string]: string }
  updateOpen: boolean
  open: boolean
}

class ViewEthics extends Component<viewEProps, EthicIndexState> {
  constructor(props: viewEProps) {
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
        const response = await fetch(`${datab}/post/ethics/my`, {
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


  componentDidUpdate(prev: viewEProps) {
    if (prev.token !== this.props.token) {
      this.fetchPost()
    }
  }

  editPost = (post: any) => {
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
        <EthicPosts token={this.props.token} fetchPost={this.fetchPost} />
        <PostETCard
          token={this.props.token}
          postData={this.state.postData}
          fetchPost={this.fetchPost}
          editEthicPost={this.editPost}
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

export default ViewEthics