import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allCategories, categoryState, toDoState } from "../atoms";

interface IForm {
    toDo : string;
}

function CreateToDo(){
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const curCat = useRecoilValue(categoryState);

    // input이 빈칸이거나, necategory로 되어있을때
    if(curCat === "newCategory" || curCat === "") {
        return null;
    }


    const handleValid = ({toDo}:IForm) => {

        setToDos((oldToDos) => [
            { 
                text: toDo, 
                id: Date.now(), 
                category: curCat as allCategories,
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