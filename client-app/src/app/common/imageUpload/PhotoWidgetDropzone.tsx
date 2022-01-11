import { height } from '@mui/system';
import { url } from 'inspector';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiDroplet } from "react-icons/fi";
import { MdOutlineCancel } from 'react-icons/md';
import { inherits } from 'util';
import { useDarkMode } from '../../stores/store';
import { Cropper } from 'react-cropper'
import PhotoCropperWidget from '../imageUpload/PhotoCropperWidget';
import '../common.scss'
import { AiOutlineClose } from 'react-icons/ai';

export default observer(function PhotoWidgetDropzone() {
    const [files, setFiles] = useState([])
    // const [cropper, setCropper] = useState<Cropper>()

    // function onCrop() {
    //     if (cropper) {
    //         cropper.getCroppedCanvas().toBlob(blob => console.log(blob))
    //     }
    // }

    const styleDropzone = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        textAlign: 'center' as 'center',
        height: 300,
        position: 'relative' as 'relative'
    }
    const styleDropzoneActive = {
        borderColor: 'green',
    }
    const { postStore } = useDarkMode()
    const { setAddPhotoMode } = postStore

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((item: any) => Object.assign(item, {
            preview: URL.createObjectURL(item)
        })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.url))
        }
    })

    return (
        <div {...getRootProps()} className='mt-3' style={isDragActive ? { ...styleDropzone, ...styleDropzoneActive } : { ...styleDropzone }}>
            <MdOutlineCancel onClick={(e) => {
                setAddPhotoMode(false)
                console.log(e)
                e.stopPropagation()
            }} className="cancel-upload-photo" />
            <input {...getInputProps()} />
            {files && files.length > 0 ?
                <img style={{ width: '359px', height: '295px' }} src={files[0].preview} alt="" />
                // <div style={{ position: 'relative' }} className='d-flex justify-content-center'>
                //     <PhotoCropperWidget setCropper={setCropper} imagePreview={files[0].preview} />
                //     <AiOutlineClose style={{ right: '211px', top: '5px' }} onClick={() => setFiles([])} />
                // </div>
                :
                <>
                    <div style={{ marginTop: '3rem' }}>
                        <FiDroplet className="drop-upload-photo" />
                        <p>Drag & Drop or Upload</p>
                    </div>
                </>
            }
        </div>
    )
})