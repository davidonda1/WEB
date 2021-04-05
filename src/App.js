import React, {Component} from "react";
import './App.css'
import {useEffect, useState} from "react";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

const Status = "run" | "stop" | "wait";

export default function App() {
    const [sec, setSec] = useState(0);
    const [status, setStatus] = useState(Status);

    useEffect(() => {
        const unsubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(() => {
                if (status === "run") {
                    setSec(val => val + 1000);
                }
            });
        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        };
    }, [status]);

    const start = React.useCallback(() => {
        setStatus("run");

    }, []);

    const stop = React.useCallback(() => {
        setStatus("stop");
        setSec(0);
    }, []);

    const reset = React.useCallback(() => {
        setSec(0);
    }, []);

    const wait = React.useCallback(() => {
        setStatus("wait");
    }, []);

    return (
        <div className='container my_background'>
            <div className='row'>
            <span className='time mr-5 col-4 mb-5 mt-2'> {new Date(sec).toISOString().slice(11, 19)}</span>
            </div>
            <button className='start-button  col-2 btn-success' onClick={start}>
                Start
            </button>
            <button className='stop-button offset-1 col-2 btn-danger'onClick={stop}>
                Stop
            </button>
            <button className='reset-button offset-1 col-2 btn-danger' onClick={reset}>Reset</button>
            <button className='wait-button offset-1 col-2 btn-danger' onDoubleClick={wait}>Wait</button>

        </div>
    );
}

