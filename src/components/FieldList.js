import { Badge, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { remove, insert, load } from "../features/fields/fieldSlice";
import { push } from "../features/fields/selectSlice";
import { useCallback, useRef, useState } from "react";
import SizeInput from "./SizeInput";

function FieldList(){
    const fields = useSelector((state)=> state.field.value);
    const [value, setValue] = useState("");
    const fileRef = useRef();

    const dispatch = useDispatch();
    const onValueChange = useCallback(e=>{
        setValue(e.target.value);
    }, [])
    const onValueSubmit = useCallback(e=> {
        dispatch(insert(value))
        setValue('');
        e.preventDefault();
    }, [value, dispatch])

    const onSaveClick = useCallback(() =>{
        const element = document.createElement('a');
        const newFile = new Blob([JSON.stringify(fields)],{
            type: 'text/json',
        });
        element.href = URL.createObjectURL(newFile);
        element.download = "list.json";
        document.body.appendChild(element);
        element.click();
        element.remove();
    }, [fields])

    const onLoadClick = useCallback((e)=>{
        if(fileRef.current.files[0] == undefined){
            alert("파일을 선택해주세요.");
            return;
        }
        const reader = new FileReader();
        reader.readAsText(fileRef.current.files[0]);
        
        reader.onload = () => {
            const jsonObject = JSON.parse(reader.result);
            dispatch(load(jsonObject));
        }

    }, [])


    return (
        <div className="fieldList">
            <h2>목록표</h2>
            <ListGroup>
                {fields.map((field)=>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={"field"+field.id}
                        onClick={() => {dispatch(push(field.id))}}
                    >
                        <div className="ms-2 me-auto">
                            {field.name}
                        </div>
                        <SizeInput field={field}/>
                        <Badge bg="secondary" pill onClick={(event) => {
                            event.stopPropagation();
                            dispatch(remove(field.id))}}>
                            <i className="bi bi-eraser-fill"></i>
                        </Badge>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <form onSubmit={onValueSubmit}>
                <input type="text" id="fieldInput" value={value} onChange={onValueChange}/>
                <Button type="submit">등록</Button>
            </form>
            <form>
                <input type="file" id="fileInput" placeholder="json 파일을 입력하세요." ref={fileRef} accept='text/json'/>
                <Button className="primary" onClick={onSaveClick}>저장하기</Button>
                <Button className="secondary" onClick={onLoadClick}>불러오기</Button>
            </form>
        </div>
    )
}

export default FieldList;