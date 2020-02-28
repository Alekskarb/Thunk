import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": '3eb442be-c6ec-48c8-96fc-69807a29300c'} // специальный ключ в заголовках передаём
});// передавай с запросом куки для запрашиваемого домена

export const api = {
    createTask(newTaskTitle, todolistId) {
        return instance.post(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    createTodolist(title) {
        return instance.post("", {title: title})
    },
    getTodolists() {
        return instance.get("");
    },
    updateTask(taskId, todolistId, task) {
        return instance.put(`/${todolistId}/tasks/${taskId}`, task);
    },
    deleteTodolist(id) {
        return instance.delete("/" + id)
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
    },
    updateTodolistTitle(title, todolistId) {
        return instance.put(`/${todolistId}`, {title: title})
    }
};




