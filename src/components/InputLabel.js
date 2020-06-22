import React, { Component } from 'react'

export default class InputLabel extends Component {
    render() {

        const { placeholder, disabled, type, onChange, id, value, classNameInput, classNameLabel, label } = this.props;

        return (
            <>
                <input placeholder={placeholder} id={id} disabled={disabled} value={value} type={type} onChange={onChange} className={classNameInput} />
                <label className={classNameLabel} htmlFor={id}>{label}</label>
            </>
        )
    }
}
