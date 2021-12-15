import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";


interface Props {
    placeholder: string
    name: string
    label?: string
    type?: string
    style?: string
    values?: string
}

export default function MyTextInput({ style,values, ...props }: Props) {
    const [field, meta] = useField(props)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input className={style} {...field} {...field.value=''} defaultValue={values} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null
            }
        </Form.Field>
    )
}