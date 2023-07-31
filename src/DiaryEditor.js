import { useRef, useState } from 'react';

const DiaryEditor = () => {
    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: '',
        content: '',
        emotion: '',
    });

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (state.author.length < 1) {
            //alert('작성자는 최소 1글자 이상 입력해주세요');   - alert는 옛날 방식, 현재는 입력칸 테두리가 두꺼워지는 걸 focus를 준다고 하는데 그러기 위해서 react에서 useRef를 import
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            //alert('일기 본문은 최소 5글자 이상 입력해주세요');
            contentInput.current.focus();
            return;
        }
        alert('오늘의 일기가 저장되었습니다.');
    };

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input ref={authorInput} name="author" value={state.author} onChange={handleChangeState} />
            </div>
            <div>
                <textarea ref={contentInput} name="content" value={state.content} onChange={handleChangeState} />
            </div>
            <div>
                <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>저장하기</button>
            </div>
        </div>
    );
};

export default DiaryEditor;
