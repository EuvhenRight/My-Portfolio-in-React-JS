import classes from "./AskWriteForm.module.scss";
import {useState} from "react";
import {deleteAllChat, setAddChatQ} from "../redux/ChatQuestion/ChatQuestionSlice";
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";
import React from "react";
import Preloader from "../Preloader/Preloader";


const AskWriteForm = ({chatQ}) => {
    const dispatch = useDispatch();

    const [titleQuest, setTitleQuest] = useState('')
    const [authorsId, setAuthorsId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const addChangeTitleQuestion = (e) => setTitleQuest(e.target.value)
    const addChangeAuthors = (e) => setAuthorsId(e.target.value)

    const authors = useSelector(state => state.authors.authors)

    const onAddQuestion = () => {
        const chat = {
            id: nanoid(),
            authorsId,
            text: titleQuest,
            date: new Date().toISOString(),
        }
        setTimeout(() => {
            dispatch(
                setAddChatQ(chat))
            setIsLoading(false)
        }, 5000)
        setTitleQuest('')
        setIsLoading(true)
    }

    const handleAllDeleteChat = () => {
        dispatch(deleteAllChat())
    }

    const initialAuthors = authors.map(author => (
        <option key={author.id} value={author.name}>{author.name} </option>))

    const canSave = Boolean(titleQuest) && Boolean(authorsId)

    return (
        <>
            <form>
                <div className={classes.addQuestions}> Create a New Questions
                </div>
                <div className={classes.input__block}>
                    <label htmlFor={'chatAuthors'}>Authors:</label>
                    <select id={'chatAuthors'} value={authorsId} onChange={addChangeAuthors}>
                        <option value={''}></option>
                        {initialAuthors}
                    </select>
                    <input className={!canSave ? classes.input : classes.inputActive}
                           onChange={addChangeTitleQuestion}
                           type="text"
                           id="questions"
                           value={titleQuest}
                    />
                </div>
                <div className={classes.createB__block}>
                    <button className={canSave ? classes.CBut : classes.CreateBut}
                            onClick={onAddQuestion}
                            type="button"
                            disabled={!canSave}
                    >Create Question
                    </button>
                        {chatQ.length > 0 ?
                            <button onClick={() => handleAllDeleteChat()} className={classes.remBut}> Remove All
                                Question
                            </button> :
                            <button disabled> Remove All Question</button>}
                </div>
                <div className={classes.preloader}>
                    {isLoading && <Preloader />}
                </div>

            </form>

        </>
    )
}


export default AskWriteForm;


