import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export class AbstractRepository<TDocument extends AbstractDocument> {
  protected readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}
  async create(document: Omit<TDocument, '_id'>) {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown;
  }
  async findOne(filterQuery: FilterQuery<TDocument>) {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('document not found wit query', filterQuery);
      throw new NotFoundException('document not found');
    }
    return document;
  }
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('document not found wit query', filterQuery);
      throw new NotFoundException('document not found');
    }
    return document;
  }
  async find(filterQuery: FilterQuery<TDocument>) {
    const document = await this.model.find(filterQuery).lean<TDocument>(true);

    return document;
  }
  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    return document;
  }
}
