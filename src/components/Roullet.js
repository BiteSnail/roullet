import { Button } from "react-bootstrap";
import '../css/Roullet.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pop, top } from "../features/fields/selectSlice";
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
        const totalSize = fields.reduce(function add(sum, curValue){
            return sum + Number(curValue.size);
        }, 0);

        const arc = Math.PI / (totalSize / 2);
        let last = 0;
    
        for (let i = 0; i < fields.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % (colors.length -1)];
            ctx.moveTo(cw, ch);
            ctx.arc(cw, ch, cw, arc * last, arc * (last+Number(fields[i].size)));
            last += Number(fields[i].size);
            ctx.fill();
            ctx.closePath();
        }

        ctx.fillStyle = "#fff";
        ctx.font = "18px Pretendard";
        ctx.textAlign = "center";

        last = 0;

        for (let i = 0; i < fields.length; i++) {
            const angle = (arc * last) + (arc*fields[i].size / 2);
            last += Number(fields[i].size);
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
                const fieldId = selects[0];
                ran = fields.findIndex(f => f.id==fieldId);
                if(ran<0)
                    ran = 0;
                dispatch(pop());
            }
            else{
                ran = Math.floor(Math.random() * fields.length);
            }


            const totalSize = fields.reduce(function add(sum, curValue){
                return sum + Number(curValue.size);
            }, 0);

            const arc = 360 / (totalSize);

            const curSize = fields.slice(0, ran).reduce(function add(sum, curValue){
                return sum + Number(curValue.size);
            }, 0);
            const rotate = 90 + (curSize * arc) + 3600 + (arc * (Math.random()));
            
            c.style.transform = `rotate(-${rotate}deg)`;
            c.style.transition = `2s`;
            
            setTimeout(() => {
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