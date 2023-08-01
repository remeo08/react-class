import React, { useState, useRef } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import './App.css';

// const dummylist = [
//     {
//         id: 1,
//         author: 'remeo08',
//         content: 'hello 1',
//         emotion: 5,
//         created_date: new Date().getTime(),
//     },
//     {
//         id: 2,
//         author: 'nalboa',
//         content: 'hello 2',
//         emotion: 4,
//         created_date: new Date().getTime(),
//     },
//     {
//         id: 3,
//         author: 'user3',
//         content: 'hello 3',
//         emotion: 3,
//         created_date: new Date().getTime(),
//     },
// ];

function App() {
    const [data, setData] = useState([]); // [기존 데이터들, 지금 변화중(추가중)인 데이터] = useState(초기값으로 설정해 둘 것)

    const dataId = useRef(0);

    const onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
    };

    const onRemove = (targetId) => {
        console.log(`${targetId}가 삭제되었습니다`);
        const newDiaryList = data.filter((it) => it.id !== targetId);
        setData(newDiaryList);
    };
    return (
        <div className="App">
            <DiaryEditor onCreate={onCreate} />
            <DiaryList onRemove={onRemove} diaryList={data} />
        </div>
    );
}

export default App;
