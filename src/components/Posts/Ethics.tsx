import React, { Component } from "react";
import APIURL from "../../helpers/DB";
import "../../App.css";
import { Form, FormGroup, Button, Input } from "reactstrap";
import background from "../../assets/ethical.jpg";
import UpdateEthic from './EditEthics'



type ethicProps = {
  token: string;
  fetchPost: () =>Promise<any>
};

export interface EthicState {
  post: Array<object>;
  textBox: string;
  topicTitle: string;
  date: string;
}


  export default class EthicPosts extends Component<ethicProps, EthicState,  UpdateEthic > {
  constructor(props: ethicProps) {
    super(props);
    this.state = {
      post: [],
      textBox: "",
      topicTitle: "",
      date: new Date().toLocaleString(),
    };
  }

  newPost = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch(`${APIURL}/posts`, {
        method: "POST",
        body: JSON.stringify({
          textBox: this.state.textBox,
          topic: this.state.topicTitle,
          date: this.state.date,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        }),
      });
      await res.json();
      this.setState({
        textBox: "",
        topicTitle: "",
        date: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value } as unknown as Pick<
        EthicState,
      keyof EthicState
    >);
  };

  render() {
    return (
      <div>
        <h1 className="Font">Ethics</h1>
        <h3 className="Font">Make A Post Below</h3>
          <Form className="Topicslist" onSubmit={this.newPost}>
        <div style={{ backgroundImage: `url(${background})` }}>
            <FormGroup>
              <label htmlFor="topic" />
              <Input
                id="topic"
                className="Font"
                value={this.state.topicTitle}
                placeholder="Topic"
                onChange={(e) => this.setState({ topicTitle: e.target.value })}
              />

              <label htmlFor="post">
                <textarea
                  id="entry"
                  className="Postbox"
                  value={this.state.textBox}
                  placeholder="What's up?"
                  onChange={(e) => this.setState({ textBox: e.target.value })}
                />
              </label>
            </FormGroup>

            <Button
              style={{ backgroundColor: "#64b5f6", alignItems: "center" }}
            >
              Post
            </Button>
        </div>
          </Form>
         
      </div>
    );
  }
}


