import { Injectable } from "@angular/core";
import { Task } from "../entities/task";
import { taskRepository } from "../interfaces/task.repository";

@Injectable({ providedIn: "root" })
export class EditTaskUseCase {
  constructor(private repository: taskRepository) {}

  async execute(
    taskId: string,
    nombre: string,
    descripcion: string,
    prioridad: string
  ): Promise<Task | null> {

    const existingTask = await this.repository.getTaskById(taskId); //


    if (!existingTask) {
      console.error(`Task with ID ${taskId} not found.`);
      return null;
    }


    existingTask.nombre = nombre;
    existingTask.descripcion = descripcion;
    existingTask.prioridad = prioridad;


    await this.repository.updateTask(existingTask);

    return existingTask;
  }
}
