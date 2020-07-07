import {Entity, model, property, hasMany} from '@loopback/repository';
import {Manga} from './manga.model';
import {Usuario} from './usuario.model';

@model()
export class Biblioteca extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Manga)
  manga: Manga[];

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @hasMany(() => Usuario)
  usuario: Usuario[];

  constructor(data?: Partial<Biblioteca>) {
    super(data);
  }
}

export interface BibliotecaRelations {
  // describe navigational properties here
}

export type BibliotecaWithRelations = Biblioteca & BibliotecaRelations;
