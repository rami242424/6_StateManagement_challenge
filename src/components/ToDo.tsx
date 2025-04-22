import { useSetRecoilState } from "recoil";
import { allCategories, IToDo, toDoState } from "../atoms";


interface IToDoProps extends IToDo {
    allCategories : string[];
}


function ToDo({ text, category, id, allCategories } : IToDoProps){
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
            {/* 하드 코딩 되어있던 카테고리 목록을 새로 추가되는 목록들이 반영될 수 있게 변경 */}
            {/* 기존코드
            { category !== allCategories.TO_DO && <button name={allCategories.TO_DO} onClick={onClick}>TO DO</button>}
            { category !== allCategories.DOING && <button name={allCategories.DOING} onClick={onClick}>DOING</button>}
            { category !== allCategories.DONE && <button name={allCategories.DONE} onClick={onClick}>DONE</button>} */}

            {allCategories
                .filter((cat)=> cat !== category)
                .map((cat) => (
                    <button key={cat} name={cat} onClick={onClick}>
                        {cat}
                    </button>
                ))
            
            }


        </li>
    );
}
    
export default ToDo;