import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList, { Todo } from "../TodoList";

// ✅ Mock explícito del componente hijo TodoItem
jest.mock("../TodoItem", () => (props: any) => {
  return (
    <div data-testid={`todo-item-${props.id}`}>
      {props.text}
      <button data-testid={`mock-toggle-${props.id}`} onClick={() => props.onToggle(props.id)}>Toggle</button>
      <button data-testid={`mock-delete-${props.id}`} onClick={() => props.onDelete(props.id)}>Delete</button>
    </div>
  );
});

describe("TodoList Component", () => {
  // Happy path tests
  it("renderiza un mensaje cuando no hay tareas", () => {
    // Prepare: Configuración con lista vacía
    const todos: Todo[] = [];
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: Renderizar el componente
    render(
      <TodoList
        todos={todos}
        onToggleTodo={mockToggle}
        onDeleteTodo={mockDelete}
      />
    );

    // Validate: Verificar que se muestra el mensaje de lista vacía
    expect(screen.getByTestId("empty-todos")).toBeInTheDocument();
    expect(screen.getByTestId("empty-todos")).toHaveTextContent(
      "No hay tareas pendientes"
    );
  });

  it("renderiza correctamente una lista de tareas", () => {
    // Prepare: Configuración con lista de tareas
    const todos: Todo[] = [
      { id: 1, text: "Tarea 1", completed: false },
      { id: 2, text: "Tarea 2", completed: true },
      { id: 3, text: "Tarea 3", completed: false },
    ];
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: Renderizar el componente
    render(
      <TodoList
        todos={todos}
        onToggleTodo={mockToggle}
        onDeleteTodo={mockDelete}
      />
    );

    // Validate: Verificar que se renderizan todas las tareas
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-3")).toBeInTheDocument();
  });

  // ✅ EJERCICIO 3: Validar que las funciones se pasen correctamente a cada TodoItem
  it("pasa correctamente las funciones onToggle y onDelete a cada TodoItem", () => {
    // Prepare
    const todos: Todo[] = [
      { id: 101, text: "Tarea A", completed: false },
      { id: 102, text: "Tarea B", completed: true },
    ];
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute
    render(
      <TodoList
        todos={todos}
        onToggleTodo={mockToggle}
        onDeleteTodo={mockDelete}
      />
    );

    // Simular eventos en los botones del mock de TodoItem
    screen.getByTestId("mock-toggle-101").click();
    screen.getByTestId("mock-delete-102").click();

    // Validate: Se llamaron correctamente las funciones con el ID correcto
    expect(mockToggle).toHaveBeenCalledWith(101);
    expect(mockDelete).toHaveBeenCalledWith(102);
  });
});
