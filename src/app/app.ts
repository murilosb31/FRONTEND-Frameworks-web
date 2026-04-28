import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  apiURL : string;
  constructor(private http: HttpClient) {
  this.apiURL = 'https://apitarefasmurilosb257013.up.railway.app';
  this.READ_tarefas();
}

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
     this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });

  }


  READ_tarefas() {
  this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
    dados => {
      this.arrayDeTarefas.set(dados);
    }
  );
}

UPDATE_tarefa(tarefa: Tarefa) {
  console.log("UPDATE CHAMADO", tarefa);

  if (!tarefa._id) {
    console.log("SEM ID");
    return;
  }

  this.http.patch(`${this.apiURL}/api/update/${tarefa._id}`, {
    descricao: tarefa.descricao,
    statusRealizada: tarefa.statusRealizada
  }).subscribe(() => {
    console.log("ATUALIZOU");
    this.READ_tarefas();
  });
}


  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
  const id = tarefaAserRemovida._id;

  this.http.delete(`${this.apiURL}/api/delete/${id}`).subscribe(
    () => this.READ_tarefas()
  );
}
}
