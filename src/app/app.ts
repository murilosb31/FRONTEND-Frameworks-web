import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  arrayDeUsuarios = signal<any[]>([]);

  apiURL: string;
  usuarioLogado = signal(false);
  isAdmin = signal(false);
  abaAtiva = signal<'tarefas' | 'usuarios'>('tarefas');

  tokenJWT = '{ "token": "" }';

  // campos para criação/edição de usuário
  novoUserNome = '';
  novoUserSenha = '';
  novoUserIsAdmin = false;
  editandoUser: any = null;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://apitarefasmurilosb257013.up.railway.app';
  }

  // Helper: monta o header com o token JWT
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
  }

  // ---------------- LOGIN ----------------
  login(username: string, password: string) {
    var credenciais = { "nome": username, "senha": password };
    this.http.post<any>(`${this.apiURL}/api/login`, credenciais).subscribe({
      next: (resultado) => {
        this.tokenJWT = JSON.stringify(resultado);
        this.isAdmin.set(resultado.isAdmin || false);
        this.READ_tarefas();
      },
      error: () => { alert('Usuário ou senha incorretos!'); }
    });
  }

  mudarAba(aba: 'tarefas' | 'usuarios') {
    this.abaAtiva.set(aba);
    if (aba === 'usuarios') this.READ_usuarios();
  }

  // ---------------- TAREFAS ----------------
  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, { headers: this.getHeaders() })
      .subscribe({
        next: () => this.READ_tarefas(),
        error: () => this.usuarioLogado.set(false)
      });
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { headers: this.getHeaders() })
      .subscribe({
        next: (dados) => { this.arrayDeTarefas.set(dados); this.usuarioLogado.set(true); },
        error: () => this.usuarioLogado.set(false)
      });
  }

  UPDATE_tarefa(tarefa: Tarefa) {
    if (!tarefa._id) return;
    this.http.patch(`${this.apiURL}/api/update/${tarefa._id}`,
      { descricao: tarefa.descricao, statusRealizada: tarefa.statusRealizada },
      { headers: this.getHeaders() }
    ).subscribe({
      next: () => this.READ_tarefas(),
      error: () => this.usuarioLogado.set(false)
    });
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    this.http.delete(`${this.apiURL}/api/delete/${tarefaAserRemovida._id}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => this.READ_tarefas(),
        error: () => this.usuarioLogado.set(false)
      });
  }

  // ---------------- USUÁRIOS (admin) ----------------
  READ_usuarios() {
    this.http.get<any[]>(`${this.apiURL}/api/users`, { headers: this.getHeaders() })
      .subscribe({ next: (dados) => this.arrayDeUsuarios.set(dados) });
  }

  CREATE_usuario() {
    const novoUser = { nome: this.novoUserNome, senha: this.novoUserSenha, isAdmin: this.novoUserIsAdmin };
    this.http.post(`${this.apiURL}/api/users`, novoUser, { headers: this.getHeaders() })
      .subscribe({
        next: () => { this.novoUserNome = ''; this.novoUserSenha = ''; this.novoUserIsAdmin = false; this.READ_usuarios(); },
        error: (e) => alert('Erro: ' + e.error.message)
      });
  }

  iniciarEdicao(user: any) {
    this.editandoUser = { ...user, novaSenha: '' };
  }

  UPDATE_usuario() {
    const dados: any = { nome: this.editandoUser.nome, isAdmin: this.editandoUser.isAdmin };
    if (this.editandoUser.novaSenha) dados.senha = this.editandoUser.novaSenha;
    this.http.patch(`${this.apiURL}/api/users/${this.editandoUser._id}`, dados, { headers: this.getHeaders() })
      .subscribe({
        next: () => { this.editandoUser = null; this.READ_usuarios(); },
        error: (e) => alert('Erro: ' + e.error.message)
      });
  }

  cancelarEdicao() { this.editandoUser = null; }

  DELETE_usuario(user: any) {
    if (!confirm(`Remover usuário "${user.nome}"?`)) return;
    this.http.delete(`${this.apiURL}/api/users/${user._id}`, { headers: this.getHeaders() })
      .subscribe({ next: () => this.READ_usuarios() });
  }
}
