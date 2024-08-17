import { useEffect, useRef, useState } from "react"
import { addPost, getAllPost, handleDelete } from "../../../helpers/api"
import { IPost } from "../../../helpers/types"
import { BASE } from "../../../helpers/default"
import { Box, Modal } from "@mui/material"

export const Photos = () => {
    const photo = useRef<HTMLInputElement | null>(null)
    const [text, setText] = useState<string>("")
    const [post, setPost] = useState<IPost[]>([])
    const [confirm, setConfirm] = useState<boolean>(false)


    useEffect(() => {
        getAllPost()
            .then(res => {
                setPost(res.payload as IPost[])
            })
    }, [])
    const handlePostAdd = () => {
        const file = photo.current?.files?.[0]
        if (file) {
            const form = new FormData()
            form.append("photo", file)
            form.append("content", text)
            addPost(form)
                .then(res => {
                    setPost([...post, res.payload as IPost])
                    setText("")


                })
        }
    }
    const onDelete = (id:number) => {
        handleDelete(id)
            .then(() => {
                setPost(post.filter(elm=>elm.id!==id))
            })
            setConfirm(false)
    }
    return <>
        <h2>photos</h2>
        <div>

            <input
                type="file"
                id="form12"
                className="form-control"
                ref={photo} />
        </div>

        <div style={{ padding: 20 }} className="form-outline" data-mdb-input-init>
            <textarea className="form-control"
                id="textAreaExample"

                value={text}
                onChange={e => setText(e.target.value)} />
            <label className="form-label" />
        </div>
        <button
            onClick={handlePostAdd}
            className="btn btn-outline-secondary"
            id="inputGroupFileAddon04"
        >
            upload
        </button>
        {post.map(elm => <div key={elm.id}>
            <img style={{ width: 200, padding: 20 }} src={BASE + elm.picture}
            />
            <p>{elm.title}</p>
            <button

                onClick={() => setConfirm(true)}

                className="btn btn-outline-secondary"
                id="inputGroupFileAddon04"
            >
                delete
            </button>
            <Modal open={confirm} onClose={() => setConfirm(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <p>Are you sure you want to delete this photo?</p>
                    <button className="btn btn-outline-secondary" onClick={()=>onDelete(elm.id)}>delete</button>
                </Box>
            </Modal>
        </div>)}

    </>
}