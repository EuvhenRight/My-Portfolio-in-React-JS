import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {QuestionForm} from "../Question/QuestionForm";
import {ChatQuestionItem} from "../utils/ChatQuestionItem";
import {AddChatQWithThunk} from "../redux/ChatQuestion/ChatQuestionReducer";
import {selectChatQuestions} from "../redux/ChatQuestion/selector";
import {AUTHORS} from "../utils/constants";
import classes from "./ChatQuestion.module.css";
import React from "react";


const ChatQuestionList = () => {

    const chatQ = useSelector(selectChatQuestions);
    // const [fetching, setFetching] = useState(false); // TODO add add <Preloader />
    const dispatch = useDispatch();

    const handleAddChat = (text) => {
        dispatch(AddChatQWithThunk(`chatQ-${Date.now()}`, AUTHORS.ME, text))
    };

    return (
        <>
            <div className={classes.main}>
                <div className={classes.chatQuestions}> Created Questions
                    <span className={classes.help}>?
                  <div className={classes.showMe}>You can find created questions and answers here</div>
                  </span>
                    {/* add : hover  */}
                </div>
                <div className={classes.questionList}>
                    {/*<div> {fetching ? <div>loading...</div> : null} TODO need add <Preloader />*/}
                    {chatQ.map((chatQ) => (
                        <div className={classes.questionItem}>
                            <ChatQuestionItem key={chatQ.id} chatQ={chatQ}/>
                        </div>
                    ))}
                </div>
                <div className={classes.buttonQuestionlist}>
                    {chatQ.length !== 0 ? <button className={classes.sortBut}> Sort Question</button>
                        : <button disabled> Sort Question</button>}
                    {/* TODO need it is necessary to put array.sort */}
                    {chatQ.length !== 0 ? <button className={classes.remBut}> Remove All Question</button>
                        : <button disabled> Remove All Question</button>}
                    {/* TODO need it is necessary to put AC delete all */}
                </div>
                <div className={classes.addQuestions}> Create a New Questions
                    <span className={classes.help}>?
                  <div className={classes.showMe}>You can find created questions and answers here</div>
                  </span>
                </div>
                <div className={classes.formQ}>
                    <QuestionForm onSubmit={handleAddChat}/>
                </div>
            </div>
            <Outlet/>
        </>
    );
}

export default ChatQuestionList