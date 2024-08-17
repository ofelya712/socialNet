import { useEffect, useState } from "react"
import { changeLogin, changePassword, checkAccount, handleLogout } from "../../../helpers/api"
import { SubmitHandler, useForm } from "react-hook-form"
import { IChange } from "../../../helpers/types"
import { useNavigate } from "react-router-dom"


export const Settings = () => {

    const { register, handleSubmit } = useForm<IChange>()
    const [error, setError] = useState("")
    const [login, setLogin] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        checkAccount()
            .then(res => {
                if (res.payload === 1) {
                    setMessage("Private account")
                } else {
                    setMessage("Public account")
                }
            })
    }, [])

    const handlePrivate = () => {
        checkAccount()
        .then(res=>{
            if(res.payload===1){
                setMessage("Private account")
            } else {
                setMessage("Public account")
            }
        })
        


    }
    const handleChange: SubmitHandler<IChange> = (user) => {
        changePassword(user)
            .then(res => {
                if (res.status === "error" && res.message) {
                    setError(res.message)

                } else {
                    setError("")
                    handleLogout()
                    navigate('/login')
                }
            })

    }

    const handleLoginChange: SubmitHandler<IChange> = (user) => {
        changeLogin(user)
            .then(res => {
                if (res.status === "error" && res.message) {
                    setLogin(res.message)
                } else {
                    setLogin("")
                    handleLogout()
                    navigate('/login')
                }
            })
    }



    return <>
        <h1>Settings</h1>

        <div className="divstyle ">
            <h3 className="h3style">Account Privacy </h3>
            {message === "Private account" && <img style={{ width: 30 }} src="https://cdn4.iconfinder.com/data/icons/check-out-vol-1-colored/48/JD-32-256.png" />}


            <div className="div2style">
                {message && <label className="labelstyle">{message}</label>}
                <input
                    type="checkbox"
                    className="inputstyle"
                    style={message === "Private account"?{background:"rgb(44, 116, 216)"}:{background:"#ddd"}}
                    onClick={handlePrivate}

                />
                <span className="spanstyle"></span>
            </div>

            <p className="pstyle">Toggle to make your account private.</p>
        </div>
        <div className="divstyle">
            <h3 className="h3style">Change Password </h3>
            <form onSubmit={handleSubmit(handleChange)}>
                {error && <p className="alert alert-danger">{error}</p>}
                <input
                    className="form-control"
                    type="password"
                    style={{ marginBottom: 20 }}
                    placeholder="Current password"
                    {...register("old")}

                />
                <input
                    className="form-control"

                    type="password"
                    style={{ marginBottom: 20 }}
                    placeholder="New password"
                    {...register("newpwd")}

                />
                <button className="btn btn-dark" data-mdb-ripple-init data-mdb-ripple-color="dark">Change Password</button>
            </form>
        </div>

        <div className="divstyle">
            <h3 className="h3style">Change Login </h3>
            <form onSubmit={handleSubmit(handleLoginChange)}>
                {login && <p className="alert alert-danger">{login}</p>}
                <input
                    className="form-control"
                    type="password"
                    style={{ marginBottom: 20 }}
                    placeholder="Current password"
                    {...register("password")}

                />
                <input
                    className="form-control"
                    type="text"
                    style={{ marginBottom: 20 }}
                    placeholder="New login"
                    {...register("login")}

                />
                <button className="btn btn-dark" data-mdb-ripple-init data-mdb-ripple-color="dark">Change Login</button>
            </form>
        </div>

    </>
}