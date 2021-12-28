import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";


interface Props {
    placeholder?: string
    name: string
    label?: string
    type?: string
    style?: string
    defaultValue?: string
    key?: string
    normal?: boolean
}

export default function MyTextInput({ style, normal, ...props }: Props) {
    const [field, meta] = useField(props)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            {props.label !== null && <label>{props.label}</label>}
            <input className={style} {...field}   {...props} />
            {normal == false && meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null
            }
        </Form.Field>
    )
}