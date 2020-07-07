import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Publicacion} from './publicacion.model';

@model()
export class Comentario extends Entity {
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
    type: 'date',
  })
  fechaPublicacion?: string;

  @belongsTo(() => Publicacion)
  publicacionId: string;

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
