import {Entity, model, property} from '@loopback/repository';

@model()
export class Biblioteca extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Biblioteca>) {
    super(data);
  }
}

export interface BibliotecaRelations {
  // describe navigational properties here
}

export type BibliotecaWithRelations = Biblioteca & BibliotecaRelations;
