import React from "react"
import {Button} from "antd-mobile"

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Page not found!</h2>
          <Button
            type="primary"
            onClick={() => this.props.history.replace("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }
}

export default NotFound