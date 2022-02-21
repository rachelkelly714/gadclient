import React, {Component} from 'react';
import Datab from '../../helpers/DB';
import {EthicState} from './Ethics';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import datab from '../../helpers/DB';
import {Button} from 'reactstrap'




export interface editEthicsProps  {
    token: string
    fetchPost: () => Promise<'string'>
    updateEthPost: {[key: string]: any}
    open: boolean
    updateEnd: () => void
}

export interface UpdateEthicState extends EthicState {
    isModalOpen: boolean
}

class UpdateEthic extends Component<editEthicsProps, UpdateEthicState> {
  constructor(props: editEthicsProps) {
    super(props);
    this.state = {
      isModalOpen: true,
      post: [],
      topicTitle: this.props.updateEthPost.topicTitle,
      date: this.props.updateEthPost.date,
      postEntry: this.props.updateEthPost.postEntry,
    };
  }

  editEthicPost = async (id: number) => {
    try {
      const res = await fetch(`${datab}/post/${this.props.updateEthPost.id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        }),
        body: JSON.stringify({
          topicTitle: this.state.topicTitle,
          date: this.state.date,
          postEntry: this.state.postEntry,
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
      UpdateEthicState,
      keyof UpdateEthicState
    >);
  };

  modalToggle = () => {
    this.setState({ isModalOpen: false });
    this.props.updateEnd();
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.modalToggle}>
          <ModalHeader className= 'ModalHed'
           toggle={this.modalToggle}>Edit post here.
           </ModalHeader>
          <ModalBody className='ModalHed'>
            
            <div className="flex flex-col">
              <label htmlFor="postEntry">
                <textarea
                  id="postEntry"
                  className = 'Modalbottbox'
                  value={this.state.postEntry}
                  name="post"
                  
                  onChange={(e) => this.setState({ postEntry: e.target.value })}
                />
              </label>
            </div>
          </ModalBody>
          <ModalFooter className='ModalHed'>
            <Button
              style={{ backgroundColor: "#64b5f6", alignItems: "center" }}
              onClick={(id: any) => {
                this.editEthicPost(id);
                this.modalToggle();
              }}
            >
              Edit
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


export default UpdateEthic; 