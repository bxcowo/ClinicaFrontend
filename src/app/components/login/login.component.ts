import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { IUsuarioResponse } from '../../model/usuario-response';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: IUsuarioResponse []=[];
  constructor(private usuarioService:UsuarioService){}
  
  ngOnInit():void{
    this.getUser();
  }
  getUser():void{
    this.usuarioService.getUser().subscribe((result:any)=>{
      console.log('Result',result);
      this.user=result;
      console.log(this.user);

    });
  }
}
