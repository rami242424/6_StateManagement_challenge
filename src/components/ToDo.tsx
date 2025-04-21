import { useSetRecoilState } from "recoil";
import { AllCategories, IToDo, toDoState } from "../atoms";




function ToDo({ text, category, id } : IToDo){
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget : {name}} = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = { text, id, category:name as any };
            return [
                ...oldToDos.slice(0, targetIndex), 
                newToDo, 
                ...oldToDos.slice(targetIndex + 1)
            ];
        })
    }
    return (
        <li>
            <span>{text}</span>
            { category !== AllCategories.TO_DO && <button name={AllCategories.TO_DO} onClick={onClick}>TO DO</button>}
            { category !== AllCategories.DOING && <button name={AllCategories.DOING} onClick={onClick}>DOING</button>}
            { category !== AllCategories.DONE && <button name={AllCategories.DONE} onClick={onClick}>DONE</button>}
        </li>
    );
}
    
export default ToDo;