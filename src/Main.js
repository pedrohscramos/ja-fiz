import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import groupBy from 'lodash.groupby';

const Main = ({tasks, onNewTaskDone}) => {
    const byCategory = groupBy(tasks, t => t.category);
    const [obs, setObs] = useState('');
    console.log(tasks);
    return <div>{Object.keys(byCategory).map(c => (
        <div key={c}>
            <h4>{c}</h4>
            {byCategory[c].map(t => (
                <div key={t.id}>
                    <div>{t.text}</div>
                    <form onSubmit={e => {
                        e.preventDefault();
                        onNewTaskDone(t.id, {id:nanoid(), obs, date: Date.now()});
                        setObs("");
                    }}>
                        <input type="text" value={obs} onChange={e => setObs(e.target.value)} />
                        <button type="submit">+</button>
                    </form>
                </div>
            ))}
        </div>
    ))}</div>;
    
};

export default Main;