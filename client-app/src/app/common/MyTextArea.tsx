import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";


interface Props {
    placeholder: string
    name: string
    label?: string
    rows: number
    style: string
}

export default function MyTextArea({ style, ...props }: Props) {

    const [field, meta] = useField(props.name)

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea className={style} {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null
            }

        </Form.Field>
    )
}