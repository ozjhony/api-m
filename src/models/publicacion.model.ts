import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Comentario} from './comentario.model';

@model()
export class Publicacion extends Entity {
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
  contenido: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'date',
  })
  fecha?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Comentario)
  comentarios: Comentario[];

  constructor(data?: Partial<Publicacion>) {
    super(data);
  }
}

export interface PublicacionRelations {
  // describe navigational properties here
}

export type PublicacionWithRelations = Publicacion & PublicacionRelations;
