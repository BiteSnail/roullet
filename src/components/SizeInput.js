import { useDispatch } from "react-redux";
import { sizeUp } from "../features/fields/fieldSlice";
import { useCallback, useState } from "react";

function SizeInput(props){
    const [size, setSize] = useState(props.field.size);
    const dispatch = useDispatch();
    const onSizeChange = useCallback(e => {
        setSize(e.target.value);
        dispatch(sizeUp({id: props.field.id, size: e.target.value}));
    }, []);
    return (<div>
        <input type="number" min={1} max={99} value={size} onChange={onSizeChange}/>
    </div>)
}

export default SizeInput; 