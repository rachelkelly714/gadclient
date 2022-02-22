import ViewEthics from "./ViewEthics";
import ViewRL from "./ViewReality";
import ViewFW from "./ViewFW";
import datab from "../../helpers/DB";
import {Component} from 'react'

type allProps = {
    token: string
}

interface AllState {

    postData: Array<object>
    updatePost: { [key: string]: string }
    updateOpen: boolean
    open: boolean

}


class ViewAll extends Component <allProps, AllState>{
constructor(props: allProps) {
    super(props)
    this.state= {
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


  componentDidUpdate(prev: allProps) {
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
        <ViewEthics token={this.props.token} />
        <ViewRL  token={this.props.token}/>
        <ViewFW token={this.props.token} />
                
        )
      </div>
    )
  }









}

export default ViewAll