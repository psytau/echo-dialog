import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { fetchDialog, updateDialog } from "../models/dialogs";
import { genLinkToEcho } from "../models/echoes";

import LineListing from "./LineListing";

import withParams from "../withParams";
import withAuth from "../withAuth";

const DemoMedia = (props) => {
  const { demoMedia } = props;
  console.log(demoMedia.url);
  if (demoMedia.mediaType === "audio") {
    return (
      <audio controls={true}>
        <source src={demoMedia.url} />
      </audio>
    );
  } else if (demoMedia.mediaType === "video") {
    return (
      <video controls={true} style={{ width: "100%" }}>
        <source src={demoMedia.url} />
      </video>
    );
  } else if (
    demoMedia.mediaType === "youtube" &&
    demoMedia.url.match(
      /^https:\/\/www\.youtube\.com\/embed\/\w+\?start=[0-9]+$/
    )
  ) {
    return (
      <iframe
        width="560"
        height="315"
        src={demoMedia.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullscreen
      ></iframe>
    );
  }
};

class DialogView extends React.Component {
  constructor(props) {
    super(props);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleUnpublish = this.handleUnpublish.bind(this);
    this.state = { loading: true };
  }
  async componentDidMount() {
    await this.props.setupAccessToken();
    const dialog_id = this.props.params.dialog_id;
    const resp = await fetchDialog(dialog_id);
    if (resp.error) {
      this.setState({ error: resp.error, loading: false });
    } else {
      this.setState({ dialog: resp, loading: false });
    }
  }
  async handlePublish() {
    await this.props.setupAccessToken();
    const dialog_id = this.state.dialog._id;
    const dialogParams = { status: "published" };
    const updatedDialog = await updateDialog(dialog_id, dialogParams);
    console.log(updatedDialog);
    this.setState({ ...this.state, dialog: updatedDialog });
  }
  async handleUnpublish() {
    await this.props.setupAccessToken();
    const dialog_id = this.state.dialog._id;
    const dialogParams = { status: "unpublished" };
    const updatedDialog = await updateDialog(dialog_id, dialogParams);
    console.log(updatedDialog);
    this.setState({ ...this.state, dialog: updatedDialog });
  }

  render() {
    console.log(this.state.dialog);
    return !this.state.error && !this.state.loading ? (
      <div className="container">
        <Card>
          <Card.Body>
            <h1> {this.state.dialog.title} </h1>
            {this.state.dialog.characters.map((character, i) => (
              <p key={i}>
                Character {i + 1}: {character}
              </p>
            ))}
            {this.state.dialog.demoMedia && (
              <DemoMedia demoMedia={this.state.dialog.demoMedia} />
            )}
            <Button
              className="dialog-cancel-button"
              variant="secondary"
              as={Link}
              to="/dialogs"
              role="button"
              style={{ float: "left" }}
            >
              OK
            </Button>
            {this.state.dialog.status !== "published" ? (
              <>
                <Button
                  className="dialog-edit-button m-1"
                  as={Link}
                  to={`/dialogs/${this.state.dialog._id}/edit`}
                  role="button"
                  style={{ float: "right" }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="dialog-publish-button m-1"
                  onClick={this.handlePublish}
                  role="button"
                  style={{ float: "right" }}
                >
                  Publish
                </Button>
              </>
            ) : (
              <div>
                <Button
                  onClick={this.handleUnpublish}
                  style={{ float: "right" }}
                  className="m-1"
                  variant="warning"
                >
                  Unpublish
                </Button>
                <Button
                  disabled={true}
                  style={{ float: "right" }}
                  className="m-1"
                >
                  Published
                </Button>
                <div style={{ clear: "both" }}>
                  <p style={{ clear: "both" }}>
                    View at:{" "}
                    <a href={genLinkToEcho(this.state.dialog._id)}>
                      {genLinkToEcho(this.state.dialog._id)}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Lines of Dialog: </Card.Title>
          <LineListing
            dialog={this.state.dialog}
            lines={this.state.dialog.lines}
          />
        </Card>
      </div>
    ) : this.state.error ? (
      <div className="container">
        {" "}
        Document not found {this.state.error.status}{" "}
      </div>
    ) : (
      ""
    );
  }
}

export default withParams(withAuth(DialogView));
