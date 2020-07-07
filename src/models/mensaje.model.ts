import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Buzon} from './buzon.model';

@model()
export class Mensaje extends Entity {
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

  @belongsTo(() => Buzon)
  buzonId: string;

  constructor(data?: Partial<Mensaje>) {
    super(data);
  }
}

export interface MensajeRelations {
  // describe navigational properties here
}

export type MensajeWithRelations = Mensaje & MensajeRelations;
