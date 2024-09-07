export const todoSymbol = Symbol("todo");

export function createTodoItem(title, description, dueDate, priority) {
  let completeStatus = false;
  const toggleComplete = () => {
    completeStatus = !completeStatus;
  };
  const isCompleted = () => completeStatus;
  return {
    [todoSymbol]: true,
    title,
    description,
    dueDate,
    priority,
    toggleComplete,
    isCompleted,
  };
}
