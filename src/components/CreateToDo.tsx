import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllCategories, categoryState, toDoState } from "../atoms";

interface IForm {
    toDo : string;
}

function CreateToDo(){
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const curCat = useRecoilValue(categoryState);


    const handleValid = ({toDo}:IForm) => {
        if( curCat === "") return ; // 카테고리 선택x, 등록x

        setToDos((oldToDos) => [
            { 
                text: toDo, 
                id: Date.now(), 
                category: curCat as AllCategories,
            },
            ...oldToDos
        ]);
        setValue("toDo", "");
    }

    return (
    <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo", {
            required : "please write a to do",
            })} 
            placeholder="Write a to do" 
        />
        <button>Add</button>
    </form>
    );
}
    
export default CreateToDo;