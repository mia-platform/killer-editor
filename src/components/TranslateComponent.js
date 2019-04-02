import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  Table, Input, Button, Popconfirm, Form
} from 'antd'

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({form, index, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: false
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({editing}, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = (e) => {
    const {record, handleSave} = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({...record, ...values})
    })
  }

  render () {
    const {editing} = this.state
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form
              return (
                editing ? (
                  <FormItem style={{margin: 0}}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`
                      }],
                      initialValue: record[dataIndex]
                    })(
                      <Input
                        onBlur={this.save}
                        onPressEnter={this.save}
                        ref={node => (this.input = node)}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className='editable-cell-value-wrap'
                    onClick={this.toggleEdit}
                    style={{paddingRight: 24}}
                  >
                    {restProps.children}
                  </div>
                )
              )
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    )
  }
}

class TranslateComponent extends Component {
  handleSave = (row) => {
    this.props.onChanged({key: row.key, text: row.to})
  }

  render () {
    const {from, to} = this.props.languages
    const columns = [
      {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
        width: '10%',
        render: (text, record) => <p>{text}<br /><small>{record.description}</small></p>
      },
      {
        title: from.description,
        dataIndex: 'from',
        key: 'from',
        width: '45%'
      },
      {
        title: to.description,
        dataIndex: 'to',
        key: 'to',
        width: '45%',
        onCell: record => {
          return {
            record,
            editable: true,
            dataIndex: 'to',
            title: to.description,
            handleSave: this.handleSave
          }
        }
      }
    ]
    const data = this.props.copies

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }
    return (
      <div>
        <Table
          bordered
          columns={columns}
          components={components}
          dataSource={data}
          rowClassName={() => 'editable-row'}
        />
      </div>
    )
  }
}

TranslateComponent.propTypes = {
  copies: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    description: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string
  }).isRequired).isRequired,
  fromLangId: PropTypes.string.isRequired,
  languages: PropTypes.shape({
    from: PropTypes.shape({}).isRequired,
    to: PropTypes.shape({}).isRequired
  }).isRequired,
  onChanged: PropTypes.func.isRequired,
  toLangId: PropTypes.string.isRequired
}

export default TranslateComponent
