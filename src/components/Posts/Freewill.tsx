import React, { Component } from "react";
import datab from "../../helpers/DB";
import "../../App.css";
import { Form, FormGroup, Button, Input } from "reactstrap";
import background from "../../assets/freewill.jpg";

type fwillProps = {
  token: string;
  fetchPost: () =>Promise<any>
};

export interface FwillState {
  post: Array<object>;
  topicTitle: string;
  date: string;
  postEntry: string;
}

class FreewillPosts extends Component<fwillProps, FwillState> {
  constructor(props: fwillProps) {
    super(props);
    this.state = {
      post: [],
      topicTitle: "",
      date: new Date().toLocaleString(),
      postEntry: "",
    };
  }

  newPost = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch(`${datab}/posts`, {
        method: "POST",
        body: JSON.stringify({
          topic: this.state.topicTitle,
          date: this.state.date,
          postEntry: this.state.postEntry,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.token}`,
        }),
      });
      await res.json();
      this.setState({
        topicTitle: "",
        date: "",
        postEntry: "",
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
        FwillState,
      keyof FwillState
    >);
  };

  render() {
    return (
      <div>
        <h1 className="Font">Free Will</h1>
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
                  value={this.state.postEntry}
                  placeholder="What's up?"
                  onChange={(e) => this.setState({ postEntry: e.target.value })}
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

export default FreewillPosts;
