import React, { useState, useRef, useEffect, useMemo } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import './App.css';
//import OptimizeTest from './OptimizeTest';
//import Lifecycle from './Lifecycle';

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

//https://jsonplaceholder.typicode.com/comments

function App() {
    const [data, setData] = useState([]); // [기존 데이터들, 지금 변화중(추가중)인 데이터] = useState(초기값으로 설정해 둘 것)

    const dataId = useRef(1);

    const getData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++,
            };
        });

        setData(initData);
    };

    useEffect(() => {
        getData();
    }, []);

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
        const newDiaryList = data.filter((it) => it.id !== targetId);
        setData(newDiaryList);
    };

    const onEdit = (targetId, newContent) => {
        setData(data.map((it) => (it.id === targetId ? { ...it, content: newContent } : it)));
    };

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return { goodCount, badCount, goodRatio };
    }, [data.length]);

    const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

    return (
        <div className="App">
            <DiaryEditor onCreate={onCreate} />
            <div>전체 일기: {data.length}</div>
            <div>기분 좋은 일기 개수 : {goodCount}</div>
            <div>기분 나쁜 일기 개수 : {badCount}</div>
            <div>기분 좋은 일기 비율 : {goodRatio}</div>
            <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
        </div>
    );
}

export default App;

//<Lifecycle />
//<OptimizeTest />
