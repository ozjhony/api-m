import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Biblioteca} from './biblioteca.model';
import {Buzon} from './buzon.model';
import {Denuncia} from './denuncia.model';
import {Publicacion} from './publicacion.model';
import {Userlog} from './userlog.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @hasOne(() => Userlog)
  userlog: Userlog;

  @hasOne(() => Buzon)
  buzon: Buzon;

  @hasMany(() => Publicacion)
  publicacions: Publicacion[];

  @hasMany(() => Denuncia)
  denuncias: Denuncia[];

  @property({
    type: 'string',
  })
  denunciaId?: string;

  @hasOne(() => Biblioteca)
  biblioteca?: Biblioteca;

  @property({
    type: 'string',
  })
  bibliotecaId?: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
