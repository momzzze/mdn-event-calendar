import { useForm } from "react-hook-form";
import { createContactList } from "../../../services/contacts.service";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { useData } from "../../../contexts/DataContext";

const AddListForm = () => {
    const { userData } = useAuth();
    const [newListName, setNewListName] = useState('');
    const { register, reset, handleSubmit } = useForm();
    const [isAddingList, setIsAddingList] = useState(false);
    const {setContactListsData} = useData();
    
    const handleAddListSubmit = async (data) => {
        const createdList = await createContactList(data?.listName, userData?.uid);
        setIsAddingList(false);
        setNewListName('');
        await setContactListsData()
        reset();
    };
    const handleAddListClick = () => {
        setIsAddingList(!isAddingList);
    };
    return (
        <>
            <button
                className="inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-purple-800 hover:text-purple-300 focus:text-purple-300"
                onClick={handleAddListClick}
            >
                Add List
            </button>
            <div className="flex justify-center">
                {isAddingList && (
                    <form onSubmit={handleSubmit(handleAddListSubmit)}>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="New List Name"
                                {...register("listName", { required: true })}
                                className="w-96 px-4 py-2 border rounded"
                            />
                            <button
                                type="submit"
                                className="inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-purple-800 hover:text-purple-300 focus:text-purple-300"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                )}
            </div>
            {/* <button
                className="inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-purple-800 hover:text-purple-300 focus:text-purple-300"
                onClick={handleAddListClick}
            >
                Add List
            </button>
            <div className="flex justify-center">
                {isAddingList && (
                    <form onSubmit={handleSubmit(handleAddListSubmit)}>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="New List Name"
                                {...register("listName", { required: true })}
                                className="w-96 px-4 py-2 border rounded"
                            />
                            <button
                                type="submit"
                                className="inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-purple-800 hover:text-purple-300 focus:text-purple-300"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                )}
            </div> */}
        </>
    )
}

export default AddListForm;