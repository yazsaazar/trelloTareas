import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { GetTaskUseCase } from '../core/tasks/use-cases/GetTaskUseCase';
import { CreateTaskUseCase } from '../core/tasks/use-cases/CreateTaskUseCase';
import { EditTaskUseCase } from '../core/tasks/use-cases/EditTaskUseCase';
import { DeleteTaskUseCase } from '../core/tasks/use-cases/DeleteTaskUseCase';

interface tarea {
  id: string;
  nombre: string;
  descripcion: string;
  prioridad: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonModal) modal!: IonModal;
  tareas: tarea[] = [];

  tareaEditada: tarea | null = null;

  nombre: string = "";
  descripcion: string = "";
  prioridad: string = "";

  constructor(
    private modalController: ModalController,
    private getTaskUseCase: GetTaskUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private editTaskUseCase: EditTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async ngOnInit() {
    this.tareas = await this.getTaskUseCase.execute();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    if (this.tareaEditada) {
      // Actualizar la tarea existente si hay una tarea editada
      this.tareaEditada.nombre = this.nombre;
      this.tareaEditada.descripcion = this.descripcion;
      this.tareaEditada.prioridad = this.prioridad;

      // Llama al caso de uso para actualizar la tarea
      await this.editTaskUseCase.execute(
        this.tareaEditada.id,
        this.nombre,
        this.descripcion,
        this.prioridad
      );

    } else {
      // Crear una nueva tarea si no hay una tarea editada
      await this.createTaskUseCase.execute(
        this.nombre,
        this.descripcion,
        this.prioridad
      );
      this.tareas = await this.getTaskUseCase.execute();
    }

    // Limpiar los campos y la tarea editada después de la edición
    this.nombre = "";
    this.descripcion = "";
    this.prioridad = "";
    this.tareaEditada = null;

    // Cerrar el modal después de confirmar
    this.modal.dismiss('confirm');
  }

  async eliminarTarea(id: string) {
    await this.deleteTaskUseCase.execute(id);
    this.tareas = await this.getTaskUseCase.execute();

  }

  editarTareas(item: tarea) {
    this.tareaEditada = item;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.prioridad = item.prioridad;
    this.modal.present();

  }
}
