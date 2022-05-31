import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './NoticeDetail.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build'
import { Button, message } from 'antd'
import { useNavigate } from 'react-router'
import CustomButton from '../../../CustomComponents/CustomButton'
import { CustomAxiosDelete, CustomAxiosPost, CustomAxiosPut } from '../../../Functions/CustomAxios'
import UploadAdapter from '../../../Functions/UploadAdapter'
import { addOMSNoticeApi, deleteOMSNoticeApi, updateOMSNoticeApi } from '../../../Constants/Api_Route'

const NoticeDetail = ({ data, type, addCallback, updateCallback, deleteCallback }) => {
    const { content, title, noticeId } = data || {}
    const navigate = useNavigate()
    const [inputTitle, setInputTitle] = useState(title || '')
    const editorRef = useRef(null)
    
    useLayoutEffect(() => {
        function MyCustomUploadAdapterPlugin(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = loader => {
                return new UploadAdapter(loader)
            }
        }
        
        ClassicEditor.builtinPlugins.push(MyCustomUploadAdapterPlugin)
    },[])

    useEffect(() => {
        if (!type || (!data && type === 'update')) navigate('/Notice')
        else if (type === 'update') {
            setInputTitle(title)
        } else {
            setInputTitle('')
        }
    }, [type, data])

    const addNotice = () => {
        CustomAxiosPost(addOMSNoticeApi, {
            title: inputTitle,
            content: editorRef.current.getData(),
        }, (newData) => {
            addCallback(newData)
            navigate('/Notice')
            message.success('추가 성공!')
        })
    }

    const modifyNotice = () => {
        CustomAxiosPut(updateOMSNoticeApi, {
            noticeId,
            content: editorRef.current.getData(),
            title: inputTitle
        }, (modifiedData) => {
            updateCallback(modifiedData)
            message.success('수정 성공')
        })
    }

    const deleteNotice = () => {
        CustomAxiosDelete(deleteOMSNoticeApi(noticeId), () => {
            deleteCallback(noticeId)
            navigate('/Notice')
            message.success('삭제 성공!')
        })
    }

    return <>
        <div>
            <CustomButton className="button" onClick={() => {
                navigate('/Notice')
            }}>
                뒤로가기
            </CustomButton>
        </div>
        <div className="notice-manage-container">
            <label>제목 : </label>
            <input value={inputTitle} onChange={e => {
                setInputTitle(e.target.value)
            }} />
        </div>
        <CKEditor
            editor={ClassicEditor}
            onReady={editor => {
                editorRef.current = editor
                if(type === 'update') editor.setData(content)
            }}
        />
        <div style={{ marginTop: '8px', textAlign: 'right' }}>
            {
                type === 'add' ? <Button onClick={addNotice}>등록</Button> : <>
                    <Button onClick={modifyNotice}>수정</Button>
                    <Button style={{ marginLeft: '8px' }} onClick={deleteNotice}>삭제</Button>
                </>
            }
        </div>
    </>
}

export default NoticeDetail