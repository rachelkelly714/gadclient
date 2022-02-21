import React, {Component} from 'react';
import Datab from '../../helpers/DB';
import {RealityState} from './Reality';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import datab from '../../helpers/DB';




export interface editRealProps  {
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
      topicTitle: this.props.updateRealPost.topicTitle,
      date: this.props.updateRealPost.date,
      postEntry: this.props.updateRealPost.postEntry,
    };
  }

  editEthicPost = async (id: number) => {
    try {
      const res = await fetch(`${datab}/post/${this.props.updateRealPost.id}`, {
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
            
            <div className="flex flex-col">
              <label htmlFor="postEntry">
                <textarea
                  id="postEntry"
                  className = 'Modalbottbox'
         
                  
                  value={this.state.postEntry}
                  name="entry"
                  placeholder="Post"
                  onChange={(e) => this.setState({ postEntry: e.target.value })}
                />
              </label>
            </div>
          </ModalBody>
          <ModalFooter className='ModalHed'>
            <button
              className= 'Btn'
              onClick={(id: any) => {
                this.editEthicPost(id);
                this.modalToggle();
              }}
            >
              Edit
            </button>
            <button className='Btn'
             
              onClick={this.modalToggle}
            >
              Nevermind
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default UpdateReality