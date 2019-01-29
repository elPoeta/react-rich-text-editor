import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { Bold, Italic } from './'
import styles from './TextEditor.module.css'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: '',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})


class TextEditor extends Component {

    state = {
        value: initialValue,
        placeholder: "Compose...",
        autoFocus: true,
        autoCorrect: true
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }


    onKeyDown = (event, editor, next) => {
        if (!event.ctrlKey) return next()

        switch (event.key) {

            case 'b': {
                event.preventDefault()
                editor.toggleMark('bold')
                break
            }
            case 'i': {
                event.preventDefault()
                editor.toggleMark('italic')
                break
            }
            default: {
                return next()
            }
        }
    }


    render() {
        return (
            <div className={styles.Editor}>
                <Editor
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                    autoFocus={this.state.autoFocus}
                    autoCorrect={this.state.autoCorrect}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                />
            </div>
        )
    }

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <Bold {...props} />
            case 'italic':
                return <Italic {...props} />
            default:
                return next()
        }
    }
}

export default TextEditor