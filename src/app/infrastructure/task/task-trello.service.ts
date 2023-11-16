import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/core/tasks/entities/task';
import { taskRepository } from 'src/app/core/tasks/interfaces/task.repository';

const API_URL = 'https://api.trello.com/1';
const ID_LIST = '653efaec26665a0e9b84e4e2';
const ID_LIST1 = '653efaec26665a0e9b84e4e3';
const ID_LIST2 = '653efaec26665a0e9b84e4e4';

@Injectable({ providedIn: 'root' })
export class TaskTrelloService implements taskRepository {
  constructor(private http: HttpClient) {}

  async createTask(Task: Task): Promise<any> {
    let idList: string;

    switch (Task.prioridad) {
      case 'Lista de Tareas':
        idList = ID_LIST;
        break;
      case 'En proceso':
        idList = ID_LIST1;
        break;
      case 'Hecho':
        idList = ID_LIST2;
        break;
      default:
        idList = ID_LIST;
    }

    const data = {
      idList,
      name: Task.nombre,
      desc: Task.descripcion,
    };

    return await this.http.post(`${API_URL}/cards`, data).toPromise();
  }

  async getTask(): Promise<Task[]> {
    let response = await this.http.get<any[]>(`${API_URL}/lists/${ID_LIST}/cards`).toPromise() || [];

    const tareas: Task[] = response.map((item) => ({
      id: item.id,
      nombre: item.name,
      descripcion: item.desc,
      prioridad: "",
      estado: true,
    }));
    console.log(response);

    return tareas;
  }

  async getTaskById(id: string): Promise<Task | null> {
    try {
      const response = await this.http.get(`${API_URL}/cards/${id}`).toPromise();
      return response as Task;
    } catch (error) {
      console.error('Error getting task by ID:', error);
      throw error;
    }
  }

  async updateTask(task: Task): Promise<Task> {
    let idList: string;

    switch (task.prioridad) {
      case 'Lista de Tareas':
        idList = ID_LIST;
        break;
      case 'En proceso':
        idList = ID_LIST1;
        break;
      case 'Hecho':
        idList = ID_LIST2;
        break;
      default:
        idList = ID_LIST;
    }

    const data = {
      idList,
      name: task.nombre,
      desc: task.descripcion,
    };

    try {
      const response = await this.http.put(`${API_URL}/cards/${task.id}`, data).toPromise();
      return response as Task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    await this.http.delete(`${API_URL}/cards/${id}`).toPromise();
  }
}
