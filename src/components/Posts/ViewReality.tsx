import  { Component } from 'react'
import PostRLCard from './RLPostCard'
import RealityPosts from './Reality'
import UpdateReality from './EditReality'
import APIURL from '../../helpers/DB'

type viewRLProps = {
  token: string
}

type RLIndexState = {

  postData: Array<object>
  updatePost: { [key: string]: string }
  updateOpen: boolean
  open: boolean
}

class ViewRL extends Component<viewRLProps, RLIndexState> {
  constructor(props: viewRLProps) {
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
        const response = await fetch(`${APIURL}/post/reality/my`, {
          method: 'GET',
          mode: 'cors',
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


  componentDidUpdate(prev: viewRLProps) {
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
        <RealityPosts token={this.props.token} fetchPost={this.fetchPost} />
        <PostRLCard
          token={this.props.token}
          postData={this.state.postData}
          fetchPost={this.fetchPost}
          editRealPost={this.editPost}
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

export default ViewRL