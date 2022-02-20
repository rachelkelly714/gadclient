import {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import datab from '../helpers/DB';



type Fetchprops = {
  sessionToken: string
 
}

export interface TopicsState {
 
  topics: string;
  description: string;


}

class Topics extends Component<Fetchprops, TopicsState> {
  constructor(props: Fetchprops) {
    super(props)
    this.state = {
      topics: '',
      description: '',
         
     
    
    }
  }

  newTopic = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const response = await fetch(`${datab}/topics`, {
        method: 'POST',
        body: JSON.stringify({
         topics: this.state.topics,
         description: this.state.description
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      })
      await response.json()
 
      this.setState({
        topics: '',
        description: ''
      })
     
    } catch (err) {
      console.log(err)
    }
  }

  
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState(({ [name]: value } as unknown) as Pick<TopicsState, keyof TopicsState>)
  }

render () {
    return (
        <div>  
        <div className="Topics">
        <h2>Create a Topic!</h2>
        <Form className="form">
          <FormGroup>
            
            <Label for="createTopic">Topic</Label>
            <Input
              type="text"
              name="topic"
              id="createTopic"
              placeholder="Ethics, Religion ect."
            />
          </FormGroup>
          <FormGroup>
            <Label for="addDescription">Description</Label>
            <Input
              type="text"
              name="description"
              id="addDescription"
              placeholder="Add some context to your topic."
            />
          </FormGroup>
        <Button style={{ backgroundColor:'#64b5f6'}}>Add Topic</Button>
      </Form>
    </div>
       
      </div>
    )



}
}







export default Topics; 