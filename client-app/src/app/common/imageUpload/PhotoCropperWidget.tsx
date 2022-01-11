import React from "react";
import { observer } from "mobx-react-lite";
import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import '../common.scss'

interface Props {
    imagePreview: string
    setCropper: (cropper: Cropper) => void
}
export default observer(function PhotoCropperWidget({ setCropper, imagePreview }: Props) {

    return (
        <Cropper
            src={imagePreview}
            style={{ width:'359px',height: 295 }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={false}
            autoCropArea={1}
            viewMode={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
            className="Cropper"
        >
        </Cropper>
    )
})


