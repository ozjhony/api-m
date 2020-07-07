import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Mensaje} from './mensaje.model';

@model()
export class Buzon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Mensaje)
  mensajes: Mensaje[];

  constructor(data?: Partial<Buzon>) {
    super(data);
  }
}

export interface BuzonRelations {
  // describe navigational properties here
}

export type BuzonWithRelations = Buzon & BuzonRelations;
