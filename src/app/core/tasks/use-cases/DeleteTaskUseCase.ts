import { Injectable } from "@angular/core";
import { Task } from "../entities/task";
import { taskRepository } from "../interfaces/task.repository";

@Injectable ({providedIn: "root"})
export class DeleteTaskUseCase {
  constructor(private repository: taskRepository) { }

  async execute(id: string):  Promise<void> {
    return await this.repository.deleteTask(id);

  }

}
