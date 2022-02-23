import ViewEthics from "./ViewEthics";
import ViewRL from "./ViewReality";
import ViewFW from "./ViewFW";
import datab from "../../helpers/DB";
import {Component} from 'react'
import {Button, Col, FormGroup, Label,  Input, FormText, Form} from 'reactstrap'

type allProps = {
    token: string
  
}

interface AllState {

    postData: Array<object>
    updatePost: { [key: string]: string }
    updateOpen: boolean
    open: boolean
    username: string

}


class ViewAll extends Component <allProps, AllState>{
constructor(props: allProps) {
    super(props)
    this.state= {
        postData: [],
      open: true,
      updateOpen: false,
      updatePost: {},
      username: ''
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

<Form>
  <FormGroup row>
    <Label
      for="username"
      sm={2}
    >
      Name/Username
    </Label>
    <Col sm={10}>
      <Input
        id= "username"
        name="username"
        placeholder="What should we call you?"
        type="text"
      />
    </Col>
  </FormGroup>
  
 
  
  <FormGroup row>
    <Label
      for="textbox"
      sm={2}
    >
      Tell Us About Yoursef. 
    </Label>
    <Col sm={10}>
      <Input
        id="text"
        name="text"
        type="text"
      />
    </Col>
  </FormGroup>
 
  
 
  <FormGroup
 
    row
  >
    <Col
      sm={{
        offset: 2,
        size: 10
      }}
    >
      <Button>
        Save
      </Button>
    </Col>
  </FormGroup>
</Form>

<hr />
<div className="lower-half">
<p>Your Posts</p>

<ViewEthics token={this.props.token} />
<ViewRL token={this.props.token}/>
        <ViewFW token={this.props.token} />
     </div>   

     </div>    
     
     



        )

  }
  }











export default ViewAll