import { Button } from "react-bootstrap";
import '../css/Roullet.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, top } from "../features/fields/selectSlice";
import { select } from "../features/fields/fieldSlice";

const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f ", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];

function Roullet() {
    const [value, setValue] = useState("결과는?");

    const fields = useSelector((state)=> state.field.value)
    const selects = useSelector((state) => state.select.value)
    const dispatch = useDispatch()

    const canvasRoullet = useRef();
    
    const newMake = useCallback(() => {
        const c = canvasRoullet.current;
        const ctx = c.getContext('2d');

        const [cw, ch] = [c.width / 2, c.height / 2];
        const arc = Math.PI / (fields.length / 2);
    
        for (let i = 0; i < fields.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % (colors.length -1)];
            ctx.moveTo(cw, ch);
            ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
            ctx.fill();
            ctx.closePath();
        }

        ctx.fillStyle = "#fff";
        ctx.font = "18px Pretendard";
        ctx.textAlign = "center";

        for (let i = 0; i < fields.length; i++) {
            const angle = (arc * i) + (arc / 2);

            ctx.save();

            ctx.translate(
                cw + Math.cos(angle) * (cw - 50),
                ch + Math.sin(angle) * (ch - 50),
            );

            ctx.rotate(angle + Math.PI / 2);

            fields[i].name.split(" ").forEach((text, j) => {
                ctx.fillText(text, 0, 30 * j);
            });

            ctx.restore();
        }
    }, [fields])

    useEffect(()=>{
        newMake();
    }, [newMake])

    const rotate = useCallback(() => {
        const c = canvasRoullet.current;

        c.style.transform = 'initial';
        c.style.transition = 'initial';

        setTimeout(()=> {
            let ran = 0;
            if(selects.length > 0){
                ran = dispatch(top()) % selects.length;
                dispatch(remove());
            }
            else{
                ran = Math.floor(Math.random() * fields.length);
            }

            const arc = 360 / (fields.length);
            // const rotate = (ran * arc) + 3600 + (arc * 3) - (arc / 4);
            const rotate = 90 + (ran* arc) + 3600 + (arc * (Math.random()));
            
            c.style.transform = `rotate(-${rotate}deg)`;
            c.style.transition = `2s`;
            
            setTimeout(() => {
                // alert(`오늘의 야식은?! ${fields[ran]} 어떠신가요?`)
                setValue(fields[ran].name);
                dispatch(select(ran));
            }, 2000);
        }, 1)
    }, [fields, selects, dispatch])


    return(
        <div id="div_roullet" className="roullet">
            <h2>{value}</h2>
            <p>▼</p>
            <canvas width="380" height="380" id="canvas_roullet" ref={canvasRoullet} className="roullet"></canvas>
            <Button className="roullet" onClick={rotate}>룰렛 돌리기</Button>
        </div>
    );
}

export default Roullet;