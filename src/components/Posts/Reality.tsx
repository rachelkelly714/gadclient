import React, { Component } from "react";
import APIURL from "../../helpers/DB";
import "../../App.css";
import { Form, FormGroup, Button, Input } from "reactstrap";
import background from "../../assets/reality.png";

type realProps = {
  token: string;
  fetchPost: any
};

export interface RealityState {
  post: Array<object>
  textBox: string;
  date: string;
  topicTitle: string;
}

class RealityPosts extends Component<realProps, RealityState> {
  constructor(props: realProps) {
    super(props);
    this.state = {
      post: [],
      textBox: '',
      date: new Date().toLocaleString(),
      topicTitle: "",
      
    };
  }

  

  newPost = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch(`${APIURL}/posts/reality`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          textBox: this.state.textBox,
          date: this.state.date,
          topicTitle: this.state.topicTitle,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        }),
      });
      await res.json();
      this.setState({
        textBox: "",
        date: "",
        topicTitle: "",
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
      RealityState,
      keyof RealityState
    >);
  };

  render() {
    return (
      <div>
        <h1 className="Font">Reality</h1>
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

export default RealityPosts;
