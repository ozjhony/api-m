import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Denuncia extends Entity {
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
  Contenido: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Denuncia>) {
    super(data);
  }
}

export interface DenunciaRelations {
  // describe navigational properties here
}

export type DenunciaWithRelations = Denuncia & DenunciaRelations;
