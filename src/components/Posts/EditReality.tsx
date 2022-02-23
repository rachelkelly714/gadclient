import React, {Component} from 'react';
import {RealityState} from './Reality';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import APIURL from '../../helpers/DB';




type editRealProps =  {
    token: string
    fetchPost: () => Promise<'string'>
    updateRealPost: {[key: string]: any}
    open: boolean
    updateEnd: () => void
}

export interface UpdateRealState extends RealityState {
    isModalOpen: boolean
}

class UpdateReality extends Component<editRealProps, UpdateRealState> {
  constructor(props: editRealProps) {
    super(props);
    this.state = {
      isModalOpen: true,
      post: [],
      textBox: this.props.updateRealPost.textBox,
      date: this.props.updateRealPost.date,
      topicTitle: this.props.updateRealPost.topicTitle,
      
     
    };
  }

  editRealPost = async (id: number) => {
    try {
      const res = await fetch(`${APIURL}/post/${this.props.updateRealPost.id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        }),
        body: JSON.stringify({
          textBox: this.state.textBox,
          date: this.state.date,
          topicTitle: this.state.topicTitle,
        }),
      });
      await res.json();
      this.props.fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value } as unknown as Pick<
      UpdateRealState,
      keyof UpdateRealState
    >);
  };

  modalToggle = () => {
    this.setState({ isModalOpen: false });
    this.props.updateEnd();
  };

  render() {
    return (
      <div >
        <Modal isOpen={this.state.isModalOpen} toggle={this.modalToggle}>
          <ModalHeader className= 'ModalHed' toggle={this.modalToggle}>Edit post here.</ModalHeader>
          <ModalBody className='ModalHed'>
            <div>
              <label htmlFor="topicTitle">
                <input
                  id="topicTitle"
                  type="text"
                  className = "Modaltopbox"
                  value={this.state.topicTitle}
                  name="topic"
                  placeholder="Topic"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            
            <div>
              <label htmlFor="textBox">
                <textarea
                  id="textBox"
                  className = 'Modalbottbox'
         
                  
                  value={this.state.textBox}
                  name="entry"
                  placeholder="Post"
                  onChange={(e) => this.setState({ textBox: e.target.value })}
                />
              </label>
            </div>
          </ModalBody>
          <ModalFooter className='ModalHed'>
          <Button
              style={{ backgroundColor: "#64b5f6", alignItems: "center" }}
              onClick={(id: any) => {
                this.editRealPost(id);
                this.modalToggle();
              }}
            >
              Save
            </Button>
            <Button style={{ backgroundColor: "#64b5f6", alignItems: "center", font: 'Gabriela, serif' }}
             
              onClick={this.modalToggle}
            >
              Nevermind
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default UpdateReality