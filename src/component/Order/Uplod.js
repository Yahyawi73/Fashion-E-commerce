import React from 'react';
import gql from 'graphql-tag'
import { Component } from 'react'
import { graphql } from 'react-apollo'

const uploadsQuery = gql`
  query uploads {
    uploads {
      id
      filename
      mimetype
      path
    }
  }
`

class UploadBlob extends Component {
    state = {
        name: '',
        content: ''
    }

    handleChange = ({ target: { name, value } }) =>
        this.setState({ [name]: value })

    handleSubmit = event => {
        event.preventDefault()

        const file = new Blob([this.state.content], { type: 'text/plain' })
        file.name = `${this.state.name}.txt`

        this.props.mutate({
            variables: { file },
            update(
                proxy,
                {
                    data: { singleUpload }
                }
            ) {
                const data = proxy.readQuery({ query: uploadsQuery })
                data.uploads.push(singleUpload)
                proxy.writeQuery({ query: uploadsQuery, data })
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                    />{' '}
                    <textarea
                        name="content"
                        placeholder="Content"
                        required
                        value={this.state.content}
                        onChange={this.handleChange}
                    />
                    <button>Upload</button>
                </form>
            </div>
        )
    }
}

export default graphql(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      path
    }
  }
`)(UploadBlob)