import {Entity, model, property} from '@loopback/repository';

@model()
export class Manga extends Entity {
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
  nombre: string;


  constructor(data?: Partial<Manga>) {
    super(data);
  }
}

export interface MangaRelations {
  // describe navigational properties here
}

export type MangaWithRelations = Manga & MangaRelations;
