import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  apiURL: string;

  // Controla se o usuário está logado
  usuarioLogado = signal(false);

  // Guarda o token JWT recebido do backend
  tokenJWT = '{ "token": "" }';

  constructor(private http: HttpClient) {
    this.apiURL = 'https://apitarefasmurilosb257013.up.railway.app';
    // NÃO chama READ_tarefas aqui — espera o login primeiro
  }

  // ---------------- LOGIN ----------------
  login(username: string, password: string) {
    var credenciais = { "nome": username, "senha": password };
    this.http.post(`${this.apiURL}/api/login`, credenciais).subscribe({
      next: (resultado) => {
        this.tokenJWT = JSON.stringify(resultado);
        this.READ_tarefas();
      },
      error: () => {
        alert('Usuário ou senha incorretos!');
      }
    });
  }

  // Helper: monta o header com o token JWT
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  }

  // ---------------- CREATE ----------------
  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, { headers: this.getHeaders() })
      .subscribe({
        next: resultado => { console.log(resultado); this.READ_tarefas(); },
        error: () => { this.usuarioLogado.set(false); }
      });
  }

  // ---------------- READ ----------------
  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { headers: this.getHeaders() })
      .subscribe({
        next: (dados) => {
          this.arrayDeTarefas.set(dados);
          this.usuarioLogado.set(true);
        },
        error: () => {
          this.usuarioLogado.set(false);
        }
      });
  }

  // ---------------- UPDATE ----------------
  UPDATE_tarefa(tarefa: Tarefa) {
    console.log("UPDATE CHAMADO", tarefa);
    if (!tarefa._id) {
      console.log("SEM ID");
      return;
    }
    this.http.patch(`${this.apiURL}/api/update/${tarefa._id}`,
      { descricao: tarefa.descricao, statusRealizada: tarefa.statusRealizada },
      { headers: this.getHeaders() }
    ).subscribe({
      next: () => { console.log("ATUALIZOU"); this.READ_tarefas(); },
      error: () => { this.usuarioLogado.set(false); }
    });
  }

  // ---------------- DELETE ----------------
  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    const id = tarefaAserRemovida._id;
    this.http.delete(`${this.apiURL}/api/delete/${id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => this.READ_tarefas(),
        error: () => { this.usuarioLogado.set(false); }
      });
  }
}
