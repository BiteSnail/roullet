import { Badge, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { remove, insert } from "../features/fields/fieldSlice";
import { useCallback, useState } from "react";

function FieldList(){
    const fields = useSelector((state)=> state.field.value);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const onValueChange = useCallback(e=>{
        setValue(e.target.value);
    }, [])
    const onValueSubmit = useCallback(e=> {
        dispatch(insert(value))
        setValue('');
        e.preventDefault();
    }, [value, dispatch])

    return (
        <div className="fieldList">
            <h2>뽑힌 횟수</h2>
            <ListGroup>
                {fields.map((field)=>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={"field"+field.id}
                    >
                        <div className="ms-2 me-auto">
                            {field.name}
                        </div>
                        <Badge bg="primary" pill>
                            {field.count}
                        </Badge>
                        <Badge bg="secondary" pill onClick={() => {dispatch(remove(field.id))}}>
                            <i className="bi bi-eraser-fill"></i>
                        </Badge>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <form onSubmit={onValueSubmit}>
                <input type="text" id="fieldInput" value={value} onChange={onValueChange}/>
                <Button type="submit">등록</Button>
            </form>
        </div>
    )
}

export default FieldList;