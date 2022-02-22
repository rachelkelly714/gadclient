import { Component } from 'react'
import PostFWCard from './FWPostCard'
import FreewillPosts from './Freewill'
import { editFWProps } from './EditFW'
import UpdateFW from './EditFW'
import datab from '../../helpers/DB'

type viewFWProps = {
  token: string
}

interface FWIndexState {

  postData: Array<object>
  updatePost: { [key: string]: string }
  updateOpen: boolean
  open: boolean
}

class ViewFW extends Component<viewFWProps, FWIndexState> {
  constructor(props: viewFWProps) {
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
        const response = await fetch(`${datab}/post/freewill/my`, {
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


  componentDidUpdate(prev: viewFWProps) {
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
        <FreewillPosts token={this.props.token} fetchPost={this.fetchPost} />
        <PostFWCard
          token={this.props.token}
          postData={this.state.postData}
          fetchPost={this.fetchPost}
          editFWPost={this.editPost}
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

export default ViewFW