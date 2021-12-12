import { useField } from "formik";
import React, { CSSProperties } from "react";
import { Form, Label } from "semantic-ui-react";


interface Props {
    placeholder: string
    name: string
    label?: string
    type?: string
    style : string
}

export default function MyTextInput({style, ...props}: Props) {
    const [field, meta] = useField(props.name)

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input className={style} {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null
            }

        </Form.Field>
    )
}