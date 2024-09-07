export const todoSymbol = Symbol("todo");

export function createTodoItem(title, description, dueDate, priority) {
  return {
    [todoSymbol]: true,
    title,
    description,
    dueDate,
    priority,
    isCompleted: false,
  };
}
